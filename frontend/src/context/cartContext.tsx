"use client"
import { Cart, CartItem } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType{
    cart:Cart | undefined;
    addToCart:(item:CartItem,quantity:number) => void;
    removeFromCart: (item:CartItem )=> void;
    updateCart:(item:CartItem,quantity:number)=> void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const cartContext = createContext<CartContextType | undefined>(undefined)


export const cartProvider:React.FC<{children:React.ReactNode}> = ({children}) =>{
    const [cart,setCart] = useState<Cart>()
    const [isCartOpen, setIsCartOpen] = useState(false);

    //Initial load of card on mount 

    useEffect(()=>{
       
        try {
            const cartItems = sessionStorage.getItem("cart");
            if(!cartItems){
                console.log("No cart found!")
                return
            }
            setCart(JSON.parse(cartItems))
            
        } catch (error) {
            console.log("error ",error)
        }
       
    },[])
    //render each time cart is updated
    useEffect(()=>{
        try {
            sessionStorage.setItem("cart",JSON.stringify(cart))
        } catch (error) {
            console.log("Error setting the cart",error);
        }
    },[cart])

    //add to cart
    const addToCart = (item:CartItem,quantity:Number) =>{
        setCart((prevCart) => {
            if (!prevCart) {
                return prevCart;
            }
            //check if item is there in cart or not
            const itemIndex = prevCart.orders.findIndex((i) => item.itemID === i.itemId);
            if (itemIndex === -1) {
                //add item
                const addedItems = [...prevCart.orders,{itemId:item.itemID, quantity:quantity}];
                return {
                    ...prevCart,
                    orders:addedItems
                }
            }
                //update item
                const updatedItems = [...prevCart.orders]; 
                updatedItems[itemIndex].quantity = Number(updatedItems[itemIndex].quantity) + Number(quantity); 
            
                return {
                    ...prevCart,
                    orders: updatedItems,
                };
            
           

        });
        
    } 

    //remove from cart

    const removeFromCart = (item:CartItem) =>{
        setCart((prevCart) =>{
            if(!prevCart){
                return prevCart;
            }
            const updatedOrders = prevCart?.orders.filter((i) => item.itemID  !== i.itemId)
            return{
                ...prevCart,
                orders:updatedOrders
            }

        })
    }
    //update quantity

    const updateCart = (item:CartItem,quantity:Number) =>{
        if(Number(quantity) <= 0){
            //remove from cart
            removeFromCart(item);
            return;
        }
        setCart((prevCart) =>{
            //update the cart
            if(!prevCart)return prevCart
            const itemIndex = prevCart.orders.findIndex((i) => item.itemID === i.itemId);
            const updatedItem = [...prevCart.orders]
            updatedItem[itemIndex].quantity = quantity;
            return {
                ...prevCart,
                orders:updatedItem,
            }
        
        })
    }

    return(
        <cartContext.Provider
        value={{cart,addToCart,removeFromCart,updateCart,isCartOpen,setIsCartOpen}}
        >

            {children}
        </cartContext.Provider>
    )

}

export const useCart = () =>{
    const context = useContext(cartContext);
    if(!context){
        throw new Error("no context found!")
    }
    return context
}