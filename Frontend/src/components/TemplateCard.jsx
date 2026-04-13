import { FileText, ChevronRight } from 'lucide-react';

/**
 * Card component for displaying templates
 */
export const TemplateCard = ({ template, onClick }) => {
  // Remove .html extension if present for cleaner display
  const templateName = template.replace(/\.html$/, '');

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <FileText className="w-6 h-6 text-primary" />
        <span className="text-card-foreground font-medium">{templateName}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  );
};
