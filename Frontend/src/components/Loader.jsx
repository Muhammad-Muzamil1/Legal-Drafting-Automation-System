import { Loader2 } from 'lucide-react';

/**
 * Reusable loader component with overlay
 */
export const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-foreground font-medium">Loading...</p>
      </div>
    </div>
  );
};
