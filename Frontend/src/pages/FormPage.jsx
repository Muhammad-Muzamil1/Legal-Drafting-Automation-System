import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DynamicForm } from '@/components/DynamicForm';
import { Loader } from '@/components/Loader';
import { getFormFields, submitForm } from '@/services/api';

export const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, template } = location.state || {};

  const [fields, setFields] = useState([]);
  const [templateInfo, setTemplateInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category || !template) {
      navigate('/categories');
      return;
    }

    const loadFields = async () => {
      try {
        setLoading(true);
        const data = await getFormFields(category, template);
        setTemplateInfo({
          templateName: data.templateName,
          category: data.category,
        });
        setFields(data.fields || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFields();
  }, [category, template, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
  templateName: templateInfo.templateName,
  category: templateInfo.category, // safer
  fields: formData, // ✅ THIS IS THE FIX
};

      const htmlContent = await submitForm(payload);

      navigate('/preview', {
        state: {
          htmlContent,
          category,
          template,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/templates', { state: { category } })}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-primary">
            {templateInfo?.templateName || 'Form'}
          </h1>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-8 text-destructive">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {fields.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-8">
            <DynamicForm
              fields={fields}
              onSubmit={handleSubmit}
              isLoading={submitting}
            />
          </div>
        )}

        {fields.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No form fields available for this template.
            </p>
          </div>
        )}
      </main>

      <Loader isLoading={loading || submitting} />
    </div>
  );
};
