import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export default function Header({ scrollToForm }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const menuButtonVariants = {
    closed: {
      rotate: 0,
      transition: { duration: 0.2 }
    },
    open: {
      rotate: 90,
      transition: { duration: 0.2 }
    }
  };

  // Animation for each line in the hamburger icon
  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  };
  
  const line2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  
  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  };

  return (
    <motion.header
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={headerVariants}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container max-w-full px-4 flex h-16 items-center justify-between">
        <motion.div variants={itemVariants}>
          <Logo />
        </motion.div>
        
        <motion.nav
          variants={itemVariants}
          className="hidden md:flex items-center gap-6"
        >
          <motion.a
            variants={itemVariants}
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.a>
          
          <motion.a
            variants={itemVariants}
            href="#workflow"
            className="text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            How It Works
          </motion.a>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={scrollToForm} variant="default">
              Get Started
            </Button>
          </motion.div>
        </motion.nav>
        
        {/* Mobile menu button */}
        <motion.div

          className="md:hidden"
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={menuButtonVariants}
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.line
                variants={line1Variants}
                x1="3" y1="6" x2="21" y2="6"
              />
              <motion.line
                variants={line2Variants}
                x1="3" y1="12" x2="21" y2="12"
              />
              <motion.line
                variants={line3Variants}
                x1="3" y1="18" x2="21" y2="18"
              />
            </svg>
          </Button>
        </motion.div>
      </div>
      
      {/* Mobile menu dropdown with AnimatePresence for smooth enter/exit */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            <MobileMenu scrollToForm={scrollToForm} onClose={toggleMobileMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
