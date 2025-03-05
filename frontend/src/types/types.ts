export interface Item{
    itemId: number;
    name:string;
    bio:string;
    image:string;
    category:string;
    subcategory:string;
    tags: string[];
    isvegan:boolean;
    cost:number;
    availability:Boolean;
}


export interface CartItem {
    itemId: number;
    tableId:number;
}

export interface Cart{
    
    tableId:number;
    totalCost:number;
    orders:{
        itemId:number;
        quantity:number;
        name:string;
        image:string;
        cost:number;
    }[]
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    images: string;
  }