import React from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  ShoppingBag,
  Cat as Categories,
  Package,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/admin" },
  { icon: Categories, label: "Categories", href: "/admin/category" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-[300px] bg-white dark:bg-gray-800 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-lg">{item.label}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
