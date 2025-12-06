import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/ItemContext";

const FloatingCartButton: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <motion.button
      id="cart-button"
      className="floating-button fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingBag size={24} className="text-white" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-white text-[var(--accent)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          >
            {totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default FloatingCartButton;
