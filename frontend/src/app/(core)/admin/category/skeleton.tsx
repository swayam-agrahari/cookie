import { motion } from "framer-motion";
export const CategorySkeletonLoader = () => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative h-36 md:h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 w-1/2 rounded mb-4"></div>
        <div className="h-5 bg-gray-300 w-1/3 rounded"></div>
      </div>
    </motion.div>
  );
};
