import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Eye, Brain, Layers } from "lucide-react";
import { toast } from "sonner";

interface ImageViewerProps {
  imageUrl: string;
  onFeedback: (liked: boolean) => void;
}

export const ImageViewer = ({ imageUrl, onFeedback }: ImageViewerProps) => {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const handleFeedback = (liked: boolean) => {
    setFeedback(liked);
    onFeedback(liked);
    
    if (liked) {
      toast.success("Image liked! Moving to next...");
    } else {
      toast.info("Processing multimodal analysis...");
    }
  };

  return (
    <Card className="relative overflow-hidden bg-card border-border">
      <div className="aspect-square relative group">
        <img 
          src={imageUrl} 
          alt="Interior design sample"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Feedback buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            variant={feedback === true ? "success" : "outline"}
            size="lg"
            onClick={() => handleFeedback(true)}
            className="bg-background/10 backdrop-blur-sm border-success/50 hover:bg-success hover:border-success"
          >
            <ThumbsUp className="w-5 h-5" />
            Like
          </Button>
          
          <Button
            variant={feedback === false ? "destructive" : "outline"}
            size="lg"
            onClick={() => handleFeedback(false)}
            className="bg-background/10 backdrop-blur-sm border-destructive/50 hover:bg-destructive hover:border-destructive"
          >
            <ThumbsDown className="w-5 h-5" />
            Dislike
          </Button>
        </div>
      </div>
      
      {/* Info overlay */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="bg-background/10 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-foreground/80">
          <Eye className="w-4 h-4 inline mr-1" />
          Gaze Ready
        </div>
        <div className="bg-background/10 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-foreground/80">
          <Brain className="w-4 h-4 inline mr-1" />
          AI Analysis
        </div>
        <div className="bg-background/10 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-foreground/80">
          <Layers className="w-4 h-4 inline mr-1" />
          Multimodal
        </div>
      </div>
    </Card>
  );
};