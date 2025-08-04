import 'Assets/App.css';
import Header from 'components/navbar.jsx'
import {Account,Logout} from 'pages/Account/account.jsx'
import Adminpage from 'pages/Admin/admin.jsx'
import { Root,Getitempage, Addcart,Cart, Shopcontext, cahce, Cartcontext} from 'pages/Root/Shop/Shop.jsx'
import { useEffect ,useState, useRef } from 'react'
import {
  Routes,
  Route,
  useLocation,
} from "react-router";
import ProtectedRoutes from 'utills/protectedroute'
import PrivateRoutes from 'utills/adminonly'
import Noroute from 'components/Error404.jsx'
import axios from 'axios';
import {useQuery} from '@tanstack/react-query'
import {fetchitems} from 'utills/fetch.js'
import { API_BASEURL } from 'Var/URLS.js';
import Top from 'pages/Root/Top.jsx';
import  {Userpage, Store } from 'pages/Root/Shop/user.jsx';
import Users from 'pages/users/Users.jsx';
import Maincontentwraper from 'pages/Admin Header (Not a route)/Maincontent.jsx';
import Order from 'components/order.jsx';
import Products from 'pages/control/Products.jsx';
import Dashboard from 'pages/Dashboard/dashboard.jsx';
import CheckoutForm from 'pages/proccess/Checkout.jsx';
import Profile from 'pages/Account/Profile';

const App = () => {
  let {data: itemdata,refetch,isLoading} = useQuery({queryKey:['items'],queryFn:fetchitems})
  let {data: cartdata,isError,isFetched} = useQuery({queryFn:cahce,queryKey:['cart']})
  let [data,setdata] = useState(itemdata)
  let ref = useRef(true)
  const [isDarkMode, setDarkMode] = useState((JSON.parse(window.localStorage.getItem('us-inf'))) ? (JSON.parse(window.localStorage.getItem('us-inf'))).mode === 'nv' : true);
  const [Auth,setAuth] = useState('')
  const [userR,setuserR] = useState('')
  const location = useLocation(); // Get current path
  const [smallsizw, setsmallsizw] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);
  useEffect(() => {
      const handleResize = () => {
      if(window.innerWidth <= 768){
        setsmallsizw(true)// Show only if less than md
      }else{
        setsmallsizw(false)// Show only if more than md
      }
    };
    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(()=>{
    let obj = JSON.parse(window.localStorage.getItem('us-inf'))
    if(!obj){
      window.localStorage.setItem('us-inf',JSON.stringify({mode:'nv'}))
    }
  },[])

  useEffect(()=>{
    if(itemdata){
      setdata(itemdata)
    }
  },[itemdata])
  useEffect(()=>{
    if (!isDarkMode) {
        document.documentElement.style.setProperty("--mainele", "#fff");
        document.documentElement.style.setProperty("--one", "#000");
        let obj = JSON.parse(window.localStorage.getItem('us-inf'))
        obj.mode = 'lv'
        window.localStorage.setItem('us-inf',JSON.stringify(obj))
        setDarkMode(false)
        return
      }
        let obj = JSON.parse(window.localStorage.getItem('us-inf')) || {}
        obj.mode = 'nv'
        window.localStorage.setItem('us-inf',JSON.stringify(obj))
        setDarkMode(true)
        document.documentElement.style.setProperty("--mainele", "#000");
        document.documentElement.style.setProperty("--one", "#fff");       
          
},[isDarkMode])
  useEffect(() => {
    if (Auth === '') {
      axios.get(API_BASEURL, { withCredentials: true }).then((Res) => {
        if(Res.data['us-va']){
          setuserR(Res.data['us-r'] =='cole'?'admin':'user')}
          setAuth(Res.data['us-va'])
          ref.current = false
          window.sessionStorage.binar = Res.data['us-va']
      })  
    }
  } ,[Auth])
  if(!fontsLoaded){
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading fonts...
      </div>
    );
  }
  if(ref.current || isLoading || !isFetched || isError){  
    return (<></>)
  }
  return (
    <>
    <Shopcontext.Provider value={data}>
                 {
                   location.pathname == '/' ? <div className='fullscreen-container' >
                          <Header userR={userR} setDarkMode={setDarkMode} isDarkMode={isDarkMode} />
                          <Top darkmode={isDarkMode}/> 
                     </div>
     : ((!['/admin','/dashboard','/users','/orders','/control','/analytics'].includes(location.pathname)) && <Header userR={userR} setDarkMode={setDarkMode} isDarkMode={isDarkMode} />)}
    <Cartcontext.Provider value={cartdata}>
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<Account setAuth={setAuth} setuserR={setuserR} login={true} />}/>
      <Route path='/signup' element={<Account login={false} />}/>
      {/* <Route path='/' element={<Userpage refetch={refetch} isDarkMode={isDarkMode}/>}/> */}
      <Route path='/items/:id' element={<Getitempage />}/>   
      <Route path='/proccess' element={<CheckoutForm  />}/>       
      <Route index element={      <Profile/>
}/>
      
      {/* Protected Routes (Require Authentication) */}
      <Route element={<ProtectedRoutes />}>     
        {/* <Route path='/profile' element={<Profile />}/>        */}
        <Route path='/cart' element={<Cart />}/>       
        <Route path='/logout' element={<Logout setAuth={setAuth} setuserR={setuserR} />} />
        <Route path='/cart/add-to-cart' element={<Addcart />}/>       
        <Route path='/store' element={<Store smallsize={smallsizw} BestSellerAndMain={false} Catg={!data ? [] : data.map((value)=>value.catg)} />}/>
      </Route>
      {/* Private Routes (Require Specific Role/User Access) */}
        <Route element={<PrivateRoutes userR={userR}/>}>
            <Route element={                  
              <Maincontentwraper userR={userR} setDarkMode={setDarkMode} isDarkMode={isDarkMode} />                  }>
            <Route path="/dashboard" element={<Dashboard refetch={refetch}/>} />
            <Route path="/orders" element={<Order />} />
            <Route path="/analytics" /> 
            <Route path="/control" element={<Products data={data} refetch={refetch} /> }/>
            <Route path="/admin" element={<Adminpage />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>  
      <Route path='*' element={<Noroute/>}/>
    </Routes>
    {/* {smallsizw && <Navigator userR={userR}/>} */}
    </Cartcontext.Provider>
    </Shopcontext.Provider>
  </>

 )}


export default App;
