import z from 'zod'

export const cart = z.object({
    itemId:z.number(),
    quantity:z.number().positive(),
})
export const OrderSchema = z.object({
    tableId: z.number().positive(),
    totalCost:z.number().positive(),
    cartItems:cart.array()
})

export const ItemSchema = z.object ({
    name:z.string(),
    bio:z.string(),
    image:z.string(),
    category:z.string(),
    subcategory:z.string(),
    isvegan:z.boolean(),
    cost:z.number().positive(),
    avalability:z.boolean()
})




export const users = z.object ({
    username:z.string(),
    password:z.string().min(8),
    isAdmin:z.boolean()
})
