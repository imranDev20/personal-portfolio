import React from "react";
import { motion } from "framer-motion";

interface LogoButtonProps {
  currentSection: string;
  onClick: () => void;
}

const LogoButton: React.FC<LogoButtonProps> = ({ currentSection, onClick }) => {
  // Animation variants for glow effect
  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1.2, opacity: 1 },
    animateLarge: { scale: 1.4, opacity: 1 },
  };

  // Rotation variants for borders
  const rotationVariants = {
    intro: { rotate: 180 },
    default: { rotate: 0 },
  };

  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="relative">
        <motion.div
          className={`w-[42px] h-[42px] relative flex items-center justify-center
            ${currentSection === "intro" ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}
            transition-colors duration-300`}
        >
          {/* Outer border */}
          <motion.div
            className={`absolute inset-0 border-2 rounded-lg
              ${currentSection === "intro" ? "border-blue-400" : "border-gray-500 group-hover:border-gray-300"}
              transition-colors duration-300`}
            animate={currentSection === "intro" ? "intro" : "default"}
            variants={rotationVariants}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />

          {/* Inner border */}
          <motion.div
            className={`absolute inset-[6px] border-[1.5px] rounded-md
              ${currentSection === "intro" ? "border-blue-400" : "border-gray-500 group-hover:border-gray-300"}
              transition-colors duration-300`}
            animate={currentSection === "intro" ? "intro" : "default"}
            variants={{
              intro: { rotate: -180 },
              default: { rotate: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />

          {/* Logo text */}
          <span
            className={`text-lg font-bold relative z-10 
              ${currentSection === "intro" ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}
              transition-colors duration-300`}
          >
            I
          </span>
        </motion.div>

        {/* Glow effects */}
        {currentSection === "intro" && (
          <>
            <motion.div
              className="absolute inset-0 bg-blue-400/10 blur-md rounded-lg"
              initial="initial"
              animate="animate"
              variants={glowVariants}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-blue-400/5 blur-xl rounded-lg"
              initial="initial"
              animate="animateLarge"
              variants={glowVariants}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.2,
              }}
            />
          </>
        )}
      </div>
    </motion.button>
  );
};

export default LogoButton;
