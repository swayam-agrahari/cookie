"use client"
import { motion,Variants } from "framer-motion";
function LoadingThreeDotsJumping() {
    const dotVariants: Variants = {
        jump: {
            y: -5,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }
    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex items-center gap-1"
        >
            <motion.div className="w-1 h-1 rounded-md bg-gray-400 dark:bg-slate-200" variants={dotVariants} />
            <motion.div className="w-1 h-1 rounded-md bg-gray-400 dark:bg-slate-200" variants={dotVariants} />
            <motion.div className="w-1 h-1 rounded-md bg-gray-400 dark:bg-slate-200" variants={dotVariants} />
        </motion.div>
    )
}
export default LoadingThreeDotsJumping
