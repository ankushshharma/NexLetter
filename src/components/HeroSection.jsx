// src/components/HeroSection.js
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function HeroSection({ scrollToForm }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayHeadline, setDisplayHeadline] = useState("");
  const [displaySubtitle, setDisplaySubtitle] = useState("");
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);
  
  const fullHeadlineText = "Simplify Your Job Application Process!";
  const fullSubtitleText = "Draft referral requests, emails, and cover letters effortlessly with AI-power.";
  
  const controls = useAnimation();

  // Start animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
    
    const animateText = async () => {
      await controls.start("visible");
      
      // Animate headline first
      let currentText = "";
      for (let i = 0; i <= fullHeadlineText.length; i++) {
        currentText = fullHeadlineText.substring(0, i);
        setDisplayHeadline(currentText);
        // Add small random delay for more natural typing effect
        await new Promise(resolve => setTimeout(resolve, 40 + Math.random() * 30));
      }
      setHeadlineComplete(true);
      
      // Short pause before starting subtitle
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Then animate subtitle
      currentText = "";
      for (let i = 0; i <= fullSubtitleText.length; i++) {
        currentText = fullSubtitleText.substring(0, i);
        setDisplaySubtitle(currentText);
        // Slightly faster typing for subtitle
        await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 20));
      }
      setSubtitleComplete(true);
    };
    
    animateText();
  }, [controls, fullHeadlineText, fullSubtitleText]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const backgroundElementVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
      },
    },
  };

  // Blinking cursor animation
  const cursorVariants = {
    blink: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  // Only show the button after both text animations are complete
  const showButton = headlineComplete && subtitleComplete;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/10 dark:via-background dark:to-secondary/5 animate-gradient"
      ></motion.div>

      {/* Animated Background Elements */}
      <motion.div
        variants={backgroundElementVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
      ></motion.div>
      
      <motion.div
        variants={backgroundElementVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-delay"
      ></motion.div>

      <motion.div
        className="container max-w-full relative z-10 flex flex-col items-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Headline with typing animation - fluid typography */}
        <motion.h1
          className="font-bold tracking-tight mb-6 w-full overflow-hidden"
          variants={itemVariants}
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3.75rem)", // Fluid typography using clamp
            lineHeight: 1.2,
          }}
        >
          <div className="relative whitespace-nowrap overflow-hidden text-ellipsis mx-auto">
            {displayHeadline}
            
            {/* Blinking cursor */}
            {!headlineComplete && (
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block ml-1 w-[3px] h-[1em] bg-current align-middle"
              ></motion.span>
            )}
          </div>
        </motion.h1>
        
        {/* Subtitle with typing animation - fluid typography */}
        <motion.p
          className="text-muted-foreground mb-8 w-full overflow-hidden"
          variants={itemVariants}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)", // Fluid typography using clamp
            lineHeight: 1.4,
            opacity: headlineComplete ? 1 : 0.3, // Fade in after headline is complete
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="relative whitespace-nowrap overflow-hidden text-ellipsis mx-auto max-w-4xl">
            {displaySubtitle}
            
            {/* Blinking cursor */}
            {headlineComplete && !subtitleComplete && (
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block ml-1 w-[2px] h-[1em] bg-current align-middle"
              ></motion.span>
            )}
          </div>
        </motion.p>
        
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={showButton ? "visible" : "hidden"}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            size="lg" 
            onClick={scrollToForm} 
            className="text-md px-6 sm:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
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
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Button>
        </motion.div>
        
        <motion.p
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Your All-in-One Job Application Assistant
        </motion.p>
      </motion.div>
    </section>
  );
}
