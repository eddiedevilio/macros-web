
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 ${isMobile ? 'left-4' : 'right-4'} z-50`}
        >
          <Button
            size="icon"
            variant="secondary"
            onClick={scrollToTop}
            className="rounded-full w-12 h-12 bg-ocean/80 hover:bg-ocean shadow-lg hover:scale-110 transition-all duration-300"
          >
            <ArrowUp className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
