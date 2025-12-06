import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus,Star,StarHalf } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MenuItemDetail from "./MenuItemDetail";
import { average } from "./MenuItemDetail";
import { Item } from "@/lib/types";
import { useCart } from "@/lib/context/ItemContext";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
interface MenuItemGridProps {
  items: Item[];
}
const MenuItemGrid: React.FC<MenuItemGridProps> = ({ items }) => {
  const { addToCart } = useCart();
  const [startPagination, setStartPagination] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const itemsPerPage = 9;
  const endPagination = Math.ceil(items.length / itemsPerPage);
  const [paginatedItems, setPaginatedItems] = useState(
    items.slice(startPagination, startPagination + itemsPerPage)
  );
  const [page, setPage] = useState(1);
  const { handleAddToCart } = useAddToCart();
  useEffect(() => {
    const setPages = () => {
      setPaginatedItems(
        items.slice(startPagination, startPagination + itemsPerPage)
      );
    };
    setPages();
  }, [startPagination, itemsPerPage, items]);
  useEffect(() => {
    const resetPage = () => {
      setStartPagination(0);
      setPage(1);
    };
    resetPage();
  }, [items]);
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
        {paginatedItems.map((menuItem) => (
          <motion.div
            key={menuItem.itemId}
            variants={item}
            className="menu-card overflow-hidden rounded-xl"
            whileHover={{ y: -5 }}
          >
            <div
              className=""
              onClick={() => {
                setSelectedItem(menuItem);
              }}
            >
              <div className="relative h-32 sm:h-48">
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {menuItem.tags && menuItem.tags.length > 0 && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2 ">
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

                <p className="text-gray-600 dark:text-gray-300 hidden sm:block sm:text-sm  mb-2 line-clamp-2">
                  {menuItem.bio}
                </p>  
                <div className="flex items-center">
                  <div className="flex">
                    {
                   [1,2,3,4,5].map((star)=>(
                    (star<=average(menuItem.rating||[3]))?
                    <Star
                      key={star}
                      size={18}
                      className="fill-yellow-400 text-yellow-400 mr-0.5"
                    />:(average(menuItem.rating||[3])>=star-0.5)?<div className="flex" key={star}><StarHalf size={18} className="absolute fill-yellow-400 text-yellow-400"/><Star size={18} className="text-gray-300 mr-0.5"/></div>:<Star key={star} size={18} className="text-gray-300 mr-0.5"/>
                  ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{average(menuItem.rating||[3]).toFixed(1)} / 5</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-4">
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
          </motion.div>
        ))}
      </motion.div>
      {selectedItem && (
        <MenuItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      <div className="relative flex top-10 justify-center items-center">
        <button
          disabled={page == 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            setStartPagination(startPagination - itemsPerPage);
            setPage(page - 1);
          }}
        >
          <ChevronLeft className="text-black dark:text-white" />
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {endPagination != 0 ? endPagination : 1}
        </span>
        <button
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page >= endPagination}
          onClick={() => {
            setStartPagination(startPagination + itemsPerPage);
            setPage(page + 1);
          }}
        >
          <ChevronRight className="text-black dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default MenuItemGrid;
