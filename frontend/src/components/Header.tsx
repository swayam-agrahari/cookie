"use client";
import React from "react";
import { UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Header = ({ id }: { id: number }) => {
  return (
    <motion.div
      className="glassmorphism sticky top-0 z-50 py-4 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-accent" />
          <h1 className="text-xl font-bold tracking-tight text-primary dark:text-text ">
            Cookie
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Table #{`${id}`}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
