import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cartContext';


const CartSidebar: React.FC = () => {
    const [placeOrder, setPlaceOrder] = useState();

  const {
    cart,
    removeFromCart,
    updateCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    
  } = useCart();


  return (
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="sidebar fixed top-0 right-0 h-full w-80 z-50 overflow-hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-800">
              <h2 className="text-xl font-bold">Your Order</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="glassmorphism p-2 rounded-full"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {cart.orders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-gray-400 text-center">
                  <p className="mb-2">Your cart is empty</p>
                  <p className="text-sm">Add some delicious items to get started</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {cart.orders.map((item,i) => (
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
                            <h3 className="text-sm font-medium">{item.name}</h3>
                            <button
                              onClick={() => removeFromCart(item.itemId)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-accent font-medium">
                              ${(item.cost * (item.quantity)).toFixed(2)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateCart(item.itemId, item.quantity - 1)}
                                className="glassmorphism w-6 h-6 rounded-full flex items-center justify-center"
                              >
                                <Minus size={12} className="text-white" />
                              </button>
                              <span className="text-sm w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCart(item.itemId, item.quantity + 1)}
                                className="glassmorphism w-6 h-6 rounded-full flex items-center justify-center"
                              >
                                <Plus size={12} className="text-white" />
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
                    <span className="text-gray-300">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-300">Tax (10%)</span>
                    <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-6 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="floating-button w-full py-3 rounded-lg text-white font-medium"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;