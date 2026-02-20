import { motion, useAnimation, useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

const Tbreveal = ({children ,classes ,delay,duration,y}) => {
  let ref = useRef(null);
  let isInView = useInView(ref,{once:true})
  const maincontrols = useAnimation()
  useEffect(()=>{
    if(isInView){
      maincontrols.start('visible')
    }
  },[isInView])
  return (
    <motion.div className={classes + 'w-full'} ref={ref} variants={{init:{opacity:0,y: y ? y :70},visible:{opacity:1,y:0}}} transition={{delay: delay ? delay : 0, duration: duration? duration : 0.3}} initial={'init'} animate={maincontrols}>{children}</motion.div>
  )
}

export default Tbreveal