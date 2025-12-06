import e, { Router } from "express";
import { client } from "../../utils/client";
import { categories, ItemSchema, OrderSchema, tables } from "../../utils";
require("dotenv").config()
import { error, table } from "console";
const KEY=process.env.SECRET_KEY
const jwt=require("jsonwebtoken")
interface week {
  year: number;
  week: number;
  orders: number;
  profit: number;
}
export const router = Router();

//getting the menu
router.get("/menu", async (req, res) => {
  console.log("e hit");
  const response = await client.items.findMany({
    where: {
      availability: true,
    },
    orderBy:{
      name:"asc"
    }
  });
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No items found",
    });
  }

  res.status(200).json({
    items: response,
  });
});

//placing an order
router.post("/orders", async (req, res) => {
  const parsedResponse = OrderSchema.safeParse(req.body);
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
      error: parsedResponse.error,
    });
    return;
  }
  const tableId = parsedResponse.data.tableId;
  if (!tableId) {
    res.status(400).json({
      message: "No table found",
    });
    return;
  }
  let placedOrder = await client.$transaction(async () => {
    //transaction for creating order

    //creating order
    const order = await client.orders.create({
      data: {
        tableId: tableId,
        totalCost: parsedResponse.data?.totalCost,
        status: "PENDING",
      },
    });

    const cartItems = await client.cart.createMany({
      data: parsedResponse.data.orders.map((item) => ({
        orderId: order.orderId,
        itemId: item.itemId,
        quantity: item.quantity,
      })),
    });

    await client.activities.create({
      data: {
        activity: "PLACED_ORDER",
        changedId: order.orderId,
      },
    });
    return order.orderId;
  });
  res.status(200).json({
    fullOrder: placedOrder,
  });
});
router.get("/orders", async (req, res) => {
  console.log("orders hit");
  const ordersWithItems = await client.orders.findMany({
    include: {
      orders_items: {
        include: {
          iid: true,
        },
      },
    },
    orderBy: {
      orderId: "asc",
    },
  });
  if (ordersWithItems.length == 0) {
    console.log("NO response");
    res.status(400).json({
      message: "No Orders found",
    });
  }
  const response = ordersWithItems.map((order) => {
    const items = order.orders_items.map((cartItem) => {
      return {
        item: cartItem.iid,
        quantity: cartItem.quantity,
      };
    });
    return {
      tableId: order.tableId,
      status: order.status,
      orderId: order.orderId,
      totalCost: order.totalCost,
      createdAt: order.createdAt,
      items: items,
    };
  });

  res.status(200).json({
    response,
  });
});

//updating an order's status
router.post("/completeOrder", async (req, res) => {
  console.log("body me ", req.body);
  const { id } = req.body.data;
  console.log("delete hit");
  const response = await client.orders.update({
    where: {
      orderId: id,
    },
    data: {
      status: "COMPLETED",
    },
  });
  await client.activities.create({
    data: {
      activity: "COMPLETED_ORDER",
      changedId: response.orderId,
    },
  });
  res.status(200).json({
    message: "Updated order",
  });
});

//order with tableId

router.post("/getOrderWithTID", async (req, res) => {
  const tid = req.body.tid;
  console.log(tid);
  const response = await client.orders.findMany({
    where: {
      tableId: tid,
    },
    include: {
      orders_items: {
        include: {
          iid: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (response.length == 0) {
    res.status(400).json({
      msg: "NO order found",
    });
  }

  res.status(200).json({
    orders: response,
  });
});
router.post("/getOrderWithTID", async (req, res) => {
  const tid = req.body.data;
  const response = await client.orders.findMany({
    where: {
      tableId: tid,
    },
    include: {
      orders_items: {
        include: {
          iid: true,
        },
      },
    },
  });

  if (response.length == 0) {
    res.status(400).json({
      msg: "NO order found",
    });
  }

  res.status(200).json({
    orders: response,
  });
});

//item with itemId
router.get("/item", async (req, res) => {
  const itemId = Number(req.query.id);
  if (!itemId) {
    res.status(400).json({
      message: "No item id found",
    });
    return;
  }

  try {
    const response = await client.items.findFirst({
      where: {
        itemId: itemId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "No item found",
      });
    }
    res.status(200).json({
      item: response,
    });
  } catch (error) {
    console.log("Error getting item", error);
  }
});

//items with category
router.post("/category", async (req, res) => {
  const categoryName = req.body.category;
  console.log("on here", categoryName);

  if (!categoryName || Array.isArray(categoryName)) {
    res.status(400).json({
      message: "No such category found",
    });
    return;
  }

  if (categoryName == "All") {
    const response = await client.items.findMany({
      where: {
        availability: true,
      },
      orderBy:{
        name:"asc"
      }
    });
    if (!response) {
      res.status(400).json({
        message: "No item with that category found",
      });
    }
    res.status(200).json({
      items: response,
    });
  } else {
    const response = await client.items.findMany({
      where: {
        category: categoryName,
        availability: true,
      },
      orderBy:{
        name:"asc"
      }
    });
    if (!response) {
      res.status(400).json({
        message: "No item with that category found",
      });
    }
    res.status(200).json({
      items: response,
    });
  }
});

//routes for getting category
router.get("/getCategories", async (req, res) => {
  console.log("Cat hit");
  const response = await client.category.findMany({
    orderBy: {
      id: "asc",
    },
    select:{
      id:true,
      description:true,
      images:true,
      name:true,
      slug:true,
      _count:{
        select:{
          items:true
        }
      }
    }
  });
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No categories found",
    });
  }
  console.log(response);
  res.status(200).json({
    categories: response,
  });
});

router.post("/userAuth", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username)
  const response = await client.users.findFirst({
    where: {
      username: username,
    },
  });
  if (response != null) {
    if (password == response.password) {
      const token=jwt.sign({username:username,password:password,isAdmin:"True"},KEY)
      res.json({ message: "Succesfully Logged In",token:token });
    } else {
      res.json({ message: "Incorrect Password" });
    }
  } else {
    res.json({ message: "User Not Found" });
  }
});

router.post("/addItem", async (req, res) => {
  console.log("item hit");
  const parsedResponse = ItemSchema.safeParse(req.body);
  console.log(req.body, parsedResponse);
  console.log(parsedResponse, req.body);
  console.log(parsedResponse.error?.issues);
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const item = await client.items.create({
    data: {
      name: parsedResponse.data.name,
      image: parsedResponse.data.image,
      bio: parsedResponse.data.bio,
      availability: true,
      category: parsedResponse.data.category,
      subcategory: parsedResponse.data.subcategory,
      cost: parsedResponse.data.cost,
      isvegan: true,
      tags: parsedResponse.data.tags,
      ingredients: parsedResponse.data.ingredients,
    },
  });
  console.log(parsedResponse.data.category);
  const catId = await client.category.findFirst({
    where: {
      name: parsedResponse.data.category,
    },
  });
  await client.category.update({
    where: {
      id: catId?.id,
    },
    data: {
      totalItems: { increment: 1 },
    },
  });
  await client.activities.create({
    data: {
      activity: "ADDED_ITEM",
      changedId: item.itemId,
    },
  });
  res.status(200).json({
    message: "Item Has Been Added",
    itemID: item.itemId,
  });
});

router.get("/allitems", async (req, res) => {
  console.log("e hit");
  const response = await client.items.findMany({});
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No items found",
    });
  }
  res.status(200).json({
    items: response,
  });
});

router.post("/changeItem", async (req, res) => {
  console.log("update Hit");
  const parsedResponse = req.body;
  console.log(parsedResponse);
  const response = await client.items.update({
    where: {
      itemId: parsedResponse.itemId,
    },
    data: {
      name: parsedResponse.name,
      bio: parsedResponse.bio,
      cost: parsedResponse.cost,
      image: parsedResponse.image,
      category: parsedResponse.category,
      subcategory: parsedResponse.subcategory,
      isvegan: parsedResponse.isvegan,
      availability: parsedResponse.availability,
      tags: parsedResponse.tags,
      ingredients: parsedResponse.ingredients,
    },
  });
  if (!response) {
    res.status(400).json({ message: "Could Not Update Item" });
  }
  await client.activities.create({
    data: {
      activity: "UPDATED_ITEM",
      changedId: parsedResponse.itemId,
    },
  });
  res.status(200).json({ message: "Succesfully Updated" });
});

router.get("/adminmenu", async (req, res) => {
  console.log("e hit");
  const response = await client.items.findMany({});
  if (!response) {
    console.log("NO response");
    res.status(400).json({
      message: "No items found",
    });
  }

  res.status(200).json({
    items: response,
  });
});

router.post("/addCat", async (req, res) => {
  console.log("item hit");
  console.log(req.body);
  const parsedResponse = categories.safeParse(req.body);
  console.log(parsedResponse.error?.issues);
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const cat = await client.category.create({
    data: {
      images: parsedResponse.data.images,
      name: parsedResponse.data.name,
      slug: parsedResponse.data.slug,
      description: parsedResponse.data.description,
    },
  }
);
  await client.activities.create({
    data: {
      activity: "ADDED_CATEGORY",
      changedId: cat.id,
    },
  });
  res.status(200).json({
    message: "Category Has Been Added",
  });
});

router.post("/editCat", async (req, res) => {
  const parsedResponse = categories.safeParse(req.body);
  console.log("updateCat");
  console.log()
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  const response = await client.category.update({
    where: {
      id: parsedResponse.data.categoryId,
    },
    data: {
      name: parsedResponse.data.name,
      images: parsedResponse.data.images,
      description: parsedResponse.data.description,
      slug: parsedResponse.data.slug,
    },
  });
  await client.activities.create({
    data: {
      activity: "UPDATED_CATEGORY",
      changedId: response.id,
    },
  });
  res.status(200).json({message:"Updated Categories"})
});

router.get("/getDashStats", async (req, res) => {
  const totalProf = await client.orders.aggregate({
    _sum: {
      totalCost: true,
    },
    where: {
      status: "COMPLETED",
    },
  });
  const week: week[] =
    await client.$queryRaw`select EXTRACT(YEAR from "createdAt") as Year,EXTRACT(WEEK from "createdAt") as week,sum("totalCost")::INTEGER as profit,count(*)::INTEGER as orders from orders GROUP BY EXTRACT(YEAR from "createdAt"),EXTRACT(WEEK from "createdAt") ORDER BY year DESC,week DESC; ;`;
  let profitPerc,ordersPerc;
  if(week[0] && week[1]){
    profitPerc = ((week[0].profit-week[1].profit)/week[1].profit)*100
    ordersPerc = ((week[0].orders-week[1].orders)/week[1].orders)*100
  }else{
    profitPerc=100
    ordersPerc=100
  }
  const totalOrders=await client.orders.count()
  const totalProd=await client.items.count()
  const totalCat=await client.category.count()
  res.json({
    profit: totalProf._sum.totalCost,
    totalOrders: totalOrders,
    totalProd: totalProd,
    totalCat: totalCat,
    profitPerc: profitPerc.toFixed(2),
    ordersPerc:ordersPerc.toFixed(2),
  });
});
router.get("/getRecentOrders", async (req, res) => {
  const recentOrders = await client.orders.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json({ recentOrders: recentOrders });
});

router.get("/getActivity", async (req, res) => {
  const recentActivity = await client.activities.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json({ recentActivity: recentActivity });
});
router.post("/getOrders/", async (req, res) => {
  const orderWithItems = await client.orders.findUnique({
    where: {
      orderId: req.body.id,
    },
    include: {
      orders_items: {
        include: {
          iid: true,
        },
      },
    },
  });
  if (!orderWithItems) {
    console.log("NO response");
    res.status(400).json({
      message: "Order not found",
    });
  } else {
    const response = {
      tableId: orderWithItems.tableId,
      status: orderWithItems.status,
      orderId: orderWithItems.orderId,
      totalCost: orderWithItems.totalCost,
      createdAt: orderWithItems.createdAt,
      items: orderWithItems.orders_items.map((cartItem) => {
        return {
          item: cartItem.iid,
          quantity: cartItem.quantity,
        };
      }),
    };

    res.status(200).json({
      response,
    });
  }
});
router.post("/getProduct/", async (req, res) => {
  const product = await client.items.findUnique({
    where: {
      itemId: req.body.id,
    },
  });
  res.json({ product });
});
router.post("/getCat/", async (req, res) => {
  const category = await client.category.findUnique({
    where: {
      id: req.body.id,
    },
  });
  res.json({ category });
});

router.post("/deleteCat", async (req, res) => {
  const cID = req.body.cID;
  const items=await client.category.findFirst({
    where:{
      id:cID
    },
    select:{
      items:true
    }
  })
  const response = await client.category.delete({
    where: {
      id: cID,
    },
  });
  
  if (response){
    if(items!=null){
      await client.$transaction(async()=>{
        await client.activities.createMany({
          data:items.items.map((item)=>({
            activity:"DELETED_ITEM",
            changedId:item.itemId
          }))
        })
      })
    }
    await client.activities.create({
      data:{
        activity:"DELETED_CATEGORY",
        changedId:req.body.cID
      }
    })
    res.status(200).json({
      msg: "Cat delete",
    });
  } else {
    res.status(400).json({
      msg: "Cat not deleted " + error,
    });
  }
});

router.post("/deleteItem", async (req, res) => {
  const pID = req.body.pID;
  console.log("pdi", pID);
  try {
    const response = await client.items.delete({
      where: {
        itemId: pID,
      },
    });
    if(response){
      await client.activities.create({
        data:{
          changedId:parseInt(pID),
          activity:"DELETED_ITEM"  
        }
      })
    }
    if (response) {
      res.status(200).json({
        msg: "Item deleted",
      });
    } else {
      res.status(400).json({
        msg: "Item not deleted ",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Item not deleted " + error,
    });
  }
});

router.get("/getTables",async(req,res)=>{
  const response=await client.tables.findMany()
  res.json({tables:response})
})

router.post("/addTable",async(req,res)=>{
  console.log(req.body)
  const parsedResponse=tables.safeParse(req.body)
  if(!parsedResponse.success){
    res.json({message:"Couldnt Add Table"})
    return
  }
  const response=await client.tables.create({
    data:{
      tid:parsedResponse.data.tid,
      tablename:parsedResponse.data.tablename
    }
  })
  if(response){
    await client.activities.create({
      data:{
        activity:"ADDED_TABLE",
        changedId:response.tid
      }
    })
  }
  if(!response){
    res.json({message:"Couldnt Add Table"})
    return
  }
  res.json({message:"Table Has Been Added"})
})

router.get("/deleteTable/:tid",async(req,res)=>{
    const response=await client.tables.delete({
      where:{
        tid:parseInt(req.params.tid)
      }
    })
  if(!response){
    res.json({message:"Couldnt Delete Table"})
  }
  if(response){
    await client.activities.create({
      data:{
        changedId:parseInt(req.params.tid),
        activity:"DELETED_TABLE"
      }
    })
  }
  res.json({message:"Table Has Been Deleted"})
})

router.get("/checkTable/:tid",async(req,res)=>{
  console.log("Here")
  const response=await client.tables.findFirst({
    where:{
      tid:parseInt(req.params.tid)
    }
  })
  res.json({table:response})
})

router.post("/sendRev",async (req,res)=>{
  const id=req.body.id
  const rating=req.body.rating
  const ratings=await client.items.findFirst({
    where:{
      itemId:id
    },
    select:{
      rating:true
    }
  })
  const response=await client.items.update({
    where:{
      itemId:id
    },
    data:{
      rating:[...ratings?.rating||[],rating]
    }
  })
})
