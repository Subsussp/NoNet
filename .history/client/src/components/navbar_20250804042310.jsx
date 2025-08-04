import { LiaShoppingBagSolid } from "react-icons/lia";
import {storeName,Storecolors,logo} from '../Var/config.js'
import {Link} from 'react-router-dom'
import { IconContext } from "react-icons";
import '../Assets/Style.css'
import { useEffect, useState } from "react";
import React from 'react';
import { Search, User} from 'lucide-react';
import menuItems from "./DropdownItems.jsx";
import { Shopcontext } from "../pages/Root/Shop/Shop.jsx";
import { useContext } from "react";
import { Menu, X } from 'lucide-react';

const Header = ({userR,setDarkMode,isDarkMode}) => {
    let [showList,setShow] = useState(false)
    let [searchParams,setSearchParams] = useState('')
    let ShopData = useContext(Shopcontext)
    const [isMenuOpen, setIsOpen] = useState(false);
    const [mdiconVisible, setIsVisible] = useState(false);
    const [smallsizw, setsmallsizw] = useState(false);
    const [Trigger, setTrigger] = useState(false);
    const changeTheme = (theme) => {
        setDarkMode(!isDarkMode)
    };
    function trigger(e) {
        setTrigger(!Trigger)
    }
    useEffect(() => {
      const handleResize = () => {
        if(window.innerWidth <= 768){
            setIsVisible(true); // Show only if less than md
            setsmallsizw(true)
        }else{
            setIsVisible(false); // Show only if more than md
            setsmallsizw(false)
        }
      };
  
      handleResize(); // Run once on mount
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
 
    return (
        <header className={`bg-mainele border-b border-gray-700 sticky top-0 z-50 flex flex-center flex-col flex-nowrap`} >
            <div className={`NN-main-header bg-mainele`}>
                <div className="flex items-center h-16 justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="le-side-header text-one ">
                            <Link to={'/'} >{storeName}</Link></h1>
                        <div className="relative flex-1 max-w-xl">
                                <button className="absolute inset-y-0 left-0 pl-3 flex items-center" onClick={trigger}>
                                    <Search className={`h-5 w-5 text-${!Trigger ? 'one':'mainele'}`}/>
                                </button>
                            <input
                            onChange={(e)=>setSearchParams(e.target.value)}
                            type="text"
                            className={`${Trigger ? 'block' : 'hidden'} transition duration-300 ease-in-out w-full pl-10 pr-3 py-2 border rounded-lg bg-one text-mainele placeholder-gray-400 focus:outline-none`}
                            placeholder="Search items, collections, and accounts"
                            />
                            <div className={`absolute ${(searchParams && ShopData) ? 'block' : 'hidden'} min-w-fit w-[60vw] min-h-fit h-[10vh]`}>
                                {(searchParams && ShopData) && ShopData.map((item)=>{
                                    if((item.name.toLowerCase().replaceAll(' ','')).includes(searchParams.toLowerCase().replaceAll(' ',''))){
                                        return <li className="bg-one">
                                                        <Link className="w-full h-full bg-one flex items-center" to={`/items/${item._id}`}>
                                                            <img draggable='false'
                                                            src={item.img[0]}
                                                            alt={`${item.name} photo`}
                                                            className={`w-[10vw] h-[10vw] block object-cover`}
                                                            />
                                                      <div className="ml-3 h-full">
                                                            <h1 className="font-medium text-mainele">{item.name}</h1>
                                                            <p className="ml-2 font-medium text-red-800">{item.desc}</p>
                                                      </div>
                                                        </Link>
                                        </li>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {!mdiconVisible &&
            <ol className="flex items-center space-x-6 px-170">
                {!userR ?
                    // what an unregestried user sees
                 <><div className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-700 "> 
                    <Link className="text-one px-2" to="/login">Login</Link>
                </div> 
                <div className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-700 "> 
                    <Link className="text-one px-2" to="/signup">SignUp</Link>
                </div></>:
                <> 
                     {/* what a user sees */}
                    {/* <Link className="text-one py-1 px-2" to={'/profile'}>Profile</Link>  */}
                    {/* <a className="text-one py-1 px-2"  href="/logout">Logout</a> */}
                </>}
            <div id="tk" on onMouseOut={()=>setIsOpen(false)} onMouseOver={()=>setIsOpen(true)}>
                <li style={{'cursor':'pointer'}} className="text-one no-underline cursor-pointer text-interactive-primary hover:text-interactive-primary-hover disabled:pointer-events-none disabled:opacity-40 sc-28e98bbc-0 CrMKY ml-3 flex items-center justify-center" 
                    onClick={()=>setShow(!showList)}
                    >
                        <div className="flex flex-col justify-center items-center"><IconContext.Provider value={{size:"6px"}} > <User className="h-6 w-6"/></IconContext.Provider>
                        </div>
                </li>
                {(isMenuOpen || showList) && (
                    <div
                    id="IK"
                    className="absolute z-[5] mt-2 w-[18rem] bg-transparent top-[136px] pt-4 right-[43px]"
                    style={{ transform: "translate(-50px,-83px)"}}
                    >
                    <div
                        className="mt-2 w-full bg-mainele rounded-lg shadow-lg py-2 "
                        style={{ visibility: "visible", inset: "0px 0px auto auto", margin: "0px" }}
                    >
                        <ul className="w-full h-full py-2 rounded-[12px] text-left flex flex-col items-center justify-between">
                        {menuItems.map((Obj,index)=>{
                            if(Obj.divider){
                                return <hr key={index} className="my-2 w-full border-1 border-one"/>
                            }
                            if(Obj.require && !userR){
                                return 
                            }
                            if(Obj.admin && userR != 'admin'){
                                return 
                            }
                            return <li key={index}       onClick={() => navigate(`${Obj.link}`)}  className="w-full px-4 py-2 text-left flex items-center justify-between text-dropitems hover:bg-dropitems hover:text-mainele">
                                <Link className="flex w-full items-center space-x-3" to={}>
                                    <span >{Obj.icon}</span>
                                    <span className="flex-1 ">{Obj.label}</span>
                                    {Obj.suffix && (<span className="text-sm text-gray-500">{Obj.suffix}</span> )}
                                    {Obj.toggle && (
                                        <button onClick={changeTheme}>
                                            <div className={`w-10 h-6 rounded-full p-1 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                                        </div>
                                        </button>
                                    )}
                                </Link>
                        </li>
                        })}
                        </ul>
                    </div>
                    </div>
                )}</div>
                <li onClick={()=>setShow(false) } className="text-one" ><Link to={'/cart'} ><IconContext.Provider  value={{ size:"29px" }}> <LiaShoppingBagSolid /></IconContext.Provider> </Link></li>
            </ol>}
             {(mdiconVisible && smallsizw) && 
            <div className="flex items-center">
                <button
                onClick={()=>{
                    setShow(!showList)
                }}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
                >
                {(!showList) && (
                    <Menu className="block h-6 w-6 text-one" aria-hidden="true" />
                )}
                </button>
            </div>
        }
        </div>
        {(showList && smallsizw) && 
        <div className={`block bg- shadow-lg fixed top-0 left-0 w-screen h-screen z-50`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-mainele sm:px-3  h-screen  w-[100vw] flex items-center flex-col overflow-y-auto">
            <button
                onClick={()=>{
                    setShow(!showList)
                }} className="block py-[15px] mb-[30px] px-[30px] place-self-end h-6 w-6 text-one"><X  aria-hidden="true" /></button>
            {menuItems.map((Obj,index)=>{
                            if(Obj.divider){
                                return <hr key={index} className="my-2 w-full border-1 border-one"/>
                            }
                            if(Obj.require && !userR){
                                return 
                            }
                            if(Obj.admin && userR != 'admin'){
                                return 
                            }
                            return <>
                                <a
                                href={Obj.link}
                                className="flex w-full items-center space-x-3 block px-3 py-2 font-medium text-dropitems hover:bg-dropitems hover:text-mainele">
                                <span className="flex-1">{Obj.label}</span>
                                <span>{Obj.icon}</span>              
                                    {Obj.suffix &&  (<span className="text-sm text-gray-500">{Obj.suffix}</span> )}
                                    {Obj.toggle && (
                                        <button onClick={changeTheme}>
                                            <div className={`w-10 h-6 rounded-full p-1 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                                        </div>
                                        </button>
                                    )}
                                </a>
                            </>
                        })}
                
                <a
                    href="#"
                    className="text-dropitems hover:bg-dropitems hover:text-mainele block px-3 py-2 rounded-md font-medium"
                >
                    Model 3
                </a>
                <a
                    href="#"
                    className="text-dropitems hover:bg-dropitems hover:text-mainele block px-3 py-2 rounded-md font-medium"
                >
                    Model X
                </a>
            </div>
                </div> }
        </header> 

    )
}

export default Header