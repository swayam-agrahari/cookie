import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/context/ItemContext";
import axios from "axios";
import { Toast } from "@/app/admin/components/Toast";
import { useRouter } from "next/navigation";
interface orderItem {
  itemId: number;
  quantity: number;
}
enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
interface order {
  status: Status;
  orders: orderItem[];
  tableId: number;
  totalCost: number;
}
const CartSidebar = (tid: { tid: number }) => {
  console.log("HelloCart" + tid.tid);
  const [placeOrder, setPlaceOrder] = useState<order | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const sendOrder = async () => {
      if (placeOrder != null) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`,
            placeOrder
          );

          if (res.status === 200) {
            setLoading(false);

            // const existingOrders = JSON.parse(
            //   localStorage.getItem("pastOrders") || "[]"
            // );

            // const newOrder = {
            //   ...placeOrder,
            //   orderId: res.data.fullOrder.orderId,
            // };

            // const updatedOrders = [...existingOrders, newOrder];
            // localStorage.setItem("pastOrders", JSON.stringify(updatedOrders));

            setToast("Order placed Successfully");
          }
        } catch (error) {
          console.error("Error placing order", error);
        }
      }
    };
    sendOrder();
  }, [placeOrder]);

  function Buy() {
    setLoading(true);
    setPlaceOrder({
      status: Status.PENDING,
      tableId: cart.tableId,
      totalCost: totalPrice,
      orders: cart.orders,
    });
    setCart({
      tableId: cart.tableId,
      orders: [],
      totalCost: 0,
    });
  }
  const {
    cart,
    removeFromCart,
    updateCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    setCart,
  } = useCart();

  function viewOrder() {
    router.push(`/table/${tid.tid}/orders`);
  }

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="sidebar fixed top-0 right-0 h-full w-80 z-50 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-800">
                <div id="toast" className="absolute top-4 right-4 z-50">
                  {toast && (
                    <Toast message={toast} onClose={() => setToast(null)} />
                  )}
                </div>

                <h2 className="text-xl font-bold  text-primary dark:text-text ">
                  Your Order
                </h2>
                <button
                  onClick={viewOrder}
                  className="text-sm  underline text-primary dark:text-text "
                >
                  View Orders
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="glassmorphism p-2 rounded-full"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {cart.orders.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <div className="text-gray-600 dark:text-gray-400 text-center">
                    <p className="mb-2">Your cart is empty</p>
                    <p className="text-sm">
                      Add some delicious items to get started
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {cart.orders.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="glassmorphism rounded-lg overflow-hidden flex"
                        >
                          <div className="w-20 h-20 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium  text-primary dark:text-text ">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.itemId)}
                                className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-accent font-medium">
                                ${(item.cost * item.quantity).toFixed(2)}
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    updateCart(item.itemId, item.quantity - 1)
                                  }
                                  className="glassmorphism w-6 h-6 rounded-full flex items-center justify-center"
                                >
                                  <Minus
                                    size={12}
                                    className=" text-primary dark:text-text "
                                  />
                                </button>
                                <span className="text-sm w-6 text-center  text-primary dark:text-text ">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateCart(item.itemId, item.quantity + 1)
                                  }
                                  className="glassmorphism w-6 h-6 rounded-full flex items-center justify-center"
                                >
                                  <Plus
                                    size={12}
                                    className=" text-primary dark:text-text "
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-800">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600 dark:text-gray-300">
                        Subtotal
                      </span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-6">
                      <span className="text-gray-600 dark:text-gray-300">
                        Tax (10%)
                      </span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        ${(totalPrice * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-6 text-lg font-bold">
                      <span className=" text-primary dark:text-text ">
                        Total
                      </span>
                      <span className="text-accent">
                        ${(totalPrice * 1.1).toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={Buy}
                      disabled={loading}
                      className="floating-button w-full py-3 rounded-lg  text-primary dark:text-text  font-medium"
                    >
                      {" "}
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Loading...
                        </div>
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;
