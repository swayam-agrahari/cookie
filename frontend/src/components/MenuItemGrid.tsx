import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Item } from "@/lib/types";
import { useCart } from "@/lib/context/cartContext";


interface MenuItemGridProps {
  items: Item[];
}

const MenuItemGrid: React.FC<MenuItemGridProps> = ({ items }) => {
  const { addToCart } = useCart();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6  text-primary dark:text-text ">
        All Menu Items
      </h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {items.map((menuItem) => (
          <motion.div
            key={menuItem.itemId}
            variants={item}
            className="menu-card overflow-hidden rounded-xl"
          >
            <div className="relative h-32 sm:h-48">
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {menuItem.tags && menuItem.tags.length > 0 && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2">
                  {menuItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded-full bg-black/50 backdrop-blur-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start mb-1 sm:mb-2">
                <h3 className="text-sm sm:text-lg font-semibold  text-primary dark:text-text  line-clamp-1">
                  {menuItem.name}
                </h3>
                <span className="text-accent font-bold text-sm sm:text-base">
                  ${menuItem.cost.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                {menuItem.bio}
              </p>

              {menuItem.ingredients && (
                <div className="mb-2 sm:mb-4 hidden sm:block">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {menuItem.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="text-[10px] sm:text-xs text-gray-400"
                      >
                        • {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => addToCart(menuItem, 1)}
                  className="floating-button flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-white"
                >
                  <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-base">Add to cart</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MenuItemGrid;
