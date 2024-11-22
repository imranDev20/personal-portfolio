import React from "react";
import { motion } from "framer-motion";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  // Line variants for the animation
  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      backgroundColor: "rgb(156 163 175)", // gray-400
    },
    open: {
      rotate: 45,
      y: 9,
      backgroundColor: "rgb(96 165 250)", // blue-400
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      x: 0,
      backgroundColor: "rgb(156 163 175)", // gray-400
    },
    open: {
      opacity: 0,
      x: -20,
      backgroundColor: "rgb(96 165 250)", // blue-400
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      backgroundColor: "rgb(156 163 175)", // gray-400
    },
    open: {
      rotate: -45,
      y: -9,
      backgroundColor: "rgb(96 165 250)", // blue-400
    },
  };

  return (
    <motion.button
      className="relative w-10 h-10 rounded-lg flex items-center justify-center group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      {/* Background highlight on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors"
        initial={false}
        animate={isOpen ? { background: "rgba(37, 99, 235, 0.1)" } : {}}
      />

      {/* Container for the hamburger lines */}
      <div className="relative w-6 h-5">
        {/* Top line */}
        <motion.span
          className="absolute left-0 top-0 w-full h-[2px] rounded-full"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={topLineVariants}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Middle line */}
        <motion.span
          className="absolute left-0 top-[9px] w-full h-[2px] rounded-full"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={middleLineVariants}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Bottom line */}
        <motion.span
          className="absolute left-0 bottom-0 w-full h-[2px] rounded-full"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={bottomLineVariants}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Optional: Glow effect when open */}
      {isOpen && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default HamburgerMenu;
