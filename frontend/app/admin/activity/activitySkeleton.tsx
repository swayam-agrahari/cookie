import { motion } from "framer-motion";
export const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }
export const ActivitySkeleton = () => {
  return (
    <motion.div
        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        variants={itemVariants}
        animate={{ y: [0, -5, 0] }}
        transition={{ 
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
        }}
    >   <div className="flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 w-full"
>
        <div className={`w-8 h-8 bg-gray-200 dark:bg-gray-500 rounded-full flex items-center justify-center `}></div>
        <div className="bg-gray-200 dark:bg-gray-500 rounded-md h-6 w-48">
            <div className="relative mt-1 top-6 h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-500 dark:text-gray-400"></div>
        </div>
        </div>
    </motion.div>
    );
};
