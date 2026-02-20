import React, { useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF, TransformControls , useHelper ,useProgress} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Iphone from './iphone.jsx'
import { SpotLightHelper } from "three";
import { ScrollTrigger } from "gsap/all";
// --- 3D iPhone model ---
function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      {progress.toFixed(0)} % loaded
    </Html>
  )
}
export default function Hero({start,login,setAuth,setuserR,state ,setIsLoading,textLeave,textEnter}) {
  const target = useRef();
  const light = useRef();
  let rotation = useRef()
  // const transformRef = useRef(); // changing initial
 
  useFrame(() => {
    if (light.current && target.current) {
      light.current.target.position.copy(target.current.position);
      light.current.target.updateMatrixWorld();
    }
  });
  
  // const speed = 0.01; // radians per frame
  // useFrame(() => {
  //   if (target.current && state.current) {
  //     // rotate around Y axis
  //     // target.current.rotation.z +=  speed;
  //     // target.current.rotation.x += Math.sin(speed);
  //     // you can also rotate around X or Z if you like
  //     // ref.current.rotation.x += speed * 0.5;
  //     // ref.current.rotation.z += speed * 0.2;
      
  //     const obj = target.current;
  //   // World rotation
  //     const worldQuat = new THREE.Quaternion();
  //     obj.getWorldQuaternion(worldQuat);
  //     const worldEuler = new THREE.Euler().setFromQuaternion(worldQuat);
  //     rotation.current = worldEuler

  //   }})

// useHelper(light, SpotLightHelper, "cyan")
  return (<>
  {/* changing initial */}
      <ambientLight intensity={0.1} />
      <spotLight ref={light} position={[-20, 0, -15]} target={target.current} penumbra={3} angle={10} decay={0} intensity={1.4} />
      <Suspense fallback={<Loader/>}>
        <Iphone textLeave={textLeave} textEnter={textEnter} setloading={setIsLoading} rotation={rotation} start={start} ref={target} login={login} setAuth={setAuth} setuserR={setuserR}/>
      </Suspense>
      </>
  )
}

