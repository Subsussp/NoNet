import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

const Top = ({darkmode}) =>{ 
    const [scrollY, setScrollY] = useState(0);

    // Handle scroll event to track scroll position
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return <div className="product-container">   
        <div className="w-[30vw] right-[0%] h-[200px] absolute">
            <img 
            className='photos'
            src='https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Bre_pybupi.png'
            alt="Fullscreen"
        />   
    </div>
        <div className="w-[30vw] left-0 h-[200px] absolute">
            <img 
            className='photos'
            src='https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/F_vjtqlb.png'
            alt="Fullscreen"
        />   
    </div>
        <div className="w-[40vw] h-[200px] absolute left-[50%] -translate-x-[50%]">
            <img 
            className='photos'
            src='https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Bre_njwomm.jpg'
            alt="Fullscreen"
        />   
      </div>
        <div className="imageB">
            <img 
            className='photos'
            src={darkmode ? 'https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Bre_pybupi.png' : "https://res.cloudinary.com/dydefecdm/image/upload/Brei_jjmkee.webp"}
            alt="Fullscreen"
        />   
      </div>
        <div className="imageY">
            <img
            className='photos'
            src={darkmode ? 'https://res.cloudinary.com/dydefecdm/image/upload/f_auto,q_auto/Brei_srwtmw.png' : ''}
            alt="Fullscreen"
        />   
      </div>
        <Link to={`/cart`} className='main-div'>
    
                <p className="main-title" color='white'  data-scroll data-scroll-speed="5">Get it for free</p>
                <p className="main-title1" color='white' data-scroll data-scroll-speed="2.4">Order Now</p>
        </Link>
      </div>
}
export default Top