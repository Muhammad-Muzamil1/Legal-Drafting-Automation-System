import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { Loader } from '@/components/Loader';
import { getCategories } from '@/services/api';

export const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate('/templates', {
      state: { category: category.name },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Home
          </button>
          <h1 className="text-2xl font-bold text-primary">Document Categories</h1>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-8 text-destructive">
            <p className="font-semibold">Error loading categories</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>

        {categories.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No categories available at the moment.
            </p>
          </div>
        )}
      </main>

      <Loader isLoading={loading} />
    </div>
  );
};
