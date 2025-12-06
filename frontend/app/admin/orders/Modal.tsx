"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {  useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
   const [isMobile, setIsMobile] = useState<boolean | null>(null);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      if(typeof window !== undefined){
        setIsMobile(window.innerWidth < 768)
        window.addEventListener("resize", handleResize);
      }
      return () =>{
        if(typeof window !== undefined){
          window.removeEventListener("resize", handleResize);
        }
      }
    }, []);
  
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={
              isMobile
                ? { opacity: 1, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={
              isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              isMobile
                ? { opacity: 1, y: "100%" }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white overflow-hidden
                ${
                  isMobile
                    ? "bottom-0 left-0 right-0 rounded-t-xl max-h-[90vh] overflow-y-auto"
                    : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl shadow-xl"
                }`}
          >
            <div className="sticky top-0 flex justify-between items-center border-b border-gray-200 p-4 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
