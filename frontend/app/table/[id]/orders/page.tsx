"use client";

import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
interface savedOrders{
  createdAt
: 
"2025-04-16T15:22:25.312Z"
orderId:number
orders_items:Order
status:string
tableId:number
totalCost:number
}

interface OrderItem {
  itemId: number;
  quantity: number;
  iid: {
    name: string;
    cost: number;
    image: string;
  };
}

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

interface Order {
  orderId: number;
  orders_items: OrderItem[];
  tableId: number;
  status: Status;
  totalCost: number;
  timestamp: Date;
}

export default function OrdersPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = use(params);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const myOrder = async () => {
      try {
        const savedOrders = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getOrderWithTID`,
          {
            tid: Number(id.id),
          }
        );
        console.log(savedOrders.data)
        if (savedOrders.status === 400 || !savedOrders.data.orders.length) {
          return;
        }
        const orders = savedOrders.data.orders.map((order: savedOrders) => ({
          ...order,
          timestamp: new Date(order.createdAt), // Convert string to Date object
        }));
        setPastOrders(orders);
      } catch (error) {
        console.log("Error loading past orders from localStorage", error);
      }
    };

    myOrder();
  }, [id]); // Don't forget to add `id` as a dependency

  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push(`/table/${id.id}`)}
            className="flex items-center text-accent hover:text-accent/80"
          >
            <ChevronLeft size={20} />
            <span>Back to Menu</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-primary dark:text-text">
          Your Orders
        </h1>

        {pastOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              You don&apos;t have any orders yet
            </p>
            <button
              onClick={() => router.back()}
              className="floating-button px-6 py-3 rounded-lg text-primary dark:text-text"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {pastOrders.map((order, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-lg overflow-hidden"
              >
                <div className="bg-gray-900/50 p-4 flex flex-wrap justify-between items-center">
                  <div>
                    <p className="font-bold text-primary dark:text-text">
                      Order #{String(order.orderId)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {formatDate(order.timestamp)}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === Status.COMPLETED
                          ? "bg-green-900/30 text-green-400"
                          : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="font-bold mt-2 sm:mt-0 text-accent">
                    Total: ${order.totalCost.toFixed(2)}
                  </p>
                </div>

                <div className="p-4">
                  <h3 className="font-medium mb-3 text-primary dark:text-text">
                    Items:
                  </h3>
                  <div className="space-y-3">
                    {order.orders_items.map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className="h-12 w-12 overflow-hidden rounded-md mr-3">
                          <img
                            src={item.iid.image}
                            alt={item.iid.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-primary dark:text-text">
                            {item.iid.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity} × ${item.iid.cost.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium text-accent">
                          ${(item.quantity * item.iid.cost).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
