import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shopcontext } from "pages/Root/Shop/Shop";
import DisplayList from "components/Cards/DisplayCard";
import { motion, useScroll, useTransform } from "framer-motion";
import Store from "./Store";
const Userpage = ({refetch,textEnter,textLeave}) => {
  let data = useContext(Shopcontext)  
  let [Catg,setCatgs] = useState([])
  const [smallsize, setsmallsizw] = useState(false);
  let [BestSeller,setBestSeller] = useState([])
  let location = useLocation()
  
  useEffect(() => {
      let scroll;

      (async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;

        scroll = new LocomotiveScroll({
          el: document.body, 
          smooth: true,      
          multiplier: 0.5,  
          lerp: 0.001,   
          tablet: { smooth: true },
          smartphone: { smooth: true },
        });
      })();

      return () => scroll && scroll.destroy();
    }, []);
    useEffect(() => {
        const handleResize = () => {
        if(window.innerWidth <= 768){
          setsmallsizw(true)
        }else{
          setsmallsizw(false)
        }
      };
      handleResize(); 
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        window.localStorage.setItem('ref',location.pathname)
    },[])
    useEffect(()=>{
        if(data){
            let catg = []
            let BestSeller = []
            // a function to order the highest three orderd items and assign to BestSeller 
            data.map((item,i)=>{if(!catg.includes(item.catg) && item.catg){
                catg.push(item.catg)
            }})
            setCatgs(catg)
        }
    },[data])   
    if(!data){
        return <></>
    }
    return (
<>
        {/* frame */}
        <div className={`${smallsize ? 'frame-mb':'frame'} w-full`}>
        <article className="Mid"><Link to={'/store'}><h2>Store</h2></Link></article>
        <Store textEnter={textEnter} textLeave={textLeave} smallsize={smallsize} BestSellerAndMain={true} Catg={!data ? [] : data.map((value)=>value.catg)} />
        </div>
        <article className="info w-full h-[700px] bg-mainele">
            {/* <h1>Contact us</h1> */}
        </article>
    </>
    )
}




const HorizontalScrollCarousel = ({Catg,refetch,smallsize}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <>
    <section ref={targetRef} className="relative h-[250vh] w-full bg-neutral">
      <div className="sticky top-20 w-full flex items-center overflow-hidden ">
        <motion.div style={{ x }} className="flex gap-8 justify-evenly">
        {Catg.map((value,index)=> <DisplayList key={index} smallsize={smallsize} refetch={refetch} Catg={value} limit={1} />)}
        </motion.div>
      </div>
    </section>
    </>);
};

export default Userpage