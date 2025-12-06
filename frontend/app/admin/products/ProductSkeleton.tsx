import { motion, AnimatePresence } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
      <AnimatePresence>
        {/* Skeleton for each product */}
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 md:h-56 bg-gray-200 animate-pulse">
              {/* Skeleton for the image */}
              <div className="w-full h-full bg-gray-300"></div>
              <div className="absolute top-2 right-2 flex gap-2">
                {/* Skeleton for buttons */}
                <div className="p-2 bg-white/90 rounded-full w-8 h-8 bg-gray-200"></div>
                <div className="p-2 bg-white/90 rounded-full w-8 h-8 bg-gray-200"></div>
              </div>
              <div className="absolute bottom-2 left-2">
                {/* Skeleton for availability badge */}
                <div className="px-2 py-1 rounded-full w-24 h-6 bg-gray-200"></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                {/* Skeleton for title and price */}
                <div className="w-1/2 h-5 bg-gray-200 animate-pulse"></div>
                <div className="w-16 h-5 bg-gray-200 animate-pulse"></div>
              </div>
              <div className="mt-1">
                {/* Skeleton for description */}
                <div className="w-full h-16 bg-gray-200 animate-pulse"></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                {/* Skeleton for category */}
                <div className="w-32 h-4 bg-gray-200 animate-pulse"></div>
                {/* Skeleton for button */}
                <div className="w-24 h-4 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductSkeleton;
