import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Brain, Zap } from "lucide-react";

interface MultimodalMapsProps {
  originalImage: string;
  gazeMap: string;
  saliencyMap: string;
  overlapPercentage?: number;
}

export const MultimodalMaps = ({ 
  originalImage, 
  gazeMap, 
  saliencyMap, 
  overlapPercentage = 0 
}: MultimodalMapsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Gaze Map */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Eye className="w-5 h-5 text-primary" />
            Human Gaze
          </CardTitle>
          <Badge variant="outline" className="w-fit border-primary/30 text-primary">
            SOL Glasses Data
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover"
            />
            <img 
              src={gazeMap} 
              alt="Gaze map overlay" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
            />
          </div>
        </CardContent>
      </Card>

      {/* Saliency Map */}
      <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="w-5 h-5 text-accent" />
            AI Attention
          </CardTitle>
          <Badge variant="outline" className="w-fit border-accent/30 text-accent">
            Grad-CAM / ViT
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover"
            />
            <img 
              src={saliencyMap} 
              alt="Saliency map overlay" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70"
            />
          </div>
        </CardContent>
      </Card>

      {/* Overlap Mask */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary-glow/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5 text-primary-glow" />
            Overlap Mask
          </CardTitle>
          <Badge 
            variant="outline" 
            className="w-fit border-primary-glow/30 text-primary-glow"
          >
            {overlapPercentage.toFixed(1)}% Overlap
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={gazeMap} 
                alt="Gaze overlay" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40"
              />
              <img 
                src={saliencyMap} 
                alt="Saliency overlay" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40"
              />
            </div>
            
            {/* Overlap indicator */}
            <div className="absolute top-2 right-2 bg-primary-glow/20 backdrop-blur-sm rounded-full p-2">
              <Zap className="w-4 h-4 text-primary-glow" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};