"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { OrderSkeletonLoader } from "./OrderSkeleton";
import { useOrders } from "@/lib/context/ordersContext";
import {
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { OrderCard, Toast } from "./OrderCard";
import { Modal } from "./Modal";
import axios from "axios";
import { Item } from "@/lib/types";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface Order {
  tableId: number;
  orderId: number;
  totalCost: number;
  createdAt: string;
  status: Status;
  items: [
    {
      item: Item;
      quantity: number;
    }
  ];
}

const ITEMS_PER_PAGE = 8;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | string>(
    Status.PENDING
  );
  const {RefreshOrders}=useOrders()
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filteredOrders,setFilteredOrders]=useState<Order[]>([])

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`
        );
        if (response.status === 200) {
          setOrders(response.data.response);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, [RefreshOrders]);
  useEffect(()=>{
    setFilteredOrders(orders.filter((order) => {
    const matchesSearch =
      String(order.orderId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.tableId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === Status.PENDING
        ? order.status === Status.PENDING
        : order.status === Status.COMPLETED;
    return matchesSearch && matchesStatus;
  }));
  setCurrentPage(1)
  },[searchTerm,orders,statusFilter])

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCompleteOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const confirmCompleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      // Send a PUT or PATCH request to update the status of the order
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/completeOrder`,
        {
          data: {
            id: selectedOrder.orderId,
          }, // The status we're updating to
        }
      );

      // If the response status is 200, update the local state
      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order.orderId === selectedOrder.orderId
              ? {
                  ...order,
                  status: Status.COMPLETED, // Update the status in the local state
                  completedAt: new Date().toISOString(), // Set the completed date
                }
              : order
          )
        );
        setSelectedOrder(null); // Close the modal
        setToast("Order marked as completed"); // Show success toast
      } else {
        setToast("Failed to complete the order");
      }
    } catch (error) {
      console.error("Error completing order:", error);
      setToast("An error occurred while completing the order");
    }
  };
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <RefreshCcw className="w-5 h-5 animate-spin" />
            <span className="text-sm">Refreshing...</span>
          </div>
        )}
      </div>

      <div className="grid gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Order ID or Table ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  text-primary"
          >
            <option value={Status.PENDING}>Active Orders</option>
            <option value={Status.COMPLETED}>Completed Orders</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        <AnimatePresence>
          {(!isLoading)?paginatedOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              totalCost={order.totalCost}
              onComplete={
                order.status === Status.PENDING
                  ? () => handleCompleteOrder(order)
                  : undefined
              }
            />
          )):
          Array(6).fill(0).map((_,i)=><OrderSkeletonLoader key={i}/>)}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Complete Order"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-gray-600">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <h3 className="font-medium">Confirm Order Completion</h3>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to mark Order #{selectedOrder?.orderId} as
                completed?
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmCompleteOrder}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete Order
            </button>
          </div>
        </div>
      </Modal>

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
