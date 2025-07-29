import { useEffect, useState ,createContext, memo, useMemo} from 'react'
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
  let {data,isLoading,isError,isFetched,refetch} = useQuery({queryFn:cahce,queryKey:['cart'],enabled:false})
  let location = useLocation()
  useEffect(() => {
    window.localStorage.setItem('ref',location.pathname)
  },[])
  useEffect(() => {
    if (!isFetched && !data) {
      refetch();
    }
  }, [isFetched, data, refetch]);
  if(isLoading | !data){
    return <></>
  }
  if(isError){
    return <>Error Loading the page....</>
  }
  if(!isLoading && data.data.length < 1){
    return <>No items in your cart....</>
  }
    async function HandleDelete() {
      await refetch()
    }
  return (data.data.map((e)=><>{e.data.name}{e.nun}<Delete Config={{url:`${API_BASEURL}/cart`,config:{id:e.data._id}}} refresh={HandleDelete} id={e.data._id} /><br></br><br></br><br></br></>))
}

const Root = ({userR ,isDarkMode}) => {
    let navigate = useNavigate()
    let [component,setComp] = useState()
    let {data,isLoading,refetch} = useQuery({queryKey:['items'],queryFn:fetchitems})
    const [showNoti, setshowNoti] = useState([false,'','']) 
    let location = useLocation()
    useEffect(()=>{
        window.localStorage.setItem('ref',location.pathname)
      if (window.sessionStorage.binar == 'false') {
          return navigate('/login')
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