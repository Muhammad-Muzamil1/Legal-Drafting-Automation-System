import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TemplateCard } from '@/components/TemplateCard';
import { Loader } from '@/components/Loader';
import { getTemplates } from '@/services/api';

export const Templates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category;

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      navigate('/categories');
      return;
    }

    const loadTemplates = async () => {
      try {
        setLoading(true);
        const data = await getTemplates(category);
        setTemplates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [category, navigate]);

  const handleTemplateClick = (template) => {
    navigate('/form', {
      state: { category, template },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/categories')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-primary">{category} Templates</h1>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-8 text-destructive">
            <p className="font-semibold">Error loading templates</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <div className="space-y-3 max-w-2xl">
          {templates.map((template) => (
            <TemplateCard
              key={template}
              template={template}
              onClick={() => handleTemplateClick(template)}
            />
          ))}
        </div>

        {templates.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No templates available for this category.
            </p>
          </div>
        )}
      </main>

      <Loader isLoading={loading} />
    </div>
  );
};
