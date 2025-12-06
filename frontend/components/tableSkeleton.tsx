import { motion } from "framer-motion";
const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
const item = {
hidden: { opacity: 0, y: 20 },
show: { opacity: 1, y: 0 },
};
export const TableSkeleton = () => {
  return (
    <>
        <div className="py-4 overflow-x-auto">
          <motion.div
            className="flex space-x-4 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
              {
            [1,2,3,4,5].map((i)=>
            <motion.div key={i} className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 animate-pulse`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 " />
              <div className="w-full h-full object-cover bg-slate-200 dark:bg-gray-500"/>
          </motion.div>)}
          </motion.div>
        </div>
    <div className="px-6 py-8">

    <motion.div
        className="rounded-xl shadow-sm overflow-hidden animate-pulse mt-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
          <motion.div
            variants={item}
            className="menu-card overflow-hidden rounded-xl"
          >
        <div className="relative h-52 inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:bg-gradient-to-t dark:from-gray-500 dark:via-gray-300 dark:to-gray-200" />
        <div className="p-4 inset-0 ">
                <div className="h-6  bg-gray-300  dark:bg-gray-300 w-1/4 rounded mb-2 animate-pulse"></div>
                <div className="h-3 mt-4 bg-gray-300 w-1/3 rounded mb-4 animate-pulse"></div>
                <div className="h-3 mt-4 bg-gray-300 w-1/12 rounded animate-pulse"></div>
             </div>
          </motion.div>
      </motion.div>
      </div>
    
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6  text-primary dark:text-text ">
        All Menu Items
      </h2>
    <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {[1,2,3,4,5,6].map((i) => (
          <motion.div
            key={i}
            variants={item}
            className="menu-card overflow-hidden rounded-xl animate-pulse" 
          > 
            <div className="relative h-32 sm:h-48 ">
              <div className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:bg-gradient-to-t dark:from-gray-500 dark:via-gray-300 dark:to-gray-200"/>
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2">
                  {[1,2].map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded-full opacity-40 w-10 h-4 bg-black/50 backdrop-blur-sm text-white animate-pulse"/>
                  ))}
                </div>
              
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start mb-1 sm:mb-2">
                <div className="text-sm sm:text-lg font-semibold h-4 w-2/4 bg-gray-300 line-clamp-1 rounded animate-pulse"/>
                <span className="font-bold text-sm sm:text-base bg-gray-300 rounded h-4 w-14 animate-pulse"/>
              </div>

              <div className="mt-5 rounded w-2/3 h-3 bg-gray-300 sm mb-2 sm:mb-4 line-clamp-2 animate-pulse "/>
                <div className="mb-2 sm:mb-4 hidden sm:block">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {[1,2,3].map((ingredient) => (
                      <span
                        key={ingredient}
                        className="bg-gray-300 w-5 h-2 rounded sm:text-xs text-gray-400 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </>
  );
};
