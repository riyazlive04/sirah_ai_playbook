import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PDF_URL = "/Sirah_Digital_AI_Playbook_2026.pdf";

export default function PlaybookDownload() {
  const handleDownloadPDF = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = PDF_URL;
    link.download = "Sirah_Digital_AI_Playbook_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* PDF Viewer */}
      <div className="flex-1">
        <iframe
          src={PDF_URL}
          className="w-full h-full min-h-screen border-0"
          title="AI Playbook 2026"
        />
      </div>
    </div>
  );
}
