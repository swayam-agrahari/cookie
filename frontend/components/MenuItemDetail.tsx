  "use client"

  import type React from "react"
  import { useState } from "react"
  import { motion,AnimatePresence } from "framer-motion"
  import { X,Minus,Plus,ShoppingBag,Star,Send,StarHalf } from "lucide-react"
  import type { Item } from "@/lib/types"
  import axios from "axios"
  interface MenuItemDetailProps {
    item: Item
    onClose: ()=>void
    onAddToCart: (item: Item,quantity: number)=>void
  }
  export const average=(array:number[])=>array.reduce((a,b) =>a+b)/array.length;
  const MenuItemDetail: React.FC<MenuItemDetailProps>=({ item,onClose,onAddToCart})=>{
    const [quantity,setQuantity]=useState(1)
    const [userRating,setUserRating]=useState(0)
    const [hoverRating,setHoverRating]=useState(0)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [reviewSubmitted,setReviewSubmitted]=useState(false)
    const rating=average(item.rating||[3])
    console.log(item)
    async function sendRev(){
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/sendRev`,{id:item.itemId,rating:userRating})
    }
   const handleIncrement=()=>{
      setQuantity((prev)=>prev+1)
    }

    const handleDecrement=()=>{
      if (quantity >1) {
        setQuantity((prev)=>prev-1)
      }
    }

    const handleAddToCart=()=>{
      onAddToCart(item,quantity)
      onClose()
    }

    function handleStarHover(rating: number){
      setHoverRating(rating)
    }
    function handleStarClick(rating: number){
      setUserRating(rating)
    }

    function handleReviewSubmit(){
      if (userRating=== 0) return
      setIsSubmitting(true)
      sendRev()
      setTimeout(()=>{
        setIsSubmitting(false)
        setReviewSubmitted(true)
      },1000)
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0,y: 50 }}
            animate={{ opacity: 1,y: 0 }}
            exit={{ opacity: 0,y: 50 }}
            transition={{ type: "spring",damping: 25,stiffness: 300 }}
            className="modal w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl"
            onClick={(e)=>e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-56 overflow-hidden">
                <img
                  src={String(item.image) || "/placeholder.svg"}
                  alt={String(item.name)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <button onClick={onClose} className="absolute top-4 right-4 glassmorphism p-2 rounded-full">
                <X size={20} className="text-primary dark:text-text" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-primary dark:text-text">{item.name}</h2>
                <span className="text-[var(--accent)] text-xl font-bold">${item.cost.toFixed(2)}</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[1,2,3,4,5].map((star)=>(
                    (star<=rating)?
                    <Star
                      key={star}
                      size={18}
                      className="fill-yellow-400 text-yellow-400 mr-0.5"
                    />:(rating>=star-0.5)?<div className="flex" key={star}><StarHalf size={18} className="absolute fill-yellow-400 text-yellow-400"/><Star size={18} className="text-gray-300 mr-0.5"/></div>:<Star key={star} size={18} className="text-gray-300 mr-0.5"/>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{rating.toFixed(1)} / 5</span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{item.bio}</p>

              {item.ingredients && (
                <div className="mb-6">
                  <h3 className="text-primary dark:text-text font-semibold mb-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ind,i)=>(
                      <span key={i} className="px-3 py-1 text-sm rounded-full bg-gray-800 text-text">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDecrement}
                    className="glassmorphism w-8 h-8 rounded-full flex items-center justify-center"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} className="text-primary dark:text-text" />
                  </button>

                  <span className="text-primary dark:text-text font-medium">{quantity}</span>

                  <button
                    onClick={handleIncrement}
                    className="glassmorphism w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <Plus size={16} className="text-primary dark:text-text" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="floating-button flex items-center space-x-2 px-4 py-2 rounded-lg text-primary dark:text-text"
                >
                  <ShoppingBag size={18} />
                  <span>Add to cart</span>
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700  ">
                <h3 className="text-primary dark:text-text font-semibold mb-3">Leave a Review</h3>

                <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={`cursor-pointer transition-all duration-150 mr-1 ${
                        star <= (hoverRating || userRating)
                         ?"fill-yellow-400 text-yellow-400 scale-110"
                         :"text-gray-300 hover:text-gray-400"
                      } ${reviewSubmitted?"cursor-not-allowed opacity-60":""}`}
                      onMouseEnter={() => {
                        if (!reviewSubmitted) handleStarHover(star)
                      }}
                      onMouseLeave={() => {
                        if (!reviewSubmitted) setHoverRating(0)
                      }}
                      onClick={() => {
                        if (!reviewSubmitted) handleStarClick(star)
                      }}
                    />
                  ))}
                  {userRating >0 && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{userRating}/5</span>
                  )}
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleReviewSubmit}
                    disabled={userRating=== 0||isSubmitting||reviewSubmitted}
                    className={`floating-button flex items-center space-x-2 px-4 py-2 rounded-lg text-primary dark:text-text transition-all ${
                      userRating=== 0?"opacity-50 cursor-not-allowed":""
                    }`}
                  >
                    {isSubmitting?(
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    ):reviewSubmitted?(
                      "Review Submitted!"
                    ):(
                      <>
                        <Send size={16} className="mr-2" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  export default MenuItemDetail
