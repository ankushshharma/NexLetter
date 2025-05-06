// src/components/GeneratorSection.js

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobForm from "./JobForm";
import ResultsDisplay from "./ResultsDisplay";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Main Generator Section Component
export default function GeneratorSection({ formRef, showNotification }) {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    url: "",
    description: "",
    contentType: "linkedinMessage"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [drafts, setDrafts] = useState(null);
  const [activeTab, setActiveTab] = useState("linkedinMessage");

  useEffect(() => {
    if (formData.contentType) {
      setActiveTab(formData.contentType);
    }
  }, [formData.contentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentTypeChange = (contentType) => {
    setFormData((prev) => ({ ...prev, contentType }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock response data
        const mockDrafts = {
          linkedinMessage: `Hi [Connection],\n\nI noticed that ${formData.company} is hiring for a ${formData.position} role, and I'm very interested. Given my background in [relevant experience], I believe I'd be a great fit.\n\nWould you be willing to refer me for this position? I'd be happy to share more details about my qualifications.\n\nThanks for considering!\n[Your Name]`,
          
          email: `Subject: Referral Request for ${formData.position} Position at ${formData.company}\n\nDear [Name],\n\nI hope this email finds you well. I recently came across the ${formData.position} opening at ${formData.company} and I'm very interested in applying.\n\nGiven your experience at the company, I was wondering if you would be willing to refer me for this position. I believe my background in [relevant skills/experience] aligns well with what they're looking for.\n\nI've attached my resume for your reference. Please let me know if you need any additional information.\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]`,
          
          coverLetter: `Dear Hiring Manager,\n\nI am writing to express my interest in the ${formData.position} position at ${formData.company}. With my background in [relevant skills/experience], I am confident in my ability to make a significant contribution to your team.\n\n[Paragraph about your relevant experience and how it aligns with the job requirements]\n\n[Paragraph about why you're interested in the company specifically]\n\nThank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with your needs.\n\nSincerely,\n[Your Name]`
        };
        
        setDrafts(mockDrafts);
        showNotification("success", "Documents generated successfully!");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating content:', error);
      showNotification("error", "Failed to generate content. Please try again.");
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification("success", "Copied to clipboard!");
  };

  const handleSave = () => {
    // Simulate saving data
    showNotification("success", "Your documents have been saved successfully!");
  };

  return (
    <motion.section 
      ref={formRef} 
      className="py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-6xl px-4 mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/70">
            Generate Your Documents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your job details below and let our AI generate tailored drafts for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Form Card */}
          <JobForm 
            formData={formData}
            handleChange={handleChange}
            handleContentTypeChange={handleContentTypeChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {/* Results Display Card */}
          <ResultsDisplay 
            isLoading={isLoading}
            drafts={drafts}
            contentType={activeTab}
            setActiveTab={setActiveTab}
            copyToClipboard={copyToClipboard}
            handleSave={handleSave}
          />
        </div>
      </div>
    </motion.section>
  );
}