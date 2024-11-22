import { motion } from "framer-motion";
import React, { useState } from "react";

interface ContactItemProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ text, icon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Glitch effect variant for hover state
  const glitchVariants = {
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const textGlitchVariant = {
    hover: {
      x: [0, -1, 1, -1, 1, 0],
      y: [0, 1, -1, 1, -1, 0],
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div
      className="relative pr-6 mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={onClick}
        className="relative group flex items-center gap-3"
        whileHover={{ x: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          variants={glitchVariants}
          animate={isHovered ? "hover" : "initial"}
          className="relative"
        >
          <span
            className="relative inline-block text-sm tracking-[0.2em] font-light text-gray-500 group-hover:text-gray-300 transition-colors duration-200"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {text}
            {isHovered && (
              <>
                <motion.span
                  variants={textGlitchVariant}
                  className="absolute inset-0 text-blue-500 opacity-50"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {text}
                </motion.span>
                <motion.span
                  variants={textGlitchVariant}
                  className="absolute inset-0 text-blue-300 opacity-50"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {text}
                </motion.span>
              </>
            )}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="absolute right-[-2rem] top-1/2 -translate-y-1/2 text-blue-400"
        >
          {icon}
        </motion.div>
      </motion.button>

      {/* Optional: Add hover indicator line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-blue-400 origin-left"
      />
    </div>
  );
};

export default ContactItem;
