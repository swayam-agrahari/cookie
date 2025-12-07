import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
export interface CategoryActivity {
    id: number;
    cname: string;
    description: string;
    images: string;
    totalItems: number;
}
export default function CategoryCard(props: { category: CategoryActivity }) {
    const category = props.category
    return (
        <AnimatePresence>
            <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
                <div className="relative h-36 md:h-48">
                    <Image
                        src={category.images}
                        alt={category.cname}
                        className="w-full h-full object-cover"
                        fill
                    />
                    <div className="absolute top-2 right-2 flex gap-2">

                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {category.cname}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {category.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                            {category.totalItems} Products
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            View Details
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
