import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justify: "center", backgroundColor: "var(--bg-color)" }}>
            <motion.div
                style={{
                    width: "4rem",
                    height: "4rem",
                    border: "4px solid rgba(16, 185, 129, 0.2)",
                    borderTop: "4px solid #10b981",
                    borderRadius: "50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;
