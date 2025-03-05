"use client"
import { useCart } from "@/context/cartContext";
import { Item } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import MenuItemDetail from "./MenuItemDetails";
import Image from "next/image";

interface MenuCarouselProps {
    items: Item[];
}

interface MenuCardProps {
    item:Item;
    onAddToCart:(item:Item) => void;
    onViewDetails: () => void;
}

export const MenuCarousel:React.FC<MenuCarouselProps> = ({items}) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [direction,setDirection] = useState(0);
    const [selectedItem,setSelectedItem] = useState<Item | null>(null);
    const {addToCart} = useCart()



    const handleNext = () =>{
        setDirection(1);
        setCurrentIndex((prevIndex) =>(prevIndex + 1) % items.length)
    }
    const handlePrev = () =>{
        setDirection(-1);
        setCurrentIndex((prevIndex) =>(prevIndex - 1 + items.length) % items.length)
    }

    const handlers = useSwipeable({
        onSwipedLeft:handlePrev,
        onSwipedRight:handleNext,
        trackMouse:true
    })

    const handleAddToCart = (item:Item) =>{
        console.log("in here")
        addToCart(item,1)

        const floatingBtn = document.createElement("div")
        floatingBtn.className = 'fixed z-50 bg-[var(--accent)] rounded-full p-2 shadow-lg';
        floatingBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        document.body.appendChild(floatingBtn);


        const buttonRect = document.getElementById(`add-to-cart-${item.itemId}`)?.getBoundingClientRect();
        if (buttonRect) {
            floatingBtn.style.left = `${buttonRect.left}px`;
            floatingBtn.style.top = `${buttonRect.top}px`;

            const cartButton = document.getElementById('cart-button')?.getBoundingClientRect();
            if (cartButton) {
                floatingBtn.style.transition = 'all 1s ease-in-out';
                setTimeout(() => {
                    floatingBtn.style.left = `${cartButton.left + cartButton.width/2 - 12}px`;
                    floatingBtn.style.top = `${cartButton.top + cartButton.height/2 - 12}px`;
                  floatingBtn.style.opacity = '0';
                  floatingBtn.style.transform = 'scale(0.5)';
                }, 10);
                
                
              }

    }

    }

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

    if(items.length == 0){
        return(
            <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">No items in this category</p>
          </div>
        )
    }
     
    return(
        <div className="relative px-6 py-4 " {...handlers}>

            <div className="relative h-[450px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            }}
            className="absolute w-full"
            >
            <MenuCard 
            item={items[currentIndex]} 
            onAddToCart={handleAddToCart}
            onViewDetails={() => setSelectedItem(items[currentIndex])}
            />
            </motion.div>
            </AnimatePresence>
            </div>
            {items.length > 1 && <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 -mt-6 pointer-events-none ">
                <button
                onClick={handlePrev}
                className="glassmorphism h-12 w-12 rounded-full flex items-center justify-center text-white pointer-events-auto"
                >
                <ChevronLeft size={24} />
                </button>
                <button
                onClick={handleNext}
                className="glassmorphism h-12 w-12 rounded-full flex items-center justify-center text-white pointer-events-auto"
                >
                <ChevronRight size={24} />
                </button>
            </div>}
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
                    index === currentIndex
                        ? 'w-6 bg-[var(--accent)]'
                        : 'w-2 bg-gray-600'
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
    )
}



  


const MenuCard = ({item,onAddToCart,onViewDetails}:MenuCardProps) =>{
    return (
        <motion.div 
          className="menu-card rounded-xl overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={item.image}
             alt="sas"
             fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {(item.tags && item.tags.length > 0 ? item.tags : ["dairy", "good", "vegan"]).length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {(item.tags ?item.tags : ["dairy", "good", "vegan"]  ).map((tag,i) => (
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
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <span className="text-[var(--accent)] font-bold">${item.cost.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.bio}</p>
                
                <div className="flex justify-between items-center">
                <button
                    onClick={onViewDetails}
                    className="text-white text-sm underline underline-offset-2"
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