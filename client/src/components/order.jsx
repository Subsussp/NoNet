import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";
import { FaSearch, FaMapMarkerAlt, FaCheck, FaTimes } from "react-icons/fa";
import { API_BASEURL } from "Var/URLS"
import LocationPicker from "./Mapicker"
import LocationPickerModal from "./LocationPickerModal ";

async function updateOrderStatus(_id,status,sethandler){
  let data = await fetch(`${API_BASEURL}/order/process`,{method:'PATCH', headers: {
    'Content-Type': 'application/json',
  },credentials:'include',body:JSON.stringify({_id,status})})
  sethandler(1)
}

const Order = () => {
  const [orders,setOrders] = useState([])
  const [filter, setFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [handler, sethandler] = useState(0);
  const [locationModal, setLocationModal] = useState({ open: false, coords: null });
  const statuses = ["All","Pending", "Shipped", "Delivered", "Cancelled",];
  const [showDetails, setShowDetails] = useState([false,'']);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filter === "All" || order.orderStatus === filter.toLocaleLowerCase();
    const matchesSearch =
      order.shippingAddress.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      order.shippingAddress.email?.toLowerCase().includes(search.toLowerCase()) ||
      order._id?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  useEffect(()=>{
     const getorders = async () => {
      let data = await (await fetch(`${API_BASEURL}/order`,{method:'GET',credentials:'include'})).json()
      setOrders(data.data)
}
   getorders()

  },[])
    useEffect(()=>{
     const getorders = async () => {
      let data = await (await fetch(`${API_BASEURL}/order`,{method:'GET',credentials:'include'})).json()
      setOrders(data.data)
}
   getorders()

  },[handler])
  if(orders.length < 1){
    return (
        <div>Loading...</div>)
  }

  return (
    <div className="w-full h-screen bg-gray-50 p-6 flex flex-col font-Poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800 font-Cinzel">Orders</h1>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium shadow-sm">
        Pending: {orders.filter(order => order.orderStatus === "pending").length}
      </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
        Shipped: {orders.filter(order => order.orderStatus === "shipped").length}
      </span>
     <div className="flex flex-wrap gap-2 mb-4">
  {statuses.map((status) => (
    <button
      key={status}
      onClick={() => setFilter(status)}
      className={`px-4 py-2 rounded-lg font-semibold shadow ${
        filter === status
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {status.replace(/_/g, " ")}
    </button>
  ))}
</div>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-lg px-3 py-2 mb-4 shadow-sm">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ml-2 w-full outline-none bg-transparent"
        />
      </div>

      {/* Orders list */}
      <div className="overflow-y-auto flex-1 space-y-4">
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No orders found.</p>
        )}

        {filteredOrders.map(order => (
<motion.div
      key={order._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md rounded-lg p-4 grid grid-cols-[1fr_auto] gap-4 items-start"
      style={{ minHeight: '140px' }} // prevent too small when details hidden
    >
      {/* Left side: Main order info and toggle + details */}
      <div className="flex flex-col space-y-1">
        <h2 className="font-semibold text-lg">{order.shippingAddress.fullName}</h2>
        <p className="text-gray-600 text-sm py-1 flex items-center">
          <FiMail className="mr-2 text-blue-500" />
          {order.shippingAddress.email}
        </p>
        <p className="text-gray-600 text-sm py-1 flex items-center">
          <FiPhone className="mr-2 text-green-500" />
          {order.shippingAddress.phone}
        </p>
        <p className="text-gray-600 text-sm py-1 flex items-center">
          <FiMapPin className="mr-2 text-red-500" />
          {order.shippingAddress.address}
        </p>
        <p className="text-sm font-medium">
          Status:{' '}
          <span
            className={`select-none ${
              order.orderStatus === 'delivered'
                ? 'text-green-600'
                : order.orderStatus === 'shipped'
                ? 'text-blue-600'
                : 'text-yellow-600'
            }`}
          >
            {order.orderStatus}
          </span>
        </p>

        {/* Details toggle */}
        <button
          onClick={() => setShowDetails([showDetails[1] == order._id ?!showDetails[0] : true ,order._id])}
          className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
          aria-expanded={showDetails[0]}
          aria-controls={`order-details-${order._id}`}
        >
          {(showDetails[0] && order._id == showDetails[1]) ? 'Hide Details ▲' : 'Show Details ▼'}
        </button>

        {/* Details list */}
        <AnimatePresence initial={false} >
          {(showDetails[0] && order._id == showDetails[1]) && (
            <motion.div
              key="details"
              id={`order-details-${order._id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2 text-gray-700"
            >
              <ul className="list-disc list-inside max-h-40 overflow-y-auto text-sm">
                {order.items.map((item)=><li key={item.product}><span className="font-medium">{item.name}</span> — Qty: {item.quantity}, Price: ${item.price}</li>)}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right side: ID and buttons */}
      <div className="flex flex-col justify-between items-end space-y-3">
        <p className="font-mono font-semibold text-gray-600 select-text">#{order._id.slice(-6)}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <button
            onClick={() => setLocationModal({ open: true, coords: order.shippingAddress.coords })}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-600 mb-2 sm:mb-0"
          >
            <FaMapMarkerAlt />
            <span>Location</span>
          </button>

          {order.orderStatus !== 'delivered' && (
            <div className="flex flex-col sm:flex-row gap-2">
              {order.orderStatus !== 'shipped' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'shipped', sethandler)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow"
                >
                  On Its Way
                </button>
              )}
              <button
                onClick={() => updateOrderStatus(order._id, 'delivered', sethandler)}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow"
              >
                Mark Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>

        ))}
      </div>

      {/* Location Modal */}
      {locationModal.open && (
        <LocationPickerModal
          coords={locationModal.coords}
          onClose={() => setLocationModal({ open: false, coords: null })}
        />
      )}
    </div>
  );
}
export default Order