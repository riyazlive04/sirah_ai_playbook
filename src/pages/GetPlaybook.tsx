import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import sirahLogo from "@/assets/sirah-digital-logo.jpg";
import { useToast } from "@/hooks/use-toast";

export default function GetPlaybook() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validation helpers
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Allow 10-15 digits, optional + prefix, spaces, dashes, parentheses
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15 && phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Required fields validation
    if (!name.trim() || !email.trim() || !websiteUrl.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and website URL are required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Phone validation (if provided)
    if (phone.trim() && !isValidPhone(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number (10-15 digits).",
        variant: "destructive",
      });
      return;
    }

    // Website URL validation
    if (!isValidUrl(websiteUrl)) {
      toast({
        title: "Invalid website URL",
        description: "Please enter a valid website URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead to database
      const { error: insertError } = await supabase.from("leads").insert({
        name,
        phone,
        email,
        website_url: websiteUrl,
      });

      if (insertError) throw insertError;

      // Send welcome email with playbook
      const { error: emailError } = await supabase.functions.invoke("send-playbook-email", {
        body: { name, email },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Still show success even if email fails - they're in the database
      }

      toast({
        title: "Success!",
        description: "Check your email for the playbook download link.",
      });

      // Redirect to thank you or stay on page
      navigate("/thank-you");
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex flex-col items-center justify-center px-4 pt-16 pb-8 relative">
      {/* Logo in top left */}
      <Link to="/" className="absolute top-3 left-4 z-20">
        <img src={sirahLogo} alt="Sirah Digital" className="h-10 sm:h-14 w-auto" />
      </Link>
      <div className="w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground text-center leading-tight mb-4">
          Build a Smarter Business for 2026
        </h1>
        <p className="text-primary-foreground/80 text-center mb-8">
          Start with clarity, systems, and practical AI.
        </p>

        <form onSubmit={handleSubmit} className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-border/20">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-muted/50 border-border/30 text-foreground placeholder:text-muted-foreground h-14 rounded-xl"
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-muted/50 border-border/30 text-foreground placeholder:text-muted-foreground h-14 rounded-xl"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted/50 border-border/30 text-foreground placeholder:text-muted-foreground h-14 rounded-xl"
            required
          />
          <Input
            type="url"
            placeholder="Website URL"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="bg-muted/50 border-border/30 text-foreground placeholder:text-muted-foreground h-14 rounded-xl"
            required
          />

          <Button
            type="submit"
            variant="cta"
            size="xl"
            className="w-full"
            disabled={isSubmitting}
          >
            <Download className="w-5 h-5 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}