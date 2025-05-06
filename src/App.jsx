// src/App.jsx
import { useState, useRef } from "react";
import { ThemeProvider } from "@/components/theme-provider";

// Import all our components
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WorkflowSection from "@/components/WorkflowSection";
import CTASection from "@/components/CTASection";
import GeneratorSection from "@/components/GeneratorSection";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";

export default function App() {
  const [notification, setNotification] = useState(null);
  const formRef = useRef(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="nexletter-theme">
      <div className="min-h-screen bg-background text-foreground">
        {/* Notification */}
        {notification && (
          <Notification 
            type={notification.type} 
            message={notification.message} 
          />
        )}
        
        <Header scrollToForm={scrollToForm} />

        <main>
          <HeroSection scrollToForm={scrollToForm} />
          <FeaturesSection />
          <WorkflowSection />
          <CTASection scrollToForm={scrollToForm} />
          <GeneratorSection 
            formRef={formRef} 
            showNotification={showNotification} 
          />
        </main>

        <Footer />

        <style jsx global>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes float-delay {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          .animate-gradient {
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delay {
            animation: float-delay 7s ease-in-out infinite;
            animation-delay: 2s;
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}