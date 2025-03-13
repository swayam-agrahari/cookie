"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
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
        {trend.value}
      </span>
    </div>
    <h3 className="mt-4 text-2xl font-semibold">{value}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
  </motion.div>
);

interface RecentOrderProps {
  id: string;
  customer: string;
  amount: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
}

const RecentOrder: React.FC<RecentOrderProps> = ({
  id,
  customer,
  amount,
  status,
}) => {
  const statusColors = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    processing:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <p className="font-medium">{customer}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Order {id}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{amount}</p>
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
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: { value: "+20.1%", isPositive: true },
    },
    {
      title: "Total Orders",
      value: "1,205",
      icon: (
        <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      ),
      trend: { value: "+12.5%", isPositive: true },
    },
    {
      title: "Total Customers",
      value: "3,456",
      icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: { value: "+8.2%", isPositive: true },
    },
    {
      title: "Total Products",
      value: "456",
      icon: <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      trend: { value: "-2.4%", isPositive: false },
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      amount: "$235.89",
      status: "completed" as const,
      date: "2 minutes ago",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      amount: "$189.99",
      status: "processing" as const,
      date: "15 minutes ago",
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      amount: "$432.50",
      status: "pending" as const,
      date: "1 hour ago",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      amount: "$129.99",
      status: "cancelled" as const,
      date: "2 hours ago",
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
        {stats.map((stat, index) => (
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
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              View all
            </button>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {recentOrders.map((order) => (
              <RecentOrder key={order.id} {...order} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">System Update</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {i + 1} hour{i !== 0 ? "s" : ""} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
