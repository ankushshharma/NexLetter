import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function FeaturesSection() {
  // Refs for scroll animations
  const headingRef = useRef(null);
  const cardsContainerRef = useRef(null);
  
  // Check if elements are in view
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const isCardsInView = useInView(cardsContainerRef, { once: true, amount: 0.1 });
  
  // Animation controls
  const headingControls = useAnimation();
  const cardsControls = useAnimation();
  
  // Start animations when elements come into view
  useEffect(() => {
    if (isHeadingInView) {
      headingControls.start("visible");
    }
    
    if (isCardsInView) {
      cardsControls.start("visible");
    }
  }, [isHeadingInView, isCardsInView, headingControls, cardsControls]);

  const features = [
    {
      title: "AI-Powered Drafts",
      description: "Generate professional referral messages, emails, and cover letters in seconds using the Gemini API.",
      icon: (
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
          className="text-primary"
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    },
    {
      title: "Customizable Inputs",
      description: "Enter job-specific details to get tailored outputs that match your exact requirements.",
      icon: (
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
          className="text-primary"
        >
          <polygon points="14 2 18 6 7 17 3 17 3 13 14 2" />
          <line x1="3" y1="22" x2="21" y2="22" />
        </svg>
      )
    },
    {
      title: "Save Your Data",
      description: "Keep track of your entries and drafts with secure storage powered by Supabase technology.",
      icon: (
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
          className="text-primary"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    },
    {
      title: "Copy with a Click",
      description: "One-click copy functionality for seamless usage in LinkedIn chats, emails, or job portals.",
      icon: (
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
          className="text-primary"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      )
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

  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.9
      }
    }
  };

  const iconContainerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="features" className="py-2 md:py-24 bg-secondary/20 dark:bg-secondary/5 overflow-hidden">
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
            Why Choose NEXLETTER?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={textVariants}
          >
            Our platform offers everything you need to streamline your job application process
          </motion.p>
        </motion.div>

        <motion.div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={cardsControls}
          variants={cardsContainerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.2 } 
              }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-all h-full">
                <CardHeader className="pb-4">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                    variants={iconContainerVariants}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "var(--primary-20)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Wrap SVG with motion.div for icon animations */}
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={iconVariants}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
