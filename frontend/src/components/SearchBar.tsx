import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Item } from "@/lib/types";
import axios from "axios";

interface SearchBarProps {
  onSelectItem: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Component rendered 3");
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    console.log("Component rendered 4");
    const items = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/menu`
      );
      console.log(response.data);
      if (response.status != 200) {
        return [];
      } else {
        setMenuItems(response.data.items);
      }
    };

    items();
  }, []);

  useEffect(() => {
    console.log("Component rendered 5");
    if (query.length >= 1) {
      const filtered = menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.bio.toLowerCase().includes(query.toLowerCase()) ||
          item.tags?.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleItemClick = (item: Item) => {
    onSelectItem(item.category);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div
      ref={searchRef}
      className="relative w-full max-w-2xl mx-auto my-4 px-6 mb-4"
    >
      <div
        className="glassmorphism w-full flex items-center gap-3 p-3 rounded-xl cursor-text"
        onClick={() => setIsOpen(true)}
      >
        <Search size={20} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for dishes, ingredients, or dietary preferences..."
          className="flex-1 bg-transparent border-none outline-none  text-primary dark:text-text  placeholder-gray-400"
        />
        {query && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuery("");
            }}
            className="p-1 rounded-full hover:bg-gray-800/30"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-6 right-6 top-full mt-2 glassmorphism rounded-xl overflow-hidden z-50"
          >
            <div className="max-h-80 overflow-y-auto">
              {results.map((item) => (
                <motion.button
                  key={item.itemId}
                  onClick={() => handleItemClick(item)}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-800/30 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className=" text-primary dark:text-text font-medium">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-accent">
                        ${item.cost.toFixed(2)}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex gap-1">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-xs text-gray-400">
                              • {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {isOpen && query.length >= 2 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-6 right-6 top-full mt-2 glassmorphism rounded-xl p-4 text-center text-gray-600 dark:text-gray-300 z-50"
          >
            No items found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
