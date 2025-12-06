"use client";
import { CategorySkeletonLoader } from "@/app/admin/category/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus ,Star,StarHalf} from "lucide-react";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import MenuItemDetail from "./MenuItemDetail";
import { Item } from "@/lib/types";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { average } from "./MenuItemDetail";
interface MenuCarouselProps {
  items: Item[];
}

interface MenuCardProps {
  item: Item;
  onAddToCart: (item: Item) => void;
  onViewDetails: () => void;
}

export const MenuCarousel: React.FC<MenuCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { handleAddToCart } = useAddToCart();
  console.log(items)

  // Reset currentIndex to 0 when items change
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [items]);

  // Safety check to prevent index out of bounds
  const safeIndex = items.length > 0 ? currentIndex % items.length : 0;

  const handleNext = () => {
    if (items.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length === 0) return;
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: false,
  });

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-400">
          No items in this category
        </p>
      </div>
    );
  }
  return (
    <div className="relative px-6 py-4" {...handlers}>
      <div className="relative h-[350px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={safeIndex} // Use safeIndex to ensure no out-of-bounds errors
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
          >
            {items.length != 0 ? (
              <MenuCard
                item={items[safeIndex]}
                onAddToCart={handleAddToCart}
                onViewDetails={() => setSelectedItem(items[safeIndex])}
              />
            ) : (
              <CategorySkeletonLoader />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {items.length > 1 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 -mt-6 pointer-events-none ">
          <button
            onClick={handlePrev}
            className="glassmorphism h-12 w-12 rounded-full flex items-center justify-center text-primary dark:text-text pointer-events-auto"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="glassmorphism h-12 w-12 rounded-full flex items-center justify-center text-primary dark:text-text pointer-events-auto"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === safeIndex ? "w-6 bg-accent" : "w-2 bg-gray-600"
            }`}
          />
        ))}

        {/* Menu Item Detail Modal */}
        {selectedItem && (
          <MenuItemDetail
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

const MenuCard = ({ item, onAddToCart, onViewDetails }: MenuCardProps) => {
  return (
    <motion.div
      className="menu-card rounded-xl overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-black/50 backdrop-blur-sm text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-primary dark:text-text">
            {item.name}
          </h3>
          <span className="text-accent font-bold">${item.cost.toFixed(2)}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {item.bio}
        </p>
        <div className="flex items-center">
          <div className="flex">
          {[1,2,3,4,5].map((star)=>(
            (star<=average(item.rating||[3]))?
            <Star
              key={star}
              size={18}
              className="fill-yellow-400 text-yellow-400 mr-0.5"
            />:(average(item.rating||[3])>=star-0.5)?<div className="flex" key={star}><StarHalf size={18} className="absolute fill-yellow-400 text-yellow-400"/><Star size={18} className="text-gray-300 mr-0.5"/></div>:<Star key={star} size={18} className="text-gray-300 mr-0.5"/>
          ))}
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{average(item.rating||[3]).toFixed(1)} / 5</span>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={onViewDetails}
            className="text-gray-600 dark:text-gray-300 text-sm underline underline-offset-2"
          >
            View details
          </button>

          <button
            id={`add-to-cart-${item.itemId}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="floating-button cursor-pointer flex items-center justify-center w-10 h-10 rounded-full text-white"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
