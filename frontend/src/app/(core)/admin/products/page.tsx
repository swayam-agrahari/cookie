"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Category, Item } from "@/lib/types";
import { ProductForm } from "./ProductForm";
import { DeleteConfirmationModal, Modal } from "./Modal";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [products, setProducts] = useState<Item[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Item | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Item | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/menu`
      );
      if (!response || response.status !== 200) {
        setProducts([]);
        console.log("Call1");
      } else {
        setProducts(response.data.items);
        console.log("Call2");
      }
      console.log("bd", response.data.items);
    };
    const getCategories = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getCategories`
      );

      if (!response || response.status !== 200) {
        setCategory([]);
      } else {
        setCategory(response.data.categories);
      }
      console.log("cd", response.data.categories);
    };

    getCategories();
    getProducts();
    setLoading(false);
  }, []);

  const filteredProducts = products?.filter((product) => {
    console.log("Filtering:", product); // Log each product while filtering
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesPrice =
      product.cost >= priceRange.min && product.cost <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  console.log("Filtered Products:", filteredProducts); // Log the filtered results

  const totalPages = Math.ceil(filteredProducts!.length / ITEMS_PER_PAGE);
  console.log("fli", filteredProducts);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddProduct = (data: Partial<Item>) => {
    const newProduct: Item = {
      itemId: Math.max(...products.map((p) => p.itemId!)) + 1,
      name: data.name!,
      cost: data.cost!,
      bio: data.bio!,
      image: data.image!,
      category: data.category!,
      subcategory: data.subcategory!,
      ingredients: data.ingredients!,
      isvegan: data.isvegan!,
      availability: data.availability!,
      tags: data.tags!,
    };
    setProducts([newProduct, ...products]);
  };

  const handleEditProduct = (data: Partial<Item>) => {
    if (!editingProduct) return;
    setProducts(
      products.map((product) =>
        product.itemId === editingProduct.itemId
          ? { ...product, ...data }
          : product
      )
    );
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.itemId !== id));
  };

  return (
    <div className="p-4 md:p-8 mt-14 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold  text-primary dark:text-text ">
          Products
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">All Categories</option>
            {category.map((category, i) => (
              <option key={i} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Price Range:
          </span>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-500">
                $
              </span>
              <input
                type="number"
                min="0"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="w-24 pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 dark:text-gray-700"
              />
            </div>
            <span>to</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-500">
                $
              </span>
              <input
                type="number"
                min="0"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="w-24 pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 dark:text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          <AnimatePresence>
            {paginatedProducts?.map((product, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 md:h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover text-gray-600 dark:text-gray-700"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setDeletingProduct(product)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.availability
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.availability ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="font-semibold text-blue-600">
                      ${product.cost.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {product.bio}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {product.category}
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
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setIsAddModalOpen(false)}
          categories={category}
        />
      </Modal>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
      >
        <ProductForm
          product={editingProduct || undefined}
          onSubmit={handleEditProduct}
          onClose={() => setEditingProduct(null)}
          categories={category}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={() => {
          if (deletingProduct) {
            handleDeleteProduct(deletingProduct.itemId!);
          }
          setDeletingProduct(null);
        }}
        productName={deletingProduct?.name || ""}
      />
    </div>
  );
}
