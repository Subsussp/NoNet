import Dashboard from "pages/Dashboard/dashboard";
import Orders from 'components/order'
import Users from 'pages/users/Users'
import { Shopcontext } from "pages/Root/Shop/Shop";
import { fetchitems } from "utills/fetch";
import { useQuery } from "@tanstack/react-query";
import { data, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    Sun,
    Moon,
    Menu,
  } from 'lucide-react';
  import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
  } from 'recharts';
import axios from "axios";
import { API_ADMIN } from "Var/URLS";
import { FaIntercom } from "react-icons/fa";
import { OrderStatusBadge } from "./OrderStatusBadge";
import Loader  from "Loader";
  
  
const Adminpage = ({setuserR,setAuth,darkMode}) => { 
  let navigate = useNavigate()
  const [salesData, setsalesData] = useState([]);
  const [OsalesData, setOsalesData] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [totalOrdersChange, setTotalOrdersChange] = useState([]);
  const [totalorders, setTotalorders] = useState([]);
  const [ActiveUsers, setActiveUsers] = useState([]);
  const [totalUsersChange, setTotalUsersChange] = useState([]);
  const [recentOrders, setrecentOrders] = useState([]);
  const [Revenue, setRevenue] = useState([]);
  const [todaysOrdersCount, setTodaysOrdersCount] = useState(0);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // let {data,isLoading,refetch} = useQuery({queryKey:['items'],queryFn:fetchitems}) 
  let location = useLocation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(API_ADMIN + '/Gate',{withCredentials:true,  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },});
        if(!response.data.valid && response.data.valid != undefined){
          window.sessionStorage.binar = false
          setuserR("")
          setAuth(false)
          return navigate('/login')
        }
        let users = response.data.totalUsers
        let salesByDay = response.data.salesByDay
        let Revenue = response.data.totalRevenue
        let Orders = response.data.Orders
        let totalUsersChange = response.data.totalUsersChange
        let totalOrdersChange = response.data.totalOrdersChange
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaysOrdersCount = Orders?.filter(order => {
          const orderDate = new Date(order.createdAt);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.getTime() === today.getTime();
        })?.length;
        let recent = []
        if(Orders?.length > 0){
          setTotalorders(Orders.length)
          Orders.reverse()
          recent = Orders.slice(0,8)
        }
        setTodaysOrdersCount(todaysOrdersCount)
        setrecentOrders(recent)
        setActiveUsers(users);
        setRevenue(Revenue);
        setTotalOrdersChange(totalOrdersChange);
        setTotalUsersChange(totalUsersChange);
        setRevenue(Revenue);
        setOrders(Orders);
        setOsalesData(salesByDay.map((item)=>{
          return {
          name:item.day,
          value:item.orderCount
        }}));
        setsalesData(salesByDay.map((item)=>{
          return {
          name:item.day,
          value:item.totalSales
        }}));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.localStorage.setItem('ref',location.pathname)
  },[])
    if (error) return <p>Error: {error.message}</p>;
    return <>
        {/* Dashboard Content */}
        {!loading  &&
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Revenue', value: '$' + Revenue , change: '' },
              { label: 'Total Users', value: ActiveUsers, change: totalUsersChange + '%' },
              { label: 'Today’s Orders', value: todaysOrdersCount, change: '' },
              { label: 'Total Orders', value: totalorders, change: totalOrdersChange + '%'},
              // { label: 'Conversion Rate', value: '3.2%', change: '' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <p className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <span className="ml-2 text-sm text-green-500">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Sales Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d6b92" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1d6b92" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                  <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                  <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1F2937' : 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: darkMode ? 'white' : 'black'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1d6b92" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h2 className={`text-lg flex justify-between items-center font-semibold mb-4 -mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Orders
          
  <Link
    to="/orders"
    className={`px-3 py-2 font-medium transition-colors text-[var(--mainele)] transition-all duration-200 shadow-md rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-900": "bg-gray-50 hover:bg-gray-100"} `}
  >
    See All Orders
  </Link>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-left ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} ${['pending',"cancelled","shipped"].includes(order?.orderStatus) && "transition-all duration-200 hover:shadow-md hover:bg-gray-50"}`}>
                        <td className={`py-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {order.shippingAddress.fullName}
                        </td>
                        <td className={`py-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {(order.items.map((item)=><Link key={item.product} to={`/items/${item.product}`}><FaIntercom></FaIntercom></Link>))}
                        </td>
                        <td className={`py-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          ${order.totalAmount}
                        </td>


                        <td className="px-6 py-4 text-center">
                          <OrderStatusBadge status={order.orderStatus} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-4">

</div>
              </div>
            </div>

                      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Order Volume
            </h2>
            <div className="h-80">
<table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2 text-left">Day</th>
      <th className="p-2 text-right">Sales</th>
    </tr>
  </thead>
  <tbody>
    {OsalesData.map((day, index) => (
      <tr key={index} className="border-b text-mainele">
        <td className="p-2">{day.name}</td>
        <td className="p-2 text-right">{day.value}</td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
          </div>
          </div>
        </main>}
        {load && <Loader onExit={()=> setLoad(false)} done={loading} />}
    
            {/* // <Users/>
            // <Orders/> 
            // {/* <Dashboard refetch={refetch}/>  */}
    </>
    
}

export default Adminpage