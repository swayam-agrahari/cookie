"use client"
import { Category } from '@/types/types';
import axios from 'axios';
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';



interface CategorySelectorProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}


export default function CategorySelector ({selectedCategory,onSelectCategory}:CategorySelectorProps){
    const [categories,setCategories] = useState([])
    

    useEffect(()=>{
      const getCategories = async () =>{
        try {
            const response = await axios.get(`http://192.168.109.8:3001/api/v1/getCategories`,{
                
            })
            if(!response || response.status != 200 ){
                console.log("No categories found")
                return
            }
    
            setCategories( response.data.categories || [])
    
    
        } catch (error) {
            console.log("error getting categories",error)
            
        }
    }
    getCategories();

   
    
      
    },[])
    return (
        <div className="py-4 overflow-x-auto">
          <motion.div 
            className="flex space-x-4 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category: Category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.name}
                onSelect={() => onSelectCategory(category.name)}
              />
            ))}
          </motion.div>
        </div>
      );
}

interface CategoryCardProps {
    category: Category;
    isSelected: boolean;
    onSelect: () => void;
  }

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onSelect }) => {
    return (
      <motion.div
        className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
          isSelected ? 'ring-2 ring-[var(--accent)] shadow-lg scale-105' : 'opacity-70'
        }`}
        whileTap={{ scale: 0.95 }}
        onClick={onSelect}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <img
          src={category.images}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
          <p className="text-white text-sm font-medium">{category.name}</p>
        </div>
        {isSelected && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)]"
            layoutId="categoryIndicator"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    );
  };