"use client";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: -30 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 right-0 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 "
    >
      <CheckCircle className="w-5 h-5" />
      {message}
    </motion.div>
  );
};
