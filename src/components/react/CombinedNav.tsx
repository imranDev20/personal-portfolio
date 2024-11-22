import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import LogoButton from "./LogoButton";
import HamburgerMenu from "./HamburgerMenu";

interface MenuItem {
  id: string;
  label: string;
}

const CombinedNav = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState("intro");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  const email = "imran.kabir022@gmail.com";
  const phone = "+880 1756 681894";
  const whatsappUrl = "https://wa.me/8801756681894";

  const menuItems: MenuItem[] = [
    { id: "about", label: "ABOUT" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "works", label: "WORKS" },
    { id: "contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      const allSections = ["intro", ...menuItems.map((item) => item.id)];

      for (const sectionId of allSections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    const debouncedScroll = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleScroll, 50);
    };

    let timeoutId: number;
    handleScroll();
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Common vertical line component
  const VerticalLine = () => (
    <>
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px]">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute inset-0 blur-sm bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -top-[40px] w-[2px] h-[20px] bg-blue-500/30 rotate-45" />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-[40px] w-[2px] h-[20px] bg-blue-500/30 -rotate-45" />
    </>
  );

  return (
    <>
      {/* Left Navigation */}
      <motion.nav
        className="fixed left-12 top-1/2 -translate-y-1/2 z-50 select-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative flex flex-col items-center">
          <div className="absolute -top-24">
            <LogoButton
              currentSection={currentSection}
              onClick={() => handleClick("intro")}
            />
          </div>

          <VerticalLine />

          <div className="flex flex-col gap-12">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative pl-6">
                  <AnimatePresence>
                    {(hoveredItem === item.id ||
                      currentSection === item.id) && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-blue-400"
                      />
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => handleClick(item.id)}
                    className="relative group"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span
                      className={`relative inline-block text-sm tracking-[0.2em] font-light
                      ${currentSection === item.id ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`}
                      style={
                        {
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        } as React.CSSProperties
                      }
                    >
                      {item.label}
                    </span>
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Right Contact Info */}
      <motion.nav
        className="fixed right-12 top-1/2 -translate-y-1/2 z-50 select-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative flex flex-col items-center">
          <VerticalLine />

          <div className="flex flex-col gap-12">
            <div
              className="relative"
              onMouseEnter={() => setHoveredContact("email")}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <div className="relative pr-6">
                <AnimatePresence>
                  {hoveredContact === "email" && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-blue-400"
                    />
                  )}
                </AnimatePresence>

                <motion.a
                  href={`mailto:${email}`}
                  className="relative group block"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span
                    className="relative inline-block text-sm tracking-[0.2em] font-light text-gray-500 group-hover:text-gray-300"
                    style={
                      {
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      } as React.CSSProperties
                    }
                  >
                    {email}
                  </span>
                </motion.a>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setHoveredContact("phone")}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <div className="relative pr-6">
                <AnimatePresence>
                  {hoveredContact === "phone" && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-4 bg-blue-400"
                    />
                  )}
                </AnimatePresence>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group block"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span
                    className="relative inline-block text-sm tracking-[0.2em] font-light text-gray-500 group-hover:text-gray-300"
                    style={
                      {
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      } as React.CSSProperties
                    }
                  >
                    {phone}
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex justify-between items-center p-4 relative z-[60] bg-gray-900/20 backdrop-blur-sm">
          <LogoButton
            currentSection={currentSection}
            onClick={() => handleClick("intro")}
          />

          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[50]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="relative h-full pt-20 px-6 flex flex-col pointer-events-auto"
              >
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        handleClick(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-4 text-2xl font-light ${
                        currentSection === item.id
                          ? "text-blue-400"
                          : "text-gray-400"
                      }`}
                      whileHover={{ x: 8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                <div className="py-8 space-y-6 border-t border-gray-800/50">
                  <motion.a
                    href={`mailto:${email}`}
                    className="w-full flex items-center justify-between text-gray-400 hover:text-blue-400 py-2"
                    whileHover={{ x: 8 }}
                  >
                    <span className="text-sm">{email}</span>
                  </motion.a>

                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between text-gray-400 hover:text-blue-400 py-2"
                    whileHover={{ x: 8 }}
                  >
                    <span className="text-sm">{phone}</span>
                    <MessageSquare className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CombinedNav;
