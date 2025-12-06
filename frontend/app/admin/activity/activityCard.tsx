import { motion } from "framer-motion"
import { getImg,messagestatusColors,ActivityType } from "../components/Dashboard" 
import { ChevronRight, ChevronLeft } from "lucide-react"
import TableCard from "./tableCard"
import { OrderCard } from "../orders/OrderCard"
import CategoryCard from "./categoryCard"
import { DeleteCard } from "./deleteCard"
import { Item,Table } from "@/lib/types"
import { CategorySkeletonLoader } from "../category/skeleton"
import ProductCard from "./productCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { Activity_messages } from "../components/Dashboard"
import { Order } from "../orders/page"
import { CategoryActivity } from "./categoryCard"
import { ItemNotFound } from "./notfoundCard"
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
}

export interface DeleteCardI{
    id:number,
    type:string
}

export default function ActivityCard(props:{activity:ActivityType}){
    const activity=props.activity
    const Icon = getImg[activity.activity]
    const [act,setAct]=useState("")
    const [isLoading,setIsLoading]=useState(true)
    const [loadCard,setLoadCard]=useState(false)
    const [details,setDetails]=useState<Order|Item|CategoryActivity|Table|DeleteCardI|null>(null)
    function renderCard(){
        console.log(details)
        if(!isLoading){
            if(details!=null){
                switch (act){
                    case "COMPLETED_ORDER":
                    case "PLACED_ORDER":
                        return <OrderCard key={activity.changedId} order={details as Order} totalCost={(details as Order).totalCost}/>
                    case "ADDED_ITEM":
                    case "UPDATED_ITEM":
                        return <ProductCard item={details as Item}/>
                    case "ADDED_CATEGORY":
                    case "UPDATED_CATEGORY":
                        return <CategoryCard category={details as CategoryActivity}/>
                    case "ADDED_TABLE":
                        return <TableCard tables={details as Table}/>
                    case "DELETED_TABLE":
                    case "DELETED_ITEM":
                    case "DELETED_CATEGORY":
                        return <DeleteCard deleteData={details as DeleteCardI}/>      
                    default:
                        return <ItemNotFound/>
                }
            }else{
                return <ItemNotFound/>
        }
        }else{
            console.log(isLoading)
            return <CategorySkeletonLoader />;
        }
    }
    useEffect(()=>{const getData=async()=>{
        if(loadCard==true){
            if(act=="COMPLETED_ORDER" || act=="PLACED_ORDER"){
                const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getOrders/`,{id:activity.changedId})
                setDetails(res.data.response)
            }
            else if(act=="ADDED_ITEM" || act=="UPDATED_ITEM"){
                console.log(act)
                const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getProduct/`,{id:activity.changedId})
                setDetails(res.data.product)
            }
            else if(act=="ADDED_CATEGORY" || act=="UPDATED_CATEGORY"){
                console.log(act)
                const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getCat/`,{id:activity.changedId})
                setDetails(res.data.category)
            }
            else if(act == "ADDED_TABLE"){
                const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/checkTable/`+activity.changedId)
                console.log(res.data.table,activity)
                setDetails(res.data.table)
            }
            else if(act == "DELETED_TABLE" || act == "DELETED_ITEM" || act == "DELETED_CATEGORY"){
                setDetails({id:activity.changedId,type:act})
            }
            setIsLoading(false)
        }
    }
    getData()},[loadCard])
    return(
        <>
        <motion.div
                key={activity.activitId}
                className="flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${messagestatusColors[activity.activity]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{(Activity_messages[activity.activity]).replace("{change_id}",String(activity.changedId))}</p>
                    <div className="flex items-center"><p className="text-sm text-gray-500 dark:text-gray-400">{String(activity.createdAt)}</p>
                    <motion.button className="ml-5" whileHover={loadCard==false?{ x: -5 }:{x:5}} onClick={()=>{setLoadCard(!loadCard);
                        setAct(activity.activity)}}>
                        {(loadCard==false)?<ChevronRight/>:<ChevronLeft/>}
                    </motion.button>
                    </div>
                </div>
                <div className={loadCard?"block w-1/2":"hidden"} >
                        {renderCard()}
                    </div>
              </motion.div>
            </>
            )
}  