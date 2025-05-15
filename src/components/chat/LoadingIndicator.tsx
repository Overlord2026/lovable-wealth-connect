
import { Loader2 } from "lucide-react";

export function LoadingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 max-w-[80%] ml-auto">
      <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      <p className="text-sm text-blue-700">Thinking...</p>
    </div>
  );
}
