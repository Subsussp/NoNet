import { useEffect, useState ,createContext, memo, useMemo, useContext, useRef} from 'react'
import { useLocation, useNavigate,  useParams, useSearchParams } from 'react-router'
import axios from 'axios';
import Dashboard from 'pages/Dashboard/dashboard.jsx';
import {Userpage} from './user.jsx'
import Noroute from 'components/Error404.jsx'
import { useQuery } from '@tanstack/react-query';
import {fetchitems, fetchuser} from 'utills/fetch.js'
import Delete  from "pages/Admin/Delete.jsx";
import ProductPage from 'pages/ItemPage/Productpage.jsx';
import SideNotification from 'pages/Admin/utills/showNotif.jsx';
import { API_BASEURL } from 'Var/URLS.js';
// import Maincontentwraper from 'pages/Admin Header (Not a route)/Maincontent.jsx';
export let Shopcontext = createContext()
export let Cartcontext = createContext()


async function getproduc(id){
  let a = await axios.get(API_BASEURL + `/items/${id}`, {withCredentials:true}).catch((res) => res)
  let data = await a.data
  return data
}
async function cahce(){
    let html = await axios.get(API_BASEURL + `/cart`, {withCredentials:true})
    return html
}
async function addtocart(id){
    let html = await axios.get(API_BASEURL + `/cart/add-to-cart?pr_id=${id}`, {withCredentials:true})
}
const Getitempage = () => {
  const { id } = useParams()
  let [data,setData] = useState({})
  useEffect(()=> {
    getproduc(id).then((res) => {
      if(res){
        setData(res)
      }
     }) 
     }, [])
  if(Object.values(data).length < 1){
    return <></>
  }
      return data ? (<ProductPage refe={id} data={data}/>) : <Noroute/>
}


const Addcart = () => {
  let navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setload] = useState(true);
  const id = searchParams.get("pr_id")
  const redirect = window.localStorage.getItem('ref')
  let {data,isFetching} = useQuery({
    queryFn: cahce, // Ensure that 'cache' properly returns cached data if it exists
    queryKey: ['cart'],
    enabled: !loading,
    refetchOnWindowFocus: false, // Disable refetch when window refocuses (optional)
  });
  useEffect(()=>{
    addtocart(id).then(()=>{
      setload(false)
    })
  },[id])
  if(loading || isFetching){
    return <></>
  }
  return navigate(redirect, { replace: true }) 
}


const Cart = () => {
  const data = useContext(Cartcontext);
  const { isLoading, isError, isFetched, refetch } = useQuery({
    queryFn: cahce,
    queryKey: ["cart"],
    enabled: false,
  });
  let [renderhandler,sethandler] = useState(0)
  const location = useLocation();
  const updateTimers = useRef({});

  useEffect(() => {
    window.localStorage.setItem("ref", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!isFetched && !data) {
      refetch();
    }
  }, [isFetched, data, refetch,data.data]);

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-500 text-lg">
        Loading your cart...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-semibold py-6">
        Error loading the cart. Please try again.
      </div>
    );
  }

  if (!isLoading && data.data.length < 1) {
    return (
      <div className="text-center text-gray-600 italic py-6">
        Your cart is empty.
      </div>
    );
  }

  async function HandleDelete() {
    await refetch();
  }
 // Update quantity backend call
    const changeQuantity = (id, newQty) => {
    if (newQty < 1) return;
    data.data.forEach( (item)=> {
      if(item.data._id == id){
        console.log(item.nun)
        item.nun = newQty
        sethandler(renderhandler + 1)
      }
    })
    // Clear previous timer for this item
    if (updateTimers.current[id]) {
      clearTimeout(updateTimers.current[id]);
    }

    // Start new timer to update backend after 500ms idle
    updateTimers.current[id] = setTimeout(() => {
      updateQuantity(id, newQty);
      delete updateTimers.current[id];
    }, 1800);
  };

  async function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) return; // Optional: prevent zero or negative qty
    try {
      const res = await fetch(`${API_BASEURL}/cart`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, quantity: newQuantity }),
      });
      if (res.ok) {
        await refetch();
      } else {
        alert("Failed to update quantity.");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {data.data.map((item) => (
        <div
          key={item.data._id}
          className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          {/* Image */}
          <img
            src={item.data.img || "https://via.placeholder.com/80"}
            alt={item.data.name}
            className="w-20 h-20 rounded object-cover mr-4"
          />

          {/* Name and quantity controls */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{item.data.name}</h3>

            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => changeQuantity(item.data._id, item.nun - 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-gray-700 font-medium">{item.nun}</span>
              <button
                onClick={() => changeQuantity(item.data._id, item.nun + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Delete button */}
          <Delete
            Config={{ url: `${API_BASEURL}/cart`, config: { id: item.data._id } }}
            refresh={HandleDelete}
            id={item.data._id}
            className="ml-4"
          />
        </div>
      ))}
    </div>
  );
};

const Root = ({userR ,isDarkMode}) => {
    let navigate = useNavigate()
    let [component,setComp] = useState()
    let {data,isLoading,refetch} = useQuery({queryKey:['items'],queryFn:fetchitems})
    const [showNoti, setshowNoti] = useState([false,'','']) 
    let location = useLocation()
    useEffect(()=>{
        window.localStorage.setItem('ref',location.pathname)
      if (window.sessionStorage.binar == 'false') {
          navigate('/login')
      }
      else {
          if (userR == 'admin') {
            setComp(<Dashboard refetch={refetch}/>)
        } else {
            navigate('/')
            setComp(<Userpage refetch={refetch} darkmode={isDarkMode}/>)
          }
        }
    },[])
    if(isLoading){
      return <></>
    }
    return (<Shopcontext.Provider value={data}>
            {(showNoti[0]) ? <SideNotification setshowNoti={setshowNoti} type={showNoti[2]} message={showNoti[1]} /> : <></> }
             {component}</Shopcontext.Provider>)
  }
  

export  {Root,Getitempage,Addcart,Cart,cahce} 