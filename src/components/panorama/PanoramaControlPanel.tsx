
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Share2, Download, Filter } from "lucide-react";

interface PanoramaControlPanelProps {
  views: { id: string; name: string; is_default: boolean }[];
  currentView: string;
  onViewChange: (viewId: string) => void;
}

export function PanoramaControlPanel({ 
  views, 
  currentView, 
  onViewChange 
}: PanoramaControlPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-white rounded-lg shadow mb-6">
      <div className="flex items-center gap-3">
        <Select value={currentView} onValueChange={onViewChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent>
            {views.map(view => (
              <SelectItem key={view.id} value={view.id}>
                {view.name} {view.is_default && "(Default)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
}
