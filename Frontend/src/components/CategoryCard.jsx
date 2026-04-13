import { ChevronRight } from 'lucide-react';

/**
 * Card component for displaying document categories
 */
export const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
        <ChevronRight className="w-6 h-6 text-primary ml-4" />
      </div>
    </div>
  );
};
