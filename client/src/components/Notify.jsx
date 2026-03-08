import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);
export const Notify = ({onRemove, text,textEnter,textLeave}) => {
  let cont = useRef()
  let child = useRef()
  useEffect(()=>{
    if(cont.current && child.current){
      let tl = gsap.timeline()
      tl.from(cont.current,{
          scaleX: 0,
          transformOrigin: "center",
          ease: CustomEase.create("custom", "M0,0 C0.409,0 0,1 1,1 "),
          duration: 0.9,
          onReverseComplete:onRemove
      }).fromTo(cont.current.children,{
        opacity:0,        
      },
      {
        duration: .3,
        opacity:1,        
      })
      let handler = setTimeout(() => {
        tl.reverse();
      }, 3000);
      return () => handler
    }
  },[cont])
  return (
    <div ref={cont} className='fixed py-2 opacity-1 select-none w-max px-[24px] md:px-[60px] roun backdrop-blur-[20px] backdrop-saturate-[180%] rounded-[10px] top-[2%] left-[50%] translate-x-[-50%] items-center flex justify-center z-[500]'>
      <div onMouseEnter={textEnter} onMouseLeave={textLeave} ref={child} className='notify md:text-[32px] sm:text-[30px] text-[18px] opacity-1'> 
        {!text ? "Added to cart. View your cart to checkout." : text}
      </div></div>
  )
}
