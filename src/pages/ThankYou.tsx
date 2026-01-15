import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary to-primary/90 py-16 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4 max-w-3xl mx-auto">
          Build a Smarter Business for 2026
        </h1>
        <p className="text-lg text-primary-foreground/80 max-w-md mx-auto">
          Start with clarity, systems, and practical AI.
        </p>
      </div>

      {/* Card Section */}
      <div className="max-w-xl mx-auto px-4 -mt-8">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-accent-foreground" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Your AI Playbook Is On Its Way
          </h2>
          
          <p className="text-muted-foreground mb-2">
            Thank you for downloading the Practical AI Playbook for Entrepreneurs (2026).
          </p>
          <p className="text-muted-foreground mb-8">
            You'll receive the playbook in your inbox shortly.
          </p>

          {/* Guide Info */}
          <div className="text-left mb-8">
            <p className="text-foreground font-semibold mb-4">
              This guide is designed to be:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-accent-foreground" />
                </div>
                <span className="text-muted-foreground">Read slowly</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-accent-foreground" />
                </div>
                <span className="text-muted-foreground">Implemented step by step</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-accent-foreground" />
                </div>
                <span className="text-muted-foreground">Used as a reference while building systems</span>
              </li>
            </ul>
          </div>

          {/* CTA Text */}
          <p className="text-muted-foreground mb-4">
            If you ever want help implementing these systems,{" "}
            <Link to="/" className="text-accent font-semibold hover:underline">
              Sirah Digital is here
            </Link>
            .
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-border mt-6">
            <a
              href="https://www.linkedin.com/in/iammohamedriyaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@riyazlive"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8 mb-16">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link to="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
