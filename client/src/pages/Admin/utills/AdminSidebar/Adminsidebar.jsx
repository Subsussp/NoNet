import { Link } from "react-router-dom";
import navItems from "./Menu"
import { IconContext } from "react-icons";
import { User ,CircleArrowOutDownLeft ,ArrowDownToDot , CircleArrowOutUpLeft,CircleArrowOutUpRight, ArrowLeftRight, CircleDotDashed  } from 'lucide-react';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let Sidebar = ({setShow,showList}) => {
    const [icon, setIcon] = useState("play");
    const [back, setBack] = useState(false);
    const handleClick = () => {
      if(icon == 'done'){
        setIcon('loading')
        setBack(true)
        setTimeout(() => setIcon("play"), 450);
        return
      }
      setIcon("loading");
      setBack(false)
      // setTimeout(() => setIcon("loading"), 1500);
      setTimeout(() => setIcon("done"), 450);
    };
    useEffect(()=>{
      if(window.location.pathname == '/admin'){
        setIcon('loading')
        setBack(true)
        setTimeout(() => setIcon("play"), 450);
      }
    },[])
    return  (<div className={`fixed block top-[2.1%] h-fit inset-y-0 left-[50%] z-50 w-64 -translate-x-[50%] transform transition-transform duration-300 ease-in-out `}>
    <div className="flex items-center flex-col flex-nowrap p-3">
    <li style={{'cursor':'pointer'}} className="text-one no-underline cursor-pointer text-interactive-primary hover:text-interactive-primary-hover disabled:pointer-events-none disabled:opacity-40 sc-28e98bbc-0 CrMKY flex items-center justify-center" 
                    onClick={(e)=>{
                      handleClick(e)
                      setShow(!showList)
                    }}
                    >
                      <div className="flex flex-col justify-center items-center"><IconContext.Provider value={{size:"6px"}}>
                          <motion.span
                            key={icon} // Forces re-render for smooth animation
                            initial={{ opacity: 1, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5 }}
                            >
                              {/* {!icon && <ArrowLeftRight />} */}
                              {icon === "loading" && (
                                <motion.div
                                  className="absolute inset-0 border-4 border-white rounded-full"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 1, 0], rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                />
                              )}
                            {icon === "play" && <CircleDotDashed  size={24} />}
                            {icon === "loading" && <CircleArrowOutDownLeft size={24} className={`${back ? 'animate-[spin_1s_linear_infinite_reverse]' : 'animate-spin'} border-2 border-white`} style={{ animationDuration: "0.5s" }} />}
                            {icon === "done" && <ArrowDownToDot size={24} />}
                          </motion.span>
                            </IconContext.Provider>
                        </div>
                </li>
      <h1 className={`text-xl font-Second font-bold text-one`}>Panel</h1>
    </div>
    {icon == 'done' &&(
       <motion.span
       key={icon} // Forces re-render for smooth animation
       initial={{ opacity: 0, scale: 0.5 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.5 }}
       transition={{ duration: 0.2 }}
       >
      <nav className="mt-[9px] justify-center flex items-center flex-nowrap flex-col bg-mainele border-x border-b border-one ">
      {navItems.map((item, index) => {
        return <>
        <Link 
          key={index}
          to={item.href}
          className={`flex items-center justify-center w-full hover:bg-gray-700 py-3 font-Main font-[600] tracking-[0.1em] text-sm ${item.active &&
            'hover:bg-gray-700 hover:text-white'}`}
            >
          {item.icon}
          <span className="ml-3 text-one" >{item.label}</span>
        </Link></>}
      )}
    </nav>                          </motion.span>
)}
  </div>) 
}
export default Sidebar