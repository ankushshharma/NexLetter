import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection({ scrollToForm }) {
  // Refs for scroll animations
  const sectionRef = useRef(null);
  
  // Check if section is in view
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Animation controls
  const controls = useAnimation();
  
  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  // Background shapes animation variants
  const shapeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-primary/5 dark:bg-primary/10 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-16 right-16 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={shapeVariants}
        style={{ zIndex: 1 }}
      />
      
      <motion.div
        className="absolute bottom-10 left-20 w-40 h-40 rounded-full bg-secondary/10 dark:bg-secondary/20"
        initial="hidden"
        variants={shapeVariants}
        animate={{
          y: ["-5%", "5%"],
          transition: {
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }}
        style={{ zIndex: 1 }}
      />
      
      <motion.div
        className="absolute top-1/3 -left-10 w-32 h-32 rounded-full bg-accent/10 dark:bg-accent/20"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={shapeVariants}
        style={{ zIndex: 1 }}
      />

      <motion.div
        className="container max-w-full text-center px-4 relative z-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-6"
          variants={itemVariants}
        >
          Ready to Simplify Your Job Applications?
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg"
          variants={itemVariants}
        >
          Start using our AI-powered NEXLETTER today and save hours on your job application process.
        </motion.p>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="inline-block" // Added to contain the button properly
        >
          <Button 
            size="lg" 
            onClick={scrollToForm} 
            className="text-md px-8 py-6 shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-white font-bold rounded-lg border-0 outline-none"
          >
            <span className="mr-2">Start Now – It's Free!</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20" 
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                position: "relative",
                top: "0px", // Align properly
                display: "inline-block",
                verticalAlign: "middle"
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Button>
        </motion.div>
        
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-sm text-muted-foreground/80">
            No credit card required • Instant access
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
