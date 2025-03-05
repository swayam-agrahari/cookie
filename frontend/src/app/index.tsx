"use client"
import { useEffect, useState } from "react";
import CategorySelector from "../../components/CategorySelector";
import {motion} from "framer-motion"
import { MenuCarousel } from "../../components/MenuCarousel";
import axios from "axios";
import FloatingCartButton from "../../components/FloatingCartButton";
import CartSidebar from "../../components/CardSidebar";

export default function Lander(){
    const [selectedCategory, setSelectedCategory] = useState<string>('Fast Food');
    const [filteredItems,setFilteredItems] = useState([])

    useEffect(() =>{
      const getMenuItems = async () =>{
        const items = await axios.post("http://192.168.109.8:3001/api/v1/category",{
          category:selectedCategory
        })
        if(!items){
          console.log("NO items found in this category")
          return []
        }

        setFilteredItems(items.data.items)
      };
      getMenuItems();
    },[selectedCategory])
  
    return(
        <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto pb-24"
        >
          <CategorySelector 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <MenuCarousel items={filteredItems} />
          <FloatingCartButton/>
          <CartSidebar/>
        </motion.div>
      </main>
      
    )
}