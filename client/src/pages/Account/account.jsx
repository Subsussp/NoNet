import React, { useRef } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { useState,useEffect } from "react";
import LoginHero from "./3D/LoginHero";
import { Canvas } from "@react-three/fiber";
import heroBg from './herobg.png'

const loginWithInstagram = () => {
    window.location.href ='https://www.facebook.com/v17.0/dialog/oauth?client_id=1164931302085404&redirect_uri=http://localhost:3001/auth/callback&scope=email,public_profile';
  };

const Account = ({login,setAuth,setuserR,textEnter ,textLeave}) => {
    const [isLoading,setIsLoading] = useState(true)
    const [animation,setanimation] = useState(false)
    let location = useLocation()
    let navigate = useNavigate()
    let state = useRef(true)

    useEffect(()=>{
        window.localStorage.setItem('ref',location.pathname)
        if (window.sessionStorage.binar == 'true') {
            return navigate('/')
        }
            setIsLoading(false)
        },[])
    if(isLoading){
        return <>Loading...</>
    }
    if (!isLoading) {
        return (    
        <>
        <Side start={setanimation} state={state} textEnter={textEnter} textLeave={textLeave} />
        <div
        className="absolute inset-0"
        style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url(${heroBg})
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >

      <Canvas
       dpr={window.devicePixelRatio > 1 ? 2 : 1}
        camera={{ position: [0, 0, 10]     
        ,fov: 50,             // field of view
        near: 0.1,           // near clipping plane
        far: 1000,           // far clipping plane
        }}
        className="w-full h-full"
      >  
       <LoginHero state={state} start={animation} login={login} setAuth={setAuth} setuserR={setuserR} setIsLoading={setIsLoading} textEnter={textEnter} textLeave={textLeave}/>
         </Canvas>
         
         </div>
            </>
        )
    }
}

const Side = ({state,start,textEnter ,textLeave}) => {
  return (
      <div className="absolute h-full w-[20$] flex flex-col text-white justify-center gap-5 items-center align-middle top-0 right-0 z-[10]">
            <button onClick={()=>{
                state.current = false
                start(true)
            }} className="sub-title cursor-pointer text-white
             focus-visible:outline focus-visible:outline-focus-action
             outline-offset-2 outline-2" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                Start your journy
            </button>
        </div>
  )
}



export default Account