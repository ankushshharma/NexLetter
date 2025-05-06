// src/components/JobForm.js
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { motion, AnimatePresence } from "framer-motion";

export default function JobForm({ formData, handleChange, handleContentTypeChange, handleSubmit, isLoading }) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
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
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
            Job Details
          </CardTitle>
          <CardDescription>
            Fill in the information about the position you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <label htmlFor="position" className="text-sm font-medium flex items-center">
                <span>Position</span>
                <span className="text-destructive ml-1">*</span>
              </label>
              <Input
                id="position"
                name="position"
                placeholder="e.g. Frontend Developer"
                value={formData.position}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <label htmlFor="company" className="text-sm font-medium flex items-center">
                <span>Company Name</span>
                <span className="text-destructive ml-1">*</span>
              </label>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Acme Inc."
                value={formData.company}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <label htmlFor="url" className="text-sm font-medium">
                Job URL
              </label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="e.g. https://jobs.example.com/frontend-developer"
                value={formData.url}
                onChange={handleChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <label htmlFor="description" className="text-sm font-medium flex items-center">
                <span>Job Description</span>
                <span className="text-destructive ml-1">*</span>
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Paste the job description here..."
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <label className="text-sm font-medium">Content Type</label>
              <div className="grid grid-cols-3 gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant={formData.contentType === "linkedinMessage" ? "default" : "outline"}
                    onClick={() => handleContentTypeChange("linkedinMessage")}
                    className="w-full transition-all duration-200"
                  >
                    LinkedIn
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant={formData.contentType === "email" ? "default" : "outline"}
                    onClick={() => handleContentTypeChange("email")}
                    className="w-full transition-all duration-200"
                  >
                    Email
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant={formData.contentType === "coverLetter" ? "default" : "outline"}
                    onClick={() => handleContentTypeChange("coverLetter")}
                    className="w-full transition-all duration-200"
                  >
                    Cover Letter
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              className="pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full transition-all duration-300 relative"
                disabled={isLoading}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
                      <svg 
                        className="animate-spin h-5 w-5 mr-2" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Generating...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center"
                    >
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
                        className="mr-2"
                      >
                        <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"></path>
                        <path d="M8 9h8"></path>
                        <path d="M8 15h8"></path>
                        <path d="M2 16.5h6"></path>
                        <path d="M16 16.5h6"></path>
                      </svg>
                      <span>Generate Drafts</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}