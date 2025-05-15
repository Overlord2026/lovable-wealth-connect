
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
}

export function SubmitButton({ isLoading }: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full bg-wealth-800 hover:bg-wealth-900" disabled={isLoading}>
      {isLoading ? (
        <><span className="animate-spin mr-2">⟳</span> Submitting application...</>
      ) : (
        "Submit Professional Application"
      )}
    </Button>
  );
}
