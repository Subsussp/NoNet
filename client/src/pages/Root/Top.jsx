import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const Top = ({darkmode,textLeave,textEnter}) =>{ 
    const [allow, setallow] = useState(false);
    const [smallsizw, setsmallsizw] = useState(false);
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
                <p className="main-title cursor-pointer" color='white' onMouseEnter={()=>{
                  setallow(true)
                  textEnter()}} onMouseLeave={()=>{
                  setallow(false)
                  textLeave()}}>Get it for free</p>
                <p className="main-title1 cursor-pointer" color='white' onMouseEnter={()=>{
                  setallow(true)                  
                  textEnter()}} onMouseLeave={()=>{
                  setallow(false)
                  textLeave()}}>Order Now</p>
        </Link>
      </div>
}
export default Top