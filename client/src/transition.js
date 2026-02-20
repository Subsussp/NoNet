import { motion } from "framer-motion";
import React from "react";

const transition = (ChildComp) => {
  const Wrapped = (props) => {
    return (
      <>
        <ChildComp {...props} />

        {/* Slide In (covers screen when leaving) */}
        <motion.div
          className="slide-in"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#111",
            transformOrigin: "top",
            zIndex: 9999
          }}
        />

        {/* Slide Out (covers screen before entering) */}
        <motion.div
          className="slide-out"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#111",
            transformOrigin: "bottom",
            zIndex: 9999
          }}
        />
      </>
    );
  };

  return Wrapped;
};

export default transition;