import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsDisplay({ 
  isLoading, 
  drafts, 
  contentType = "linkedinMessage",
  copyToClipboard, 
  handleSave 
}) {
  const [activeTab, setActiveTab] = useState(contentType);

  // Update active tab when contentType prop changes
  useEffect(() => {
    if (contentType) {
      setActiveTab(contentType);
    }
  }, [contentType]);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  // Helper components for document sections
  const DocumentSection = ({ title, content, icon, onCopy }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <h3 className="font-medium text-lg mb-3 flex items-center">
        {icon}
        {title}
      </h3>
      <div className="bg-secondary/10 p-4 rounded-md whitespace-pre-line text-sm border border-border/50 overflow-auto max-h-[280px] shadow-sm transition-all duration-200 hover:shadow-md">
        {content}
      </div>
      <motion.div 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="mt-4"
      >
        <Button 
          variant="outline" 
          onClick={() => onCopy(content)}
          className="w-full transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy to Clipboard
        </Button>
      </motion.div>
    </motion.div>
  );

  // Icons for each document type
  const icons = {
    linkedin: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-2 text-primary"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    email: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-2 text-primary"
      >
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
    coverLetter: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-2 text-primary"
      >
        <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
        <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
        <path d="M4 12h16"></path>
        <path d="M9 12v6"></path>
        <path d="M15 12v6"></path>
      </svg>
    )
  };

  return (
    <Card className="border shadow-lg transition-all duration-300 hover:shadow-xl h-full">
      <CardHeader className="bg-secondary/5 border-b border-border/50">
        <CardTitle className="flex items-center">
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
            className="mr-2 text-primary"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path>
            <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path>
          </svg>
          Generated Documents
        </CardTitle>
        <CardDescription>
          Your professional documents will appear here
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-t-4 border-primary/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                <div className="absolute inset-6 rounded-full border-t-4 border-primary/20 animate-spin" style={{ animationDuration: '2s' }}></div>
              </div>
              <p className="mt-6 text-muted-foreground animate-pulse">Generating your documents...</p>
            </motion.div>
          ) : drafts ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger 
                    value="linkedinMessage"
                    className="transition-all duration-200 data-[state=active]:shadow-sm relative overflow-hidden"
                  >
                    <span className="relative z-10">LinkedIn</span>
                    {activeTab === "linkedinMessage" && (
                      <motion.div 
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                      />
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="email"
                    className="transition-all duration-200 data-[state=active]:shadow-sm relative overflow-hidden"
                  >
                    <span className="relative z-10">Email</span>
                    {activeTab === "email" && (
                      <motion.div 
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                      />
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="coverLetter"
                    className="transition-all duration-200 data-[state=active]:shadow-sm relative overflow-hidden"
                  >
                    <span className="relative z-10">Cover Letter</span>
                    {activeTab === "coverLetter" && (
                      <motion.div 
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                      />
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  <TabsContent value="linkedinMessage" className="space-y-4 relative mt-0">
                    <DocumentSection 
                      title="LinkedIn Referral Message"
                      content={drafts.linkedinMessage}
                      icon={icons.linkedin}
                      onCopy={copyToClipboard}
                    />
                  </TabsContent>
                  
                  <TabsContent value="email" className="space-y-4 relative mt-0">
                    <DocumentSection 
                      title="Referral Email"
                      content={drafts.email}
                      icon={icons.email}
                      onCopy={copyToClipboard}
                    />
                  </TabsContent>
                  
                  <TabsContent value="coverLetter" className="space-y-4 relative mt-0">
                    <DocumentSection 
                      title="Cover Letter"
                      content={drafts.coverLetter}
                      icon={icons.coverLetter}
                      onCopy={copyToClipboard}
                    />
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              <div className="mb-4 relative">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-muted-foreground"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
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
                    className="text-primary"
                  >
                    <path d="M12 2v8"></path>
                    <path d="m16 6-4-4-4 4"></path>
                    <path d="M8 16H6a2 2 0 0 1-2-2v-4"></path>
                    <path d="M16 16h2a2 2 0 0 0 2-2v-4"></path>
                    <path d="M22 22H2"></path>
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-lg font-medium mb-2">No documents generated yet</h3>
              <p className="text-muted-foreground max-w-md">
                Fill out the form and click "Generate Drafts" to create professional documents for your job application.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      {drafts && (
        <CardFooter className="border-t bg-secondary/5 pt-4">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button 
              onClick={handleSave} 
              variant="outline"
              className="w-full transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Documents
            </Button>
          </motion.div>
        </CardFooter>
      )}
    </Card>
  );
}
