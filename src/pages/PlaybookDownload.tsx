import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlaybookDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Wait for iframe to load
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamically import html2pdf
      const html2pdf = (await import("html2pdf.js")).default;
      
      // Get the iframe content
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentDocument) {
        throw new Error("Could not access playbook content");
      }

      const content = iframe.contentDocument.body;
      
      // Configure pdf options for A4 pages
      const opt = {
        margin: 0,
        filename: "Sirah_Digital_AI_Playbook_2026.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait" 
        },
        pagebreak: { mode: ["css", "legacy"] }
      };

      await html2pdf().set(opt).from(content).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback: open print dialog
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.print();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground font-semibold">AI Playbook 2026</span>
            </div>
          </div>
          <Button 
            onClick={handleDownloadPDF} 
            disabled={isGenerating || isLoading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading playbook...</p>
          </div>
        </div>
      )}

      {/* Playbook Viewer */}
      <div className={`flex-1 ${isLoading ? "hidden" : "block"}`}>
        <iframe
          ref={iframeRef}
          src="/Sirah_Digital_AI_Playbook_2026.html"
          className="w-full h-full min-h-screen border-0"
          title="AI Playbook 2026"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
