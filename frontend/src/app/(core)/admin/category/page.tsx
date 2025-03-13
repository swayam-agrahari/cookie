"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import axios from "axios";
import { CategorySkeletonLoader } from "./skeleton";

interface Category {
  id: number;
  name: string;
  description: string;
  images: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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

const CategoryForm: React.FC<{
  category?: Category;
  onSubmit: (data: Partial<Category>) => void;
  onClose: () => void;
}> = ({ category, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    categoryId: category?.id,
    name: category?.name || "",
    description: category?.description || "",
    images: category?.images || "",
    slug: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsSubmitted(true);
    onClose();
  };
  useEffect(() => {
    const sendCat = async () => {
      const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;
      if (isSubmitted == true) {
       //add toast
        if (category != undefined) {
          axios.post(link + "/editCat", formData);
        } else {
          axios.post(link + "/addCat", formData);
        }
      }
    };
    sendCat();
  }, [isSubmitted]);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          required
        />
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={formData.images}
          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {category ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

function CategoryComponent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getCategories`
      );

      if (!response || response.status !== 200) {
        setCategories([]);
      } else {
        setCategories(response.data.categories);
      }
      setIsLoading(false);
    };
    getCategories();
  }, []);

  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (data: Partial<Category>) => {
    const newCategory: Category = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      name: data.name!,
      description: data.description!,
      images: data.images!,
    };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (data: Partial<Category>) => {
    if (!editingCategory) return;
    setCategories(
      categories.map((category) =>
        category.id === editingCategory.id ? { ...category, ...data } : category
      )
    );
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories?.filter((category) => category.id !== id));
  };

  return (
    <div className="flex h-screen bg-background  text-primary dark:text-text  mt-12 w-full">
      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="p-4  md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold  text-primary dark:text-text ">
                Categories
              </h1>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline">Add Category</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-gray-600 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {/* Show skeletons when loading */}
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, index) => <CategorySkeletonLoader key={index} />)
                : filteredCategories?.map((category) => (
                    <motion.div
                      key={category.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-36 md:h-48">
                        <img
                          src={category.images}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {category.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">
                            {155} Products
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
                  ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
      >
        <CategoryForm
          category={editingCategory || undefined}
          onSubmit={handleEditCategory}
          onClose={() => setEditingCategory(null)}
        />
      </Modal>
    </div>
  );
}

export default CategoryComponent;
