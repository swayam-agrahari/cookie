
export interface Item {
  itemId: number;
  name: string;
  bio: string;
  image: string;
  category: string;
  subcategory: string;
  tags: string[];
  isvegan: boolean;
  cost: number;
  availability: boolean;
  ingredients: string[];
  createdAt?: string;
  rating?:number[]
  averageRating?:number
}

export interface Cart {
  tableId: number;
  totalCost: number;
  orders: {
    itemId: number;
    quantity: number;
    name: string;
    image: string;
    cost: number;
  }[];
}

export interface Category {
  name: string;
  slug: string;
  images: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface Table{
  tid:number,
  tablename:string
}
