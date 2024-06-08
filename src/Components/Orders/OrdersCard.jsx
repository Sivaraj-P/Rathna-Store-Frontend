import React from 'react'
import { Link } from 'react-router-dom'

const OrdersCard = ({orderDetails}) => {
    const orderStatusColor=()=>{
        if (orderDetails.status ==="Confirmed"){
            return "bg-blue-600"
        }else if (orderDetails.status ==="Delivered"){
            return "bg-green-600"
        }
        else if (orderDetails.status ==="Cancelled"){
            return "bg-red-600"
        }
        else{
            return "bg-purple-600"
        }
    }
  return (
   
      <div className="bg-white  rounded-lg shadow-md overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{new Date(orderDetails.created_at).toLocaleString()}</span>
            <span className ={`${orderStatusColor()} bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium`}>
              {orderDetails.status }
            </span>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Order ID {orderDetails.order_id}</h2>
            <p className="my-2 text-purple-800 font-medium  text-sm" >Payment Mode: {orderDetails.payment_method}</p>
            <p className="my-2 text-amber-800 font-medium text-sm" >Payment status: {orderDetails.is_paid ? "Paid" :"Pending"}</p>

          </div>
          <div className="flex justify-between items-center">
            <span className="my-2 text-cyan-800 font-semibold text-base">Total: {orderDetails.total_price}</span>
            <Link
              className="inline-flex items-center px-3 py-2 bg-green-700 text-white  hover:bg-green-600 rounded-md text-sm font-medium transition-colors"
              to={`/orderProducts/${orderDetails.id}`}
            >
              View Order
            </Link>
          </div>
        </div>
      </div>
  )
}

export default OrdersCard