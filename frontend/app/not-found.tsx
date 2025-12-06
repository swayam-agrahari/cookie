'use client'
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Rabbit } from "lucide-react"
export default function NotFound(){
    const router=useRouter()
    return(
        <>
        <div className="min-h-screen relative top-44 text-text bg-background">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:container mx-auto pb-24"
            >
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-32 h-32 mb-6 relative"
                >
                  <Rabbit className="w-32 h-32 text-gray-600"/>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none" 
                        className="w-8 h-8 text-red-500"
                      >
                        <path
                          d="M6 18L18 6M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
                <motion.h1
                  className="text-3xl font-bold mb-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Page Not Found
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  We couldn&apos;t find the Page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    onClick={() => router.back()}
                    className="px-6 py-3 bg-gray-500 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    Go Back
                  </button>
                 
                </motion.div>
              </div>
            </motion.div>
        </div>
      </>
      )
}