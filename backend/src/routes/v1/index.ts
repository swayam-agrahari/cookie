import e, { Router } from "express";
import { client } from "../../utils/client";
import { categories, ItemSchema, OrderSchema } from "../../utils";

export const router = Router();

//getting the menu
router.get("/menu", async (req, res) => {
  console.log("e hit");
  const response = await client.items.findMany({
    where: {
      availability: true,
    },
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
    return order.orderId;
  });
  res.status(200).json({
    fullOrder: placedOrder,
  });
});

//getting orders
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

  res.status(200).json({
    message: "Updated order",
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
  const response = await client.category.findMany({});
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
  const response = await client.users.findFirst({
    where: {
      username: username,
    },
  });
  if (response != null) {
    if (password == response.password) {
      res.json({ message: "Succesfully Logged In" });
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

router.post("/userAuth", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const data = await client.users.findFirst({
    where: {
      username: username,
    },
  });
  if (data != null) {
    if (password == data.password) {
      res.status(200).json({ message: "Succesfully Logged In" });
    } else {
      res.status(400).json({ message: "Incorrect Password" });
    }
  }
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
    },
  });
  if (!response) {
    res.status(400).json({ message: "Could Not Update Item" });
  }
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
  let Cat = await client.$transaction(async () => {
    const cat = await client.category.create({
      data: {
        images: parsedResponse.data.images,
        name: parsedResponse.data.name,
        slug: parsedResponse.data.slug,
        description: parsedResponse.data.description,
      },
    });
  });
  res.status(200).json({
    message: "Category Has Been Added",
  });
});

router.post("/deleteItem", async (req, res) => {
  const itemId = req.body.id;
  const response = await client.items.delete({
    where: {
      itemId: itemId,
    },
  });
  if (!response) {
    res.json({ message: "Error Deleting Item" });
  }
  res.json({ message: "Item Has Been Deleted" });
});

router.post("/editCat", async (req, res) => {
  const parsedResponse = categories.safeParse(req.body);
  console.log("updateCat");
  if (!parsedResponse.success) {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }
  console.log(parsedResponse);
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
});
