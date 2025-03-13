"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Item } from "@/lib/types";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategorySelector from "@/components/CategorySelector";
import { MenuCarousel } from "@/components/MenuCarousel";
import FloatingCartButton from "@/components/FloatingCartButton";
import CartSidebar from "@/components/CardSidebar";
import MenuItemGrid from "@/components/MenuItemGrid";

export default function Home({ params }: { params: Promise<{ id: number }> }) {
  const id = use(params);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    console.log("here", id.id);
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
    };
    getMenuItems();
  }, [selectedCategory]);

  return (
    <>
      <div className="min-h-screen text-text bg-background ">
        <Header id={id.id} />
        <SearchBar onSelectItem={setSelectedCategory} />
        <main>
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
            <MenuCarousel items={filteredItems} />
            <FloatingCartButton />
            <CartSidebar />

            <MenuItemGrid items={filteredItems} />
          </motion.div>
        </main>
      </div>
    </>
  );
}
