import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export const StickyBottomCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 100px
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up border-t border-primary-foreground/10 bg-primary/95 backdrop-blur-md shadow-lg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-primary-foreground">
            Ready to scale your business?
          </p>
          <p className="text-xs text-primary-foreground/80">
            Get the free 60-page AI Playbook now.
          </p>
        </div>
        <div className="block sm:hidden">
          <p className="text-sm font-medium text-primary-foreground line-clamp-1">
            Get the free AI Playbook
          </p>
        </div>

        <Button asChild variant="cta" size="lg" className="shadow-none shrink-0">
          <a href="#form">
            <Download className="w-4 h-4 mr-2" />
            Get it Now
          </a>
        </Button>
      </div>
    </div>
  );
};
