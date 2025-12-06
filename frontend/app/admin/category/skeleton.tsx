import { motion } from "framer-motion";
export const CategorySkeletonLoader = () => {
  return (
    <>
     <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:container mx-auto pb-24"
              ></motion.div>
    <motion.div
      className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative h-36 md:h-48 bg-gray-300  animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 w-3/4 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-1/2 rounded mb-4 animate-pulse"></div>
        <div className="h-5 bg-gray-300 w-1/3 rounded animate-pulse"></div>
      </div>
    </motion.div>
    </>
  );
};
