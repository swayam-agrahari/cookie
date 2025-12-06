"use client";
import { motion } from "framer-motion";
export const ItemNotFound: React.FC = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className=" bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
                Item Not Found
            </h3>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-200 text-yellow-700`}
          >
            ITEM_NOT_FOUND
          </div>
        </div>
        <p className="text-yellow-600">The Item Has Been Deleted And More Info Is Not Available</p>
        </div>
    </motion.div>
  );
};
