import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

import { Item } from '@/types/types';

interface MenuItemDetailProps {
  item: Item;
  onClose: () => void;
  onAddToCart: (item: Item) => void;
}

const MenuItemDetail: React.FC<MenuItemDetailProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };



  const handleAddToCart = () => {
    onAddToCart(item);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="modal w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="h-56 overflow-hidden">
              <img
                src={String(item.image)}
                alt={String(item.name)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 glassmorphism p-2 rounded-full"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>
              <span className="text-[var(--accent)] text-xl font-bold">${item.cost.toFixed(2)}</span>
            </div>
            
            <p className="text-gray-300 mb-6">{item.bio}</p>
            
            { (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {["dairy", "good", "vegan"].map((tag,i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300"
                    >
                      {tag} 
                    </span>
                  ))}
                </div>
              </div>
            )}
            
        
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDecrement}
                  className="glassmorphism w-8 h-8 rounded-full flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} className="text-white" />
                </button>
                
                <span className="text-white font-medium">{quantity}</span>
                
                <button
                  onClick={handleIncrement}
                  className="glassmorphism w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <Plus size={16} className="text-white" />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="floating-button flex items-center space-x-2 px-4 py-2 rounded-lg text-white"
              >
                <ShoppingBag size={18} />
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuItemDetail;