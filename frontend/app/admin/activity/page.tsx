"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ActivityCard from "./activityCard"
import axios from "axios"
import {ActivityType } from "../components/Dashboard"
import { ActivitySkeleton } from "./activitySkeleton"
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
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}
export default function Activities() {
  const [activities,setActivites]=useState<ActivityType[]|null>(null)
  useEffect(()=>{const getActivity=async()=>{
    const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getActivity`)
    setActivites(res.data.recentActivity)
  }
  getActivity()},[])


  return (
    <div className="flex justify-center items-center w-full pl-8">
      <motion.div
        className="w-full mt-40 max-w-full "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Recent Activity
          </h2>
        
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          {
            (activities!=null)?activities?.map((activity)=><ActivityCard key={activity.activitId} activity={activity}/>): 
          Array(8).fill(0).map((_,i)=><ActivitySkeleton key={i}/>)
        }
        </div>
        <motion.div
          className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-center"
          variants={itemVariants}
        >

        </motion.div>
      </motion.div>
    </div>
  )
}

