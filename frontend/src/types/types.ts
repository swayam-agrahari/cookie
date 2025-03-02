export interface Item{
    itemID: Number;
    name:String;
    bio:String;
    image:String;
    category:String;
    subcategory:String;
    isvegan:boolean;
    cost:Number;
    availability:Boolean;
}

export interface CartItem {
    itemID: Number;
    tableId:Number;
}

export interface Cart{
    id:Number;
    tableId:Number;
    totalCost:Number;
    orders:{
        itemId:Number;
        quantity:Number;
    }[]
}