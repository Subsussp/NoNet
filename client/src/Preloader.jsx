// Preloader.jsx
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

const images = [
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/1_p_jvlcoj.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/2_p_cm2c23.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/3_p_nwwwyl.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/4_p_if5kus.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/5_p_l8liio.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/6_p_hgnrbu.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/7_p_xu6xfl.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/1_mzvey1.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/19_mrvvco.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/4_p6ehsj.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/11_pqrr1b.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/8_p_geaiaj.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/9_p_jpsgb6.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/10_p_a5gl2y.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/11_p_rumhqx.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/12_p_gdgink.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/8_jwl5sz.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/14_ywwacy.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/2_behoqk.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/10_hlo4lc.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/9_wkdx5z.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/7_cclfhe.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651109/17_y4kgzx.png",
  "https://res.cloudinary.com/dv1xhfwqd/image/upload/f_auto,q_auto/v1772651121/18_isb9w0.png",
]
const Preloader = ({ onExit, done ,delay = 120,opacityDe = 2.2}) => {
  const preloaderRef = useRef();
  const loaderRef = useRef();
  const loadedImagesRef = useRef([]);
  let [index,setIndex] = useState(0)
  useEffect(() => {
    images.forEach((src,i) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
      img.onload = () => {
        loadedImagesRef.current[i] = img;
      };
    });
    gsap.set(preloaderRef.current, { opacity: 1, yPercent: 0 });
  }, []);

  useEffect(()=>{
    if (index > images.length - 1) return setIndex(0);
    let tl = gsap.timeline();
    let handler = setTimeout(()=>{

      tl.to(loaderRef.current,{
        opacity: 0,
        duration: .06,  
        ease: "power3.in",
      }).to(loaderRef.current,{
        opacity: 1,
        duration: .10,  
        ease: "power3.out",
      })
      setIndex(prev=> prev + 1)
    },delay)
    return () => clearTimeout(handler)
  },[index])
  useEffect(() => {
    if (done) {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        yPercent: 0, 
        duration: opacityDe,  
        ease: "power3.in",
        onComplete: onExit,
      });
    }
  }, [done]);

  return (
    <div
      ref={preloaderRef}
      className="preloader-overlay-wrapper z-[9999999] pointer-events-none select-none"
      style={{ willChange: "opacity, transform,content" ,}}
    >
      <div className="fixed inset-0 flex items-center z-[9999999] justify-center opacity-100 transition-opacity duration-[1500ms] ease-out w-screen h-dvh">
 {images[index] && <img       
    style={{"mix-blend-mode":"screen", willChange: "opacity, transform,content" }}
    ref={loaderRef}
    src={loadedImagesRef.current[index]?.src || images[index]}
    alt={`Loading icon ${index}`}
    className="w-[140px] object-contain opacity-100 z-50"
  />}
</div>
      {/* <div className="preloader-overlay-content">
        <h1 className="preloader-text">Processing...</h1>
      </div> */}
    </div>
  );
};

export default Preloader;