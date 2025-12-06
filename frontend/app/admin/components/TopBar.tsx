import React from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { UserMenu } from "./UserMenu";
import Timer from "./Timer";
interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </motion.button>
        </div>
      
        <div className="flex items-center gap-6 sm:gap-4 ">
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
           <Timer/>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative  hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg"
          >
            
            <ThemeToggle />
          </motion.div>

          <UserMenu />
          
        </div>
      </div>
    </header>
  );
};
