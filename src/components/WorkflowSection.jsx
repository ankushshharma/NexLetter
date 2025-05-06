import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function WorkflowSection() {
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Check if elements are in view
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });
  
  // Animation controls
  const headingControls = useAnimation();
  const timelineControls = useAnimation();
  
  // Start animations when elements come into view
  useEffect(() => {
    if (isHeadingInView) {
      headingControls.start("visible");
    }
    
    if (isTimelineInView) {
      timelineControls.start("visible");
    }
  }, [isHeadingInView, isTimelineInView, headingControls, timelineControls]);

  const steps = [
    {
      number: 1,
      title: "Enter Job Details",
      description: "Fill in the position, company name, job URL, and description in our simple form."
    },
    {
      number: 2,
      title: "AI Generates Drafts",
      description: "Our AI processes your inputs and creates tailored, professional drafts in seconds."
    },
    {
      number: 3,
      title: "Review and Use",
      description: "Review the generated drafts and copy them with a single click to use wherever needed."
    }
  ];

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const stepsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.9,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Number counter animation component
  const CounterAnimation = ({ target, step }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    
    useEffect(() => {
      if (isTimelineInView && !hasStarted) {
        setHasStarted(true);
        let startTime;
        let animationFrame;
        
        const step = 0.05; // 50ms
        const duration = 1.5; // 1.5 seconds
        
        const animateCount = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * target));
          
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animateCount);
          }
        };
        
        animationFrame = requestAnimationFrame(animateCount);
        
        return () => cancelAnimationFrame(animationFrame);
      }
    }, [isTimelineInView, target, hasStarted]);
    
    return <span>{count}</span>;
  };

  return (
    <section id="workflow" className="py-16 md:py-24 overflow-hidden" ref={sectionRef}>
      <div className="container max-w-full px-4">
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
          initial="hidden"
          animate={headingControls}
          variants={headingVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={textVariants}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={textVariants}
          >
            Follow these simple steps to get started with NEXLETTER
          </motion.p>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline Line - Animated */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block"
            variants={timelineVariants}
            initial="hidden"
            animate={timelineControls}
          ></motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={stepsContainerVariants}
            initial="hidden"
            animate={timelineControls}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center relative z-10"
                variants={stepVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-6 shadow-md"
                  variants={circleVariants}
                  whileHover={{
                    scale: 1.1, 
                    boxShadow: "0 0 0 4px rgba(var(--primary), 0.2)",
                    backgroundColor: "var(--primary-50)",
                    color: "white",
                    transition: { duration: 0.3 }
                  }}
                >
                  <span className="text-xl font-bold text-primary">
                    {isTimelineInView ? <CounterAnimation target={step.number} step={step} /> : 0}
                  </span>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-3"
                  variants={textVariants}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  variants={textVariants}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
