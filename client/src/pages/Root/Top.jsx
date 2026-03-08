import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Top = ({darkmode,textLeave,textEnter,done}) =>{ 
    const [allow, setallow] = useState(false);
    const [smallsizw, setsmallsizw] = useState(false);
    let maintext = useRef()
    let subtext = useRef()
    useEffect(()=>{
      const isReload = sessionStorage.getItem("isReload");

      if(subtext.current && maintext.current && done && isReload == "true"){
      let tl = gsap.timeline()
        tl.from(".char",     
          {
              duration: .95,
              delay:1.2,
              opacity:0,
              stagger:0.07,
              ease: "power2.out",
        },).from(".word",{
          y: 40,
          duration: 1,
          stagger:0.08,
          ease: "power2.out",

        },"<-.3")
      }

      },[done])
   useEffect(() => {
      const handleResize = () => {
        if(window.innerWidth <= 768){
            setsmallsizw(true)
        }else{
            setsmallsizw(false)
        }
      };
      handleResize(); // Run once on mount
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return <div className="product-container">   
       {!smallsizw && <div className="w-[30vw] right-[0%] h-[200px] absolute">
            <img 
            className='photos'
            src='https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Bre_pybupi.png'
            alt="Fullscreen"
            draggable="false"
        />   
    </div>}
       {!smallsizw && <div className="w-[30vw] left-0 h-[200px] absolute">
            <img 
            className='photos'
            src='https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/F_vjtqlb.png'
            alt="Fullscreen"
            draggable="false"
        />  
    </div> }
       {!smallsizw && <div className="w-[40vw] h-[200px] absolute left-[50%] -translate-x-[50%]">
            <img 
            className='photos'
            src='https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Bre_njwomm.jpg'
            alt="Fullscreen"
            draggable="false"
        />   
      </div>}
        <div className="imageB">
            <img 
            className='photos'
            src={darkmode ? 'https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Bre_pybupi.png' : "https://res.cloudinary.com/dydefecdm/image/upload/Brei_jjmkee.webp"}
            alt="Fullscreen"
            draggable="false"
        />   
      </div>
        <div className="imageY">
            <img
            className='photos'
            src={darkmode ? 'https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Brei_srwtmw.png' : ''}
            alt="Fullscreen"
            draggable="false"
        />   
      </div>
        <Link to={`/cart`} draggable={allow} onClick={(e)=>{if(!allow){
          e.preventDefault()
       }}} className='main-div cursor-default select-none'>
                <p ref={maintext} className="main-title cursor-pointer" color='white' onMouseEnter={()=>{
                  setallow(true)
                  textEnter()}} onMouseLeave={()=>{
                  setallow(false)
                  textLeave()}}>
                    {"Get it for free".split(' ').map((char,index)=><span  key={index} className='word inline-block'>
                      <span className='opacity-1 char'>{char}</span>
                      {index !== 3 && "\u00A0"}
                      </span>
                      )}
                    </p>
                <p ref={subtext} className="main-title1 cursor-pointer" color='white' onMouseEnter={()=>{
                  setallow(true)                  
                  textEnter()}} onMouseLeave={()=>{
                  setallow(false)
                  textLeave()}}>
                        {"Order Now".split(' ').map((char,index)=><span  key={index} className='word inline-block'>
                      <span className='opacity-1 char'>{char}</span>
                      {index !== 1 && "\u00A0"}
                      </span>
                      )}
                    </p>
        </Link>
      </div>
}
export default Top