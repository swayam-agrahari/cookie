"use client";
import { motion } from "framer-motion";
import { DeleteCardI } from "./activityCard";
import { Activity_messages } from "../components/Dashboard";

export const DeleteCard: React.FC<{
  deleteData: DeleteCardI;
}> = ({ deleteData}) => {
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
              Deleted
            </h3>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800`}
          >
            {deleteData.type}
          </div>
        </div>
        <p className="text-red-600">{(Activity_messages[deleteData.type as keyof typeof Activity_messages]).replace("{change_id}",String(deleteData.id))}</p>
        </div>
    </motion.div>
  );
};
