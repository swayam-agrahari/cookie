import { Router } from "express";
import { client } from "../../utils/client";
import { OrderSchema } from "../../utils";


export const router = Router();


//getting the menu
router.get('/menu',async (req,res) =>{
    console.log("fn hit")
    const response = await client.items.findMany({})
    if(!response){
        console.log("NO response")
        res.status(400).json({
            message:"No items found"
        })
    }

    res.status(200).json({
        items:response
    })
})


//placing an order
router.post('/orders/',async (req,res) =>{
    const parsedResponse = OrderSchema.safeParse(req.body);
    if(!parsedResponse.success){
        res.status(400).json({
            message:"Validation failed"
        })
        return
    }

    const tableId = Number(req.query.id);
    if(!tableId){
        res.status(400).json({
            message:"No table found"
        })
        return
    }

    let placedOrder = await client.$transaction(async ()=>{
        //transaction for creating order

        //creating order
        const order = await client.orders.create({
            data:{
                tableId:tableId,
                totalCost:parsedResponse.data?.totalCost,
            }
        })

        const cartItems = await client.cart.createMany({
            data:parsedResponse.data.cartItems.map((item) =>({
                orderId:order.orderId,
                itemId:item.itemId,
                quantity:item.quantity
            }))
        })

        console.log("order added")
        return order.orderId
        
    })

    res.status(200).json({
        orderId: placedOrder
    })

})

//item with itemId
router.get('/item',async (req,res) =>{
    const itemId = Number(req.query.id);
    if(!itemId){
        res.status(400).json({
            message:"No item id found"
        })
        return
    }

    try {
        const response = await client.items.findFirst({
            where:{
                itemId:itemId
            }
        
        })
        if(!response){
            res.status(400).json({
                message:"No item found"
            })
        }
        res.status(200).json({
            item:response
        })
    } catch (error) {
        console.log("Error getting item",error)
    }
})


//items with category
router.get('/category',async (req,res) =>{
    const categoryName = req.query.category;
    if(!categoryName || Array.isArray(categoryName)){
        res.status(400).json({
            message:"No such category found"
        })
        return
    }
    const response = await client.items.findMany({
        where:{
            category:categoryName
        }
    })

    if(!response){
        res.status(400).json({
            message:"No item with that category found"
        })
    }
    res.status(200).json({
        items:response
    })
})