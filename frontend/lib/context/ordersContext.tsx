"use client";
import React, { createContext, useContext, useState} from "react";
interface OrderContextType {
  RefreshOrders: boolean;
  SetOrders: () => void;
}
const OrderContext = createContext<OrderContextType | undefined>(undefined);
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [RefreshOrders, setRefreshOrder] = useState(false);

  const SetOrders = () => {
    setRefreshOrder(!RefreshOrders);
  };
  return (
    <OrderContext.Provider value={{ RefreshOrders, SetOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("Orders Not Defined");
  }
  return context;
};
