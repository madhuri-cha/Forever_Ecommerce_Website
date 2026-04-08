

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch(error)
{

  toast.error(response.data.message) 
}
  }
const statusHandler = async (event, orderId)=>
{

   try
   {
     const response = await axios.post(backendUrl+'/api/order/status', {orderId, status: event.target.value}, {headers:{token}})

    if(response.data.success)
    {
      await fetchAllOrders()

    }
   } catch(error)
   {
  
     toast.error(response.data.error)
   }

}

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="p-6 w-full">
      
      {/* Heading */}
      <h3 className="text-2xl font-semibold mb-6">📦 Orders</h3>

      {/* Orders List */}
      <div className="flex flex-col gap-6">

        {orders.map((order, index) => (
          
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 p-5 border rounded-xl shadow-sm hover:shadow-md transition"
          >

            {/* Icon */}
            <div className="flex items-center justify-center">
              <img src={assets.parcel_icon} alt="" className="w-12" />
            </div>

            {/* Order Info */}
            <div className="text-sm text-gray-700">
              
              {/* Items */}
              <div className="mb-2">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} x {item.quantity} 
                    <span className="text-gray-500"> ({item.size})</span>
                    {i !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>

              {/* Address */}
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>

              <p>
                {order.address.street},
                {order.address.city},
                {order.address.state},
                {order.address.country}
              </p>

              <p>📞 {order.address.phone}</p>
            </div>

            {/* Payment Info */}
            <div className="text-sm">
              <p><span className="font-medium">Items:</span> {order.items.length}</p>
              <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span className={order.payment ? "text-green-600" : "text-red-500"}>
                  {order.payment ? 'Done' : 'Pending'}
                </span>
              </p>
              <p>                                    
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <div className="flex items-center justify-center font-semibold text-lg">
              ₹{order.amount}
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center justify-center">
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Orders