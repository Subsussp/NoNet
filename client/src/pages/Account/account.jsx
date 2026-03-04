import React, { forwardRef, useRef } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { useState,useEffect } from "react";
import LoginHero from "./3D/LoginHero";
import { Canvas } from "@react-three/fiber";
import heroBg from './herobg.png'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Preloader from "Preloader";

gsap.registerPlugin(useGSAP)
const loginWithInstagram = () => {
    window.location.href ='https://www.facebook.com/v17.0/dialog/oauth?client_id=1164931302085404&redirect_uri=http://localhost:3001/auth/callback&scope=email,public_profile';
  };

const Account = ({login,setAuth,setuserR,textEnter ,textLeave,loadPre = false}) => {
    const [isLoading,setIsLoading] = useState(true)
    const [animation,setanimation] = useState(false)
    const [showPreloader,setShowPreloader] = useState(true)
    let location = useLocation()
    let navigate = useNavigate()
    let state = useRef(true)
    let Textref = useRef()
    let lineref = useRef()
    useEffect(()=>{
    window.localStorage.setItem('ref',location.pathname)
    if (window.sessionStorage.binar == 'true') {
        return navigate('/')
    }
        setIsLoading(false)
    },[])

    if (!isLoading) {
        return (    
            <>
        {(showPreloader && loadPre) && <Preloader opacityDe={0.5} delay={100} onExit={() => setShowPreloader(false)} done={!isLoading}/>}
        <div className="fixed top-0 w-full h-full">
            <Side login={login} ref={Textref} lineref={lineref} start={setanimation} state={state} textEnter={textEnter} textLeave={textLeave} />

        <div
        className="absolute inset-0"
        style={{
            backgroundColor:"black"
        }}
        >
 
      <Canvas
      gl={{ antialias: true, precision: "highp" }}
       dpr={window.devicePixelRatio > 1 ? 2 : 1}
        camera={{ position: [0, 0, 10]     
        ,fov: 50,           
        near: 0.1,           
        far: 1000,           
        }}
        className="w-full h-full"
      >  
       <LoginHero lref={Textref} setanimation={setanimation} state={state} start={animation} login={login} setAuth={setAuth} setuserR={setuserR} setIsLoading={setIsLoading} textEnter={textEnter} textLeave={textLeave}/>
        </Canvas>
         </div>
            </div>
            <div id="scroll-section" className="pointer-events-none w-full h-[250vh] top-0 absolute">
            </div>
            </>
        )
    }
}
const Side = forwardRef(({state,start,textEnter ,textLeave,lineref,login},Textref) => {
  return (
      <div className="absolute w-full h-[20vh] p-[2rem] translate-y-[-50%] mr-5 flex flex-col text-white justify-center gap-5 items-center align-middle top-[45%] z-[10]">
            <button ref={Textref} onClick={()=>{
                state.current = false
                start(true)
            }} className={`sub-title cursor-pointer text-white relative 
             focus-visible:outline focus-visible:outline-focus-action
             outline-offset-2 outline-2 ${login ? "font-xl": "font-lg"} `} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                {login ? 'Scroll to Login' :'Scroll to Sign Up' }
                <span ref={lineref} className="underline-line absolute left-0 bottom-0 h-[2px] w-full margin-auto bg-white origin-left scale-x-0"></span>
            </button>
        </div>
  )
})



export default Account