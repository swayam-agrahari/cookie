"use client";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Item } from "@/lib/types";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CategorySelector from "@/components/CategorySelector";
import { MenuCarousel } from "@/components/MenuCarousel";
import FloatingCartButton from "@/components/FloatingCartButton";
import CartSidebar from "@/components/CardSidebar";
import MenuItemGrid from "@/components/MenuItemGrid";
import { TableSkeleton } from "@/components/tableSkeleton";
export default function Home({ params }: { params: Promise<{ id: number|string }> }) {
  const id = use(params);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [carouselItems,setCarouselItems]=useState<Item[]>([])
  const [load, setLoad] = useState(true);
  const [tableFound,setTableFound]=useState(false)
  useEffect(()=>{const validateTable=async()=>{
    if(id.id=="not-found"){
      setTableFound(false)
    }else{
      setTableFound(true)
    }
  }
  validateTable()},[id])
  
  useEffect(() => {
    if (String(id.id) == "authentication") {
      router.push("/authentication");
    }
  });

  useEffect(() => {
    console.log("Component rendered 1");
    const getMenuItems = async () => {
      const items = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/category`,
        {
          category: selectedCategory,
        }
      );
      if (!items) {
        console.log("NO items found in this category");
        return [];
      }
      
      setFilteredItems(items.data.items);
      const itemsWithAverageRating=items.data.items.map((item:Item)=> {
        const ratings=item.rating||[3];
        const averageRating=ratings.length>0 
          ? ratings.reduce((a,b) =>a+b,0)/ratings.length 
          : 0;
        
        return {
          ...item,
          averageRating,  
        };
      });
      const sortedItems = itemsWithAverageRating.sort((a:Item,b:Item) => (b?.averageRating||0)-(a?.averageRating||1));
      setCarouselItems(sortedItems.slice(0,5))
      setLoad(false);
    };
    getMenuItems();
  }, [selectedCategory]);
  if(tableFound){
    if (load != true) {
      return (
        <>
          <div className="min-h-screen text-text bg-background ">
            <Navbar id={id.id as number} />
            <SearchBar onSelectItem={setSelectedCategory} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:container mx-auto pb-24"
              >
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                <MenuCarousel items={carouselItems} />
                <FloatingCartButton />
                <CartSidebar tid={id.id as number} />

                <MenuItemGrid items={filteredItems} />
              </motion.div>
          </div>
        </>
      );
  } else {
    return (
      <>
        <div className="min-h-screen text-text bg-background ">
          <Navbar id={id.id as number} />
          <SearchBar onSelectItem={setSelectedCategory} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:container mx-auto pb-24"
            >
              <TableSkeleton />
              <FloatingCartButton />
            </motion.div>
        </div>
      </>
    );
  }
  }else{
    return(
      <div className="min-h-screen text-text bg-background">
        <Navbar id={id.id as number} />
        <SearchBar onSelectItem={setSelectedCategory} />
        <main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:container mx-auto pb-24"
          >
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-32 h-32 mb-6 relative"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-gray-400"
                >
                  <path
                    d="M3.5 5.5L20.5 5.5M9 5.5V3M15 5.5V3M21 9.5V19.5C21 20.6046 20.1046 21.5 19 21.5H5C3.89543 21.5 3 20.6046 3 19.5V9.5M7 11.5H9M15 11.5H17M7 15.5H9M15 15.5H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-red-500"
                    >
                      <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
              <motion.h1
                className="text-3xl font-bold mb-4 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Table Not Found
              </motion.h1>
              <motion.p
                className="text-lg text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                We couldn&apos;t find the table you&apos;re looking for. It may have been moved or doesn&apos;t exist.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Go Back
                </button>
               
              </motion.div>
            </div>
            <FloatingCartButton />
          </motion.div>
        </main>
      </div>
    
    )
  }
}
