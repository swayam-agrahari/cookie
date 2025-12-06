"use client";
import React, { useEffect, useState } from "react";
import { useOrders } from "@/lib/context/ordersContext";
import {
  ShoppingCart,
  CircleCheckBig,
  CircleFadingPlus,
  Pencil,
  FolderPlus,
  FolderPen,
  Armchair,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Loader from "./loader";
enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}
export enum ActivityE {
  PLACED_ORDER = "PLACED_ORDER",
  COMPLETED_ORDER = "COMPLETED_ORDER",
  ADDED_ITEM = "ADDED_ITEM",
  UPDATED_ITEM = "UPDATED_ITEM",
  ADDED_CATEGORY = "ADDED_CATEGORY",
  UPDATED_CATEGORY = "UPDATED_CATEGORY",
}
export const getImg = {
  PLACED_ORDER: ShoppingCart,
  COMPLETED_ORDER: CircleCheckBig,
  ADDED_ITEM: CircleFadingPlus,
  DELETED_ITEM:Trash2,
  UPDATED_ITEM: Pencil,
  ADDED_CATEGORY: FolderPlus,
  DELETED_CATEGORY:Trash2,
  UPDATED_CATEGORY: FolderPen,
  ADDED_TABLE:Armchair,
  DELETED_TABLE:Trash2,
};
export const messagestatusColors = {
  PLACED_ORDER:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  COMPLETED_ORDER:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  ADDED_ITEM:
    "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  DELETED_ITEM:
    "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-300",
  UPDATED_ITEM:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  ADDED_CATEGORY:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  DELETED_CATEGORY:
    "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-300",
  UPDATED_CATEGORY:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  ADDED_TABLE:
    "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-300",
  DELETED_TABLE:
   "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-300",
};
export const Activity_messages = {
  PLACED_ORDER: "Order has been placed with Order ID: {change_id}.",
  COMPLETED_ORDER: "Order with Order ID: {change_id} has been completed.",
  ADDED_ITEM: "Item with Id {change_id} has been added successfully.",
  DELETED_ITEM: "Item With Id {change_id} has been deleted",
  UPDATED_ITEM: "Item with Id {change_id} has been updated.",
  ADDED_CATEGORY: "Category with Id {change_id} has been added successfully.",
  DELETED_CATEGORY: "Category with Id {change_id} has been deleted successfully.",
  UPDATED_CATEGORY: "Category with ID {change_id} has been updated.",
  ADDED_TABLE:"Table With Id {change_id} has been added",
  DELETED_TABLE:"Deleted Table with Id {change_id}",
};
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import axios from "axios";
interface Order {
  tableId: number;
  orderId: number;
  totalCost: number;
  createdAt: string;
  status: Status;
}
export interface ActivityType {
  activitId: number;
  activity: ActivityE;
  createdAt: Date;
  changedId: number;
}
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
}
interface stats {
  profit: number;
  totalOrders: number;
  totalProd: number;
  totalCat: number;
  profitPerc: number;
  ordersPerc: number;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        {icon}
      </div>
      <span
        className={`flex items-center gap-1 text-sm ${
          trend.isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend.isPositive ? (
          <ArrowUpRight size={16} />
        ) : (
          <ArrowDownRight size={16} />
        )}
        {trend.value != "undefined" ? trend.value : <Loader />}
      </span>
    </div>
    <h3 className="mt-4 text-2xl font-semibold">
      {value != "undefined" ? value : <Loader />}
    </h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
  </motion.div>
);

interface RecentOrderProps {
  tableId: number;
  orderId: number;
  totalCost: number;
  createdAt: string;
  status: Status;
}
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};
const RecentOrderSkeleton: React.FC = () => {
  return (
    <motion.div
      className="flex items-center justify-between py-3"
      animate={{ y: [0, -5, 0] }}
      variants={itemVariants}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center gap-6 my-3">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-gray-200 dark:text-gray-400" />
        </div>
        <div className="bg-gray-200 dark:bg-gray-500 rounded-md h-4 w-16">
          <div className="relative top-6 h-1 w-12 rounded-sm bg-gray-200 dark:bg-gray-500 dark:text-gray-400"></div>
        </div>
      </div>
      <div className="relative text-right">
        <div className="absolute right-0 top-0 h-3 w-8 rounded-md bg-gray-200 dark:bg-gray-500"></div>
        <div className="relative mt-4 h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-500"></div>
      </div>
    </motion.div>
  );
};

const RecentOrder: React.FC<RecentOrderProps> = ({
  orderId,
  tableId,
  totalCost,
  status,
}) => {
  const statusColors = {
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    processing:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    COMPLETED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <p className="font-medium">Table #{tableId}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Order {orderId}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${totalCost}</p>
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { RefreshOrders } = useOrders();
  const [stats, setStats] = useState<stats | null>(null);
  const [recentOrders, setOrders] = useState<Order[] | null>(null);
  const [recentactivity, setRecentActivity] = useState<ActivityType[] | null>(
    null
  );
  useEffect(() => {
    const loadStats = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getDashStats`
      );
      setStats(res.data);
    };
    loadStats();
  }, [RefreshOrders]);
  useEffect(() => {
    const getRecentOrders = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getRecentOrders`
      );
      setOrders(res.data.recentOrders);
    };
    getRecentOrders();
  }, [RefreshOrders]);
  useEffect(() => {
    const getRecentAct = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getActivity`
      );
      setRecentActivity(res.data.recentActivity.slice(0, 5));
    };
    getRecentAct();
  }, [RefreshOrders]);
  const statCards = [
    {
      title: "Total Revenue",
      value: String(stats?.profit != null ? stats?.profit : "0"),
      icon: <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: {
        value:
          stats?.profitPerc != undefined ? stats.profitPerc.toString() : "0",
        isPositive: (stats?.profitPerc ?? 1) > 0,
      },
    },
    {
      title: "Total Orders",
      value: String(stats?.totalOrders) || "0",
      icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: {
        value: String(stats?.ordersPerc),
        isPositive: (stats?.ordersPerc ?? 1) > 0,
      },
    },
    {
      title: "Total Categories",
      value: String(stats?.totalCat) || "0",
      icon: (
        <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      ),
      trend: { value: "+8.2%", isPositive: true },
    },
    {
      title: "Total Products",
      value: String(stats?.totalProd) || "0",
      icon: <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: { value: "-2.4%", isPositive: false },
    },
  ];

  return (
    <div className="space-y-6 p-6 mt-14">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 ">
          Welcome back, here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            className="divide-y dark:divide-gray-700"
          >
            {recentOrders != null
              ? recentOrders?.map((order) => (
                  <RecentOrder key={order.orderId} {...order} />
                ))
              : [1, 2, 3, 4, 5].map((_, i) => <RecentOrderSkeleton key={i} />)}
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full  bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Recent Activity
            </h2>
            <Link
              href="/admin/activity"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {recentactivity != null
              ? recentactivity?.map((activity) => {
                  const Icon = getImg[activity.activity];

                  return (
                    <motion.div
                      key={activity.activitId}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          messagestatusColors[activity.activity]
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {Activity_messages[activity.activity].replace(
                            "{change_id}",
                            String(activity.changedId)
                          )}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {String(activity.createdAt)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              : [1, 2, 3, 4, 5].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    variants={itemVariants}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      className={`w-8 h-8 bg-gray-200 dark:bg-gray-500 rounded-full flex items-center justify-center `}
                    ></div>
                    <div className="bg-gray-200 dark:bg-gray-500 rounded-md h-6 w-48">
                      <div className="relative mt-1 top-6 h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-500 dark:text-gray-400"></div>
                    </div>
                  </motion.div>
                ))}
          </div>

          <motion.div
            className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-center"
            variants={itemVariants}
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
};
