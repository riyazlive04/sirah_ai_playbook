import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import sirahLogo from "@/assets/sirah-digital-logo.jpg";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
];

export default function GetPlaybook() {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validation helpers
  const isValidEmail = (email: string) => {
    // RFC 5322 compliant email regex - checks proper format with valid TLD
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return email.length <= 254 && emailRegex.test(email.trim().toLowerCase());
  };

  const isValidPhone = (phoneNumber: string, code: string) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // For Indian numbers (+91), must be 10 digits starting with 6-9
    if (code === "+91") {
      return /^[6-9]\d{9}$/.test(cleaned);
    }
    
    // For other countries, accept 6-15 digits
    return cleaned.length >= 6 && cleaned.length <= 15;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const getFullPhoneNumber = () => {
    if (!phone.trim()) return "";
    return `${countryCode}${phone.replace(/\D/g, '')}`;
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

    // Consent validation
    if (!consentGiven) {
      toast({
        title: "Consent required",
        description: "Please agree to receive promotional messages on WhatsApp.",
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
    if (phone.trim() && !isValidPhone(phone, countryCode)) {
      const errorMsg = countryCode === "+91" 
        ? "Enter a 10-digit mobile number starting with 6-9."
        : "Enter a valid phone number (6-15 digits).";
      toast({
        title: "Invalid phone number",
        description: errorMsg,
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
        phone: getFullPhoneNumber(),
        email,
        website_url: websiteUrl,
      });

      if (insertError) throw insertError;

      // Trigger n8n webhook for lead notification
      try {
        const formData = new URLSearchParams();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("whatsapp", getFullPhoneNumber());
        formData.append("whatsapp_optin", String(consentGiven));
        
        await fetch("https://n8n.srv930949.hstgr.cloud/webhook/playbook-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          mode: "no-cors",
          body: formData.toString(),
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
        // Continue even if webhook fails
      }

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
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  type="button"
                  variant="outline" 
                  className="bg-muted/50 border-border/30 h-14 rounded-xl px-3 flex items-center gap-1 min-w-[90px]"
                >
                  <span className="text-lg">{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                  <span className="text-sm">{countryCode}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50 max-h-60 overflow-y-auto">
                {countryCodes.map((country) => (
                  <DropdownMenuItem
                    key={country.code}
                    onClick={() => setCountryCode(country.code)}
                    className="cursor-pointer"
                  >
                    <span className="text-lg mr-2">{country.flag}</span>
                    <span>{country.country}</span>
                    <span className="ml-auto text-muted-foreground">{country.code}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              type="tel"
              placeholder="WhatsApp Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-muted/50 border-border/30 text-foreground placeholder:text-muted-foreground h-14 rounded-xl flex-1"
            />
          </div>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(checked === true)}
              className="mt-1"
            />
            <label
              htmlFor="consent"
              className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
            >
              I agree to receive promotional messages and updates on WhatsApp. <span className="text-destructive">*</span>
            </label>
          </div>
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