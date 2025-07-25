import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Palette, Layout, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface EditControlsProps {
  onGenerateEdit: (selections: EditSelections) => void;
  isGenerating?: boolean;
}

export interface EditSelections {
  style?: string;
  color?: string;
  layout?: string;
  lighting?: string;
}

export const EditControls = ({ onGenerateEdit, isGenerating = false }: EditControlsProps) => {
  const [selections, setSelections] = useState<EditSelections>({});

  const styleOptions = [
    "Modern minimalist",
    "Scandinavian",
    "Industrial",
    "Bohemian",
    "Mid-century modern",
    "Contemporary"
  ];

  const colorOptions = [
    "Warm neutrals",
    "Cool blues",
    "Earth tones",
    "Monochromatic",
    "Bold accents",
    "Pastel palette"
  ];

  const layoutOptions = [
    "Open concept",
    "Cozy corners",
    "Symmetrical",
    "Asymmetrical",
    "Focal point centered",
    "Flow optimization"
  ];

  const lightingOptions = [
    "Natural bright",
    "Ambient warm",
    "Dramatic shadows",
    "Soft diffused",
    "Accent lighting",
    "Golden hour"
  ];

  const handleSelectionChange = (category: keyof EditSelections, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const handleGenerate = () => {
    const selectedCount = Object.values(selections).filter(Boolean).length;
    
    if (selectedCount === 0) {
      toast.error("Please select at least one editing option to proceed");
      return;
    }

    toast.success(`Generating edit with ${selectedCount} modifications...`);
    onGenerateEdit(selections);
  };

  const selectedCount = Object.values(selections).filter(Boolean).length;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          AI-Guided Editing Controls
          {selectedCount > 0 && (
            <Badge variant="outline" className="border-primary/30 text-primary">
              {selectedCount} selected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Style Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Palette className="w-4 h-4" />
              Style
            </label>
            <Select onValueChange={(value) => handleSelectionChange('style', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {styleOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Palette className="w-4 h-4" />
              Color Scheme
            </label>
            <Select onValueChange={(value) => handleSelectionChange('color', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select colors" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {colorOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Layout Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Layout className="w-4 h-4" />
              Layout
            </label>
            <Select onValueChange={(value) => handleSelectionChange('layout', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {layoutOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lighting Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Lightbulb className="w-4 h-4" />
              Lighting
            </label>
            <Select onValueChange={(value) => handleSelectionChange('lighting', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select lighting" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {lightingOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <Button 
            variant="glow" 
            size="lg"
            onClick={handleGenerate}
            disabled={selectedCount === 0 || isGenerating}
            className="min-w-[200px]"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Edit
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};