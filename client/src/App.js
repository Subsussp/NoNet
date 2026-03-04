import 'Assets/App.css';
import Header from 'components/navbar.jsx'
import Logout from 'pages/Account/logout.jsx'
import Account from 'pages/Account/account.jsx'
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
import  Store from 'pages/Root/Shop/Store';
import  Userpage from 'pages/Root/Shop/user.jsx';
import Users from 'pages/users/Users.jsx';
import Maincontentwraper from 'pages/Admin Header (Not a route)/Maincontent.jsx';
import Order from 'components/order.jsx';
import Products from 'pages/control/Products.jsx';
import Dashboard from 'pages/Dashboard/dashboard.jsx';
import CheckoutForm from 'pages/process/Checkout.jsx';
import Profile from 'pages/Account/Profile';
import { useMotionValue, useSpring ,motion} from "framer-motion";
import Layout from 'components/Layout';
import Preloader from 'Preloader';

const App = () => {
  let {data: itemdata,refetch,isLoading} = useQuery({queryKey:['items'],queryFn:fetchitems})
  let {data: cartdata,refetch: refetchcart,isError,isFetched} = useQuery({queryFn:cahce,queryKey:['cart']})
  let [data,setdata] = useState(itemdata)
  let ref = useRef(true)
  const [isDarkMode, setDarkMode] = useState((JSON.parse(window.localStorage.getItem('us-inf'))) ? (JSON.parse(window.localStorage.getItem('us-inf'))).mode === 'nv' : true);
  const [Auth,setAuth] = useState('')
  const [userR,setuserR] = useState('')
  const [loadPre,setloadPre] = useState(false)
  const location = useLocation(); 
  const [smallsizw, setsmallsizw] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [done, setdone] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  useEffect(() => {
    const mouseMove = e => {
        cursorX.set(e.clientX - 24);
        cursorY.set(e.clientY - 24);
    }
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, [cursorX, cursorY]);
        const smoothX = useSpring(cursorX, {
        stiffness: 150,   // lower = more lag
        damping: 18,      // higher = snappier
        mass: 0.3         // controls inertia
    });
    const smoothY = useSpring(cursorY, {
        stiffness: 150,
        damping: 18,
        mass: 0.3
    });
    
  const variants = {
    default: {
    },
    text: {
      height: 36,
      width: 36,
        backdropFilter: "blur(.9px)",
      mixBlendMode: "difference"
    }
  }
  
    const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");
    

    useEffect(() => {
      if(window.localStorage?.alert == null || window.localStorage?.alert == 'true'){
        window.localStorage.alert = 'false'
      }
  }, []);
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
      }else{
        let obj = JSON.parse(window.localStorage.getItem('us-inf')) || {}
        obj.mode = 'nv'
        window.localStorage.setItem('us-inf',JSON.stringify(obj))
        setDarkMode(true)
        document.documentElement.style.setProperty("--mainele", "#000");
        document.documentElement.style.setProperty("--one", "#fff");       
      }
        
},[isDarkMode])
  useEffect(() => {
    if (Auth === '') {
      const token = localStorage.getItem("token"); 
      axios.get(API_BASEURL, { withCredentials: true,  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },}).then((Res) => {
        if(Res.data['us-va']){
          setuserR(Res.data['us-r'] =='cole'?'admin':'user')}
          setAuth(Res.data['us-va'])
          ref.current = false
          window.sessionStorage.binar = Res.data['us-va']
      })  
    }
  } ,[Auth])
     useEffect(() => {
    if(Auth && userR){
      refetchcart()
      console.log(cartdata)
      const token = localStorage.getItem("token"); 
      fetch(`${API_BASEURL}/profile`, {
        credentials: "include",   
        headers:{
          ...(token && { "Authorization": `Bearer ${token}`})
        }
      })
      .then(async(res) => res.json())
      .then((data) => {setUserData(data) }
    )  
      .catch((err) => console.error("Error fetching profile:", err));
    }
    }, [Auth]);
  if((!ref.current && !isLoading && isFetched && !isError && fontsLoaded) && !done){
    setdone(true)
  }
  return (
    <>
   {showPreloader && <Preloader delay={!!window.localStorage.getItem('alert') ? 120 : 620} onExit={() => setShowPreloader(false)} done={done}/>}
      {done &&  <> <motion.div
              className='cursor'
               style={{
                    x: smoothX, 
                    y: smoothY, 
                }}
              variants={variants}
              animate={cursorVariant}
            />
    <Shopcontext.Provider value={data}>
                 {
                   location.pathname == '/' ? <div className='fullscreen-container' >
                          <Header setloadPre={setloadPre} userR={userR} setDarkMode={setDarkMode} isDarkMode={isDarkMode} textLeave={textLeave} textEnter={textEnter}/>
                          <Top darkmode={isDarkMode} textEnter={textEnter} textLeave={textLeave}/> 
                     </div>
     : ((!['/admin','/dashboard','/users','/orders','/control','/analytics'].includes(location.pathname)) && <Header userR={userR} setDarkMode={setDarkMode} isDarkMode={isDarkMode} />)}
    <Cartcontext.Provider value={{ cartdata, refetchcart }}> 
    <Routes>
      <Route element={<Layout textLeave={textLeave} textEnter={textEnter}/>}>
      {/* Public Routes */}
      <Route path='/login' element={<Account loadPre={loadPre} textLeave={textLeave} textEnter={textEnter} setAuth={setAuth} setuserR={setuserR} login={true} />}/>
      <Route path='/signup' element={<Account loadPre={loadPre} textLeave={textLeave} textEnter={textEnter} login={false} />}/>
      <Route index element={<Userpage textEnter={textEnter} textLeave={textLeave} refetch={refetch} isDarkMode={isDarkMode}/>}/>
      <Route path='/items/:id' element={<Getitempage textEnter={textEnter} textLeave={textLeave} />}/>   
      <Route path='/process' element={<CheckoutForm textEnter={textEnter}  textLeave={textLeave} />}/>       
      {/* <Route index element={<Root userR={userR} isDarkMode={isDarkMode} />}/> */}
      
      {/* Protected Routes (Require Authentication) */}
      <Route element={<ProtectedRoutes/>}>     
        <Route path='/profile' element={
      userData ? <Profile textEnter={textEnter} initialData={userData} setUserData={setUserData} textLeave={textLeave}/> : <div>Loading...</div>
    }/>       
        <Route path='/cart' element={<Cart Auth={Auth} textEnter={textEnter} textLeave={textLeave} />}/>       
        <Route path='/logout' element={<Logout textEnter={textEnter} textLeave={textLeave} setAuth={setAuth} setuserR={setuserR} />} />
        <Route path='/cart/add-to-cart' element={<Addcart textEnter={textEnter} textLeave={textLeave}/>}/>       
        <Route path='/store' element={<Store BestSellerAndMain={true} smallsize={smallsizw} textEnter={textEnter} textLeave={textLeave} Catg={!data ? [] : data.map((value)=>value.catg)} />}/>
      </Route>

      {/* Private Routes (Require Specific Role/User Access) */}

        <Route element={<PrivateRoutes userR={userR}/>}>
            <Route element={                  
            <Maincontentwraper userR={userR} setDarkMode={setDarkMode} isDarkMode={isDarkMode} />                  }>
            <Route path="/dashboard" element={<Dashboard textEnter={textEnter} textLeave={textLeave} refetch={refetch}/>} />
            <Route path="/orders" element={<Order textEnter={textEnter} textLeave={textLeave}/>} />
            <Route path="/analytics" /> 
            <Route path="/control" element={<Products textEnter={textEnter} textLeave={textLeave} data={data} refetch={refetch} /> }/>
            <Route path="/admin" element={<Adminpage setuserR={setuserR} setAuth={setAuth} textEnter={textEnter} textLeave={textLeave}/>} />
            <Route path="/users" element={<Users textEnter={textEnter} textLeave={textLeave}/>} />
          </Route>
        </Route>  
      <Route path='*' element={<Noroute/>}/>    
      </Route>
    </Routes>
    {/* {smallsizw && <Navigator userR={userR}/>} */}
    </Cartcontext.Provider>
    </Shopcontext.Provider>   </>
}
  </>

 )}


export default App;
