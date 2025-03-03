export interface Item{
    itemId: Number;
    name:String;
    bio:String;
    image:String;
    category:String;
    subcategory:String;
    tags: String[];
    isvegan:boolean;
    cost:Number;
    availability:Boolean;
}


export interface CartItem {
    itemId: Number;
    tableId:Number;
}

export interface Cart{
    
    tableId:Number;
    totalCost:Number;
    orders:{
        itemId:Number;
        quantity:Number;
    }[]
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    images: string;
  }