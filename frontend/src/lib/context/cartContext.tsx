"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Cart, Item } from "../types";

interface CartContextType {
  cart: Cart;
  addToCart: (item: Item, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCart: (itemId: number, quantity: number) => void;
  isCartOpen: boolean;
  totalItems: number;
  setIsCartOpen: (isOpen: boolean) => void;
  totalPrice: number;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>({
    tableId: 1,
    totalCost: 0,
    orders: [],
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  //Initial load of card on mount

  useEffect(() => {
    console.log("Component rendered 6");
    console.log("useEffect me");
    try {
      const cartItems = sessionStorage.getItem("cart");
      if (!cartItems) {
        console.log("No cart found!");
        sessionStorage.setItem("cart", JSON.stringify({}));
        return;
      }

      console.log("till here");
      setCart(JSON.parse(cartItems));
      console.log("he", cartItems);
    } catch (error) {
      console.log("error ", error);
    }
  }, []);

  //render each time cart is updated
  useEffect(() => {
    console.log("Component rendered");
    try {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.log("Error setting the cart", error);
    }
  }, [cart]);

  // Add to cart
  const addToCart = (item: Item, quantity: number) => {
    console.log(
      "addToCart called for item:",
      item.itemId,
      "with quantity:",
      quantity
    );

    setCart((prevCart) => {
      // Find if the item is already in the cart
      const itemIndex = prevCart.orders.findIndex(
        (i) => item.itemId === i.itemId
      );
      console.log("itemIndex", itemIndex);

      // If item is not found, add it to the cart
      if (itemIndex === -1) {
        const addedItem = {
          itemId: item.itemId,
          quantity: quantity,
          name: item.name,
          image: item.image,
          cost: item.cost,
        };

        return {
          ...prevCart,
          orders: [...prevCart.orders, addedItem],
        };
      } else {
        // If item exists, update the quantity properly
        const updatedItems = [...prevCart.orders];
        updatedItems[itemIndex].quantity += quantity;

        return {
          ...prevCart,
          orders: updatedItems,
        };
      }
    });
  };

  //remove from cart

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      if (!prevCart) {
        return prevCart;
      }
      const updatedOrders = prevCart?.orders.filter((i) => itemId !== i.itemId);
      return {
        ...prevCart,
        orders: updatedOrders,
      };
    });
  };
  //update quantity

  const updateCart = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      //remove from cart
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) => {
      //update the cart
      if (!prevCart) return prevCart;
      const itemIndex = prevCart.orders.findIndex((i) => itemId === i.itemId);
      const updatedItem = [...prevCart.orders];
      updatedItem[itemIndex].quantity = quantity;
      return {
        ...prevCart,
        orders: updatedItem,
      };
    });
  };

  //calculate the total items
  const totalItems = cart
    ? cart.orders.reduce((total, item) => total + Number(item.quantity), 0)
    : 0;

  //calculate total price
  const totalPrice = cart
    ? cart.orders.reduce((total, item) => total + item.cost * item.quantity, 0)
    : 0;

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("no context found!");
  }
  return context;
};
