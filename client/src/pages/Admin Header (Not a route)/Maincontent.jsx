import {Link} from 'react-router-dom'
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import React from 'react';
import { User} from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { Outlet } from "react-router-dom"
import Sidebar from "pages/Admin/utills/AdminSidebar/Adminsidebar.jsx";
import { storeName } from "Var/config";
import menuItems from "components/DropdownItems.jsx";
import navItems from "pages/Admin/utills/AdminSidebar/Menu.js";
import { LiaShoppingBagSolid } from 'react-icons/lia';

let Maincontentwraper = ({userR ,setDarkMode, isDarkMode }) => {
    let [showList,setShow] = useState(false)
    const [isMenuOpen, setIsOpen] = useState(false);
    const [mdiconVisible, setIsVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [smallsizw, setsmallsizw] = useState(false);
    const changeTheme = (theme) => {
        setDarkMode(!isDarkMode)
    };
    useEffect(() => {
        const handleResize = () => {
          if(window.innerWidth <= 768){
              setIsVisible(true); 
              setsmallsizw(true)
          }else{
              setIsVisible(false); 
              setsmallsizw(false)
          }
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    return <>
    
            <div className={`sticky top-0 z-40 flex flex-center flex-col flex-nowrap `}>
            <div className={`NN-main-header bg-mainele justify-between sticky top-0`}>
                <div className="flex items-center -ml-3 h-16 justify-between">
                    <div className="flex items-center space-x-8">
                        <h1 className="le-side-header text-one ">
                            <Link to={'/'} >{storeName}</Link></h1>
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
                </>}
            <div id="tk" onMouseOut={()=>setIsOpen(false)} onMouseOver={()=>setIsOpen(true)}>
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
                    style={{ transform: "translate(-10px,-83px)"}}
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
                            return <li key={index} className="w-full px-4 py-2 text-left flex items-center justify-between text-dropitems hover:bg-dropitems hover:text-mainele">
                                <Link className="flex w-full items-center space-x-3" to={Obj.link}>
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
             {(showList && smallsizw) && 
        <div className={`block bg- shadow-lg fixed top-0 left-0 w-screen h-screen `}>
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
                            }if(Obj.href){
                                return    <Link
                                onClick={()=> window.location.href = Obj.href}
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
                                </Link>
                            }
                            return <>
                                <Link
                                to={Obj.link}
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
                                </Link>
                            </>
                        })}
        </div>
        </div>
}
        </div>
        <Sidebar setShow={setSidebarOpen} showList={sidebarOpen}/>
        <Outlet /> {/* This will render the correct page */}
        </div>
                </>
}
export default Maincontentwraper