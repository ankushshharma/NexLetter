// src/components/MobileMenu.js
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function MobileMenu({ scrollToForm, onClose }) {
  const handleNavClick = (action) => {
    onClose();
    if (action) action();
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm pt-16 px-4">
      <div className="flex flex-col items-center gap-6 py-8">
        <a 
          href="#features" 
          className="text-lg font-medium py-2"
          onClick={() => handleNavClick()}
        >
          Features
        </a>
        <a 
          href="#workflow" 
          className="text-lg font-medium py-2"
          onClick={() => handleNavClick()}
        >
          How It Works
        </a>
        <Button 
          onClick={() => handleNavClick(scrollToForm)} 
          variant="default"
          size="lg"
          className="w-full mt-4"
        >
          Get Started
        </Button>
        <Button 
          onClick={onClose} 
          variant="ghost"
          className="absolute top-4 right-4"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
