import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import sirahLogo from "@/assets/sirah-digital-logo.jpg";

export const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen relative overflow-hidden">
      {/* Logo in top left */}
      <div className="absolute top-3 left-4 z-20">
        <img src={sirahLogo} alt="Sirah Digital" className="h-10 sm:h-14 w-auto" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center justify-center min-h-screen text-center pt-12 pb-16">
        <span className="animate-fade-up inline-block mb-6 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30">
          Free 60-Page AI Playbook
        </span>

        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight max-w-5xl text-balance">
          Practical AI Playbook for Business Owners Scaling in 2026
        </h1>

        <p className="animate-fade-up-delay-2 mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl text-balance">
          A step-by-step guide for entrepreneurs doing ₹5–15 Lakhs per month to scale using AI, without hiring more people or increasing stress.
        </p>

        <div className="animate-fade-up-delay-3 mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild variant="cta" size="xl">
            <Link to="/get-playbook">
              <Download className="w-5 h-5 mr-2" />
              Get it Now
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="xl"
            className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => document.getElementById("qualification")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
