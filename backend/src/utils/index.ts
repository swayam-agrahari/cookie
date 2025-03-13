import z from "zod";

export const cart = z.object({
  itemId: z.number(),
  name: z.string(),
  image: z.string(),
  cost: z.number().positive(),
  quantity: z.number().positive(),
});
export const OrderSchema = z.object({
  tableId: z.number().positive(),
  totalCost: z.number().positive(),
  status: z.enum(["PENDING", "COMPLETED"]),
  orders: cart.array(),
});

export const ItemSchema = z.object({
  itemId: z.number().optional(),
  name: z.string(),
  bio: z.string(),
  image: z.string(),
  category: z.string(),
  subcategory: z.string(),
  tags: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  isvegan: z.boolean(),
  cost: z.number().positive(),
  availability: z.boolean(),
});

export const users = z.object({
  username: z.string(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
});

export const categories = z.object({
  categoryId: z.number().optional(),
  name: z.string(),
  images: z.string(),
  description: z.string(),
  slug: z.string(),
});
