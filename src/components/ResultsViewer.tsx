import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ResultsViewerProps {
  originalImage: string;
  editedImage: string;
  onNext: () => void;
  onRegenerate: () => void;
}

export const ResultsViewer = ({ 
  originalImage, 
  editedImage, 
  onNext, 
  onRegenerate 
}: ResultsViewerProps) => {
  
  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `gazeXpert-edit-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Results Comparison
          </span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRegenerate}
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
            <Button 
              variant="glow" 
              size="sm"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Image */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground/80 flex items-center gap-2">
              Original Image
            </h3>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <img 
                src={originalImage} 
                alt="Original interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Edited Result */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground/80 flex items-center gap-2">
              AI-Edited Result
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </h3>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border-2 border-primary/30">
              <img 
                src={editedImage} 
                alt="AI-edited interior" 
                className="w-full h-full object-cover"
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 ring-2 ring-primary/30 ring-offset-2 ring-offset-background rounded-lg pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={onNext}
            className="min-w-[150px]"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Next Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};