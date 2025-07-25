import { useState, useEffect } from "react";
import { ImageViewer } from "@/components/ImageViewer";
import { MultimodalMaps } from "@/components/MultimodalMaps";
import { EditControls, EditSelections } from "@/components/EditControls";
import { ResultsViewer } from "@/components/ResultsViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Brain, Zap } from "lucide-react";

// Import assets
import sampleRoom from "@/assets/sample-room.jpg";
import gazeMap from "@/assets/gaze-map.png";
import saliencyMap from "@/assets/saliency-map.png";
import heroBackground from "@/assets/hero-bg.jpg";

type AppState = 'viewing' | 'analyzing' | 'editing' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('viewing');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedImage, setEditedImage] = useState<string>("");

  // Mock data - in real app, this would come from your backend
  const images = [sampleRoom]; // Add more sample images as needed
  const currentImage = images[currentImageIndex];
  
  // Simulate multimodal analysis
  const overlapPercentage = 67.3; // Mock overlap calculation

  const handleFeedback = (liked: boolean) => {
    if (liked) {
      // Skip to next image
      handleNextImage();
    } else {
      // Proceed to multimodal analysis
      setTimeout(() => {
        setCurrentState('analyzing');
      }, 500);
    }
  };

  const handleGenerateEdit = async (selections: EditSelections) => {
    setCurrentState('editing');
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, you would:
    // 1. Send the original image, overlap mask, and edit prompts to your AI service
    // 2. Receive the edited image back
    // For demo purposes, we'll use the original image as the "edited" result
    setEditedImage(currentImage);
    setIsGenerating(false);
    setCurrentState('results');
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setCurrentState('viewing');
    setEditedImage("");
  };

  const handleRegenerate = () => {
    setCurrentState('editing');
    // Reset and allow re-editing
    setTimeout(() => {
      setCurrentState('analyzing');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Hero Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            GazeXpert
          </h1>
          <p className="text-xl text-foreground/70 mb-6">
            Multimodal Co-Learning System for Scene Editing
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Eye className="w-4 h-4 mr-2" />
              Human Gaze Tracking
            </Badge>
            <Badge variant="outline" className="border-accent/30 text-accent">
              <Brain className="w-4 h-4 mr-2" />
              AI Attention Maps
            </Badge>
            <Badge variant="outline" className="border-primary-glow/30 text-primary-glow">
              <Zap className="w-4 h-4 mr-2" />
              Intelligent Editing
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Image Viewing State */}
          {currentState === 'viewing' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  Interior Design Review
                </h2>
                <p className="text-foreground/60">
                  Provide your feedback on this interior design
                </p>
              </div>
              <ImageViewer 
                imageUrl={currentImage} 
                onFeedback={handleFeedback}
              />
            </div>
          )}

          {/* Multimodal Analysis State */}
          {currentState === 'analyzing' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  Multimodal Analysis
                </h2>
                <p className="text-foreground/60">
                  Analyzing human gaze patterns and AI attention maps
                </p>
              </div>
              <MultimodalMaps 
                originalImage={currentImage}
                gazeMap={gazeMap}
                saliencyMap={saliencyMap}
                overlapPercentage={overlapPercentage}
              />
              <div className="max-w-4xl mx-auto">
                <EditControls 
                  onGenerateEdit={handleGenerateEdit}
                  isGenerating={isGenerating}
                />
              </div>
            </div>
          )}

          {/* Editing State */}
          {currentState === 'editing' && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  AI Processing
                </h2>
                <p className="text-foreground/60">
                  Generating targeted edits based on multimodal attention...
                </p>
              </div>
              <Card className="max-w-md mx-auto bg-card/50 backdrop-blur-sm">
                <CardContent className="py-8">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-foreground/60">
                    Processing with AI inpainting engine...
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results State */}
          {currentState === 'results' && editedImage && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  Edit Results
                </h2>
                <p className="text-foreground/60">
                  AI-guided edit based on multimodal attention analysis
                </p>
              </div>
              <div className="max-w-6xl mx-auto">
                <ResultsViewer 
                  originalImage={currentImage}
                  editedImage={editedImage}
                  onNext={handleNextImage}
                  onRegenerate={handleRegenerate}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="fixed bottom-6 right-6 z-20">
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {currentState === 'viewing' && "Ready for feedback"}
                {currentState === 'analyzing' && "Analyzing attention maps"}
                {currentState === 'editing' && "AI editing in progress"}
                {currentState === 'results' && "Edit complete"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;