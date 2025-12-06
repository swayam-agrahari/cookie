"use client";
import React, { useState } from "react";
import { LogOut, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter()
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
            John Doe
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Administrator
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-1">
            <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="w-4 h-4" />
              Profile
            </button>
            <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button onClick={()=>{router.push("/authentication")}} className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
