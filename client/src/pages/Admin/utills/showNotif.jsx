import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SideNotification = ({ message, type = "info", duration = 3000 ,setState}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() =>  {
        setState([false,'',''])
        setVisible(false)}, duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const bgColor = {
        info: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
    }[type];

    return (
        <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-5 right-5 z-[100] p-4 rounded-lg shadow-lg text-white flex items-center gap-3 ${bgColor}`}
    >
        <span>{message}</span>
        <button
            onClick={() => {
                setState([false,'','']);
                setVisible(false);
            }}
            className="ml-auto"
        >
            {/* Close icon (SVG instead of Lucide) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
            >
                <path
                    fillRule="evenodd"
                    d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 011.415 1.414L13.414 10.586l4.361 4.362a1 1 0 01-1.415 1.414L12 12l-4.361 4.362a1 1 0 01-1.414-1.414l4.361-4.362-4.361-4.361a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    </motion.div>
    
    );
};

export default SideNotification;
