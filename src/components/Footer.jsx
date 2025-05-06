import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
  const [showSocial, setShowSocial] = useState(false);

  const toggleSocial = (e) => {
    e.preventDefault();
    setShowSocial(!showSocial);
  };

  return (
    <footer className="py-10 border-t relative">
      <div className="container max-w-full px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo />

          <p>© 2025 NEXLETTER. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-4 md:mt-0 justify-center">
            <div className="relative">
              <AnimatePresence>
                {showSocial && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 bottom-full mb-2 w-48 bg-background rounded-lg shadow-lg border border-border z-50 p-3"
                    style={{ 
                      transformOrigin: 'bottom right',
                      boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -8px 10px -6px rgba(0, 0, 0, 0.1)' 
                    }}
                  >
                    <div className="text-sm font-medium mb-2 text-foreground">Connect with us:</div>
                    <div className="space-y-2">
                      <a 
                        href="https://www.linkedin.com/in/ankushshharma/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary transition-colors"
                      >
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
                          className="text-blue-600 dark:text-blue-400"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                          <rect width="4" height="12" x="2" y="9"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                      <a 
                        href="https://www.Instagram.com/ankushshharma/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary transition-colors"
                      >
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
                          className="text-pink-600 dark:text-pink-400"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                        <span>Instagram</span>
                      </a>
                    </div>
                    <motion.div 
                      className="absolute bottom-[-8px] right-[10px] w-4 h-4 bg-background rotate-45 border-r border-b border-border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1, delay: 0.1 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <a 
                href="#" 
                className={`hover:text-foreground transition-colors ${showSocial ? 'text-primary font-medium' : ''}`}
                onClick={toggleSocial}
                aria-expanded={showSocial}
              >
                Contact
                <motion.span
                  initial={false}
                  animate={{ rotate: showSocial ? 180 : 0 }}
                  className="inline-block ml-1"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="inline-block"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </motion.span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
