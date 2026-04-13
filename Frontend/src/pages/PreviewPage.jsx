import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PreviewBox } from '@/components/PreviewBox';
import { Loader } from '@/components/Loader';
import { generatePdf } from '@/services/api';
import { downloadPdf } from '@/utils/downloadPdf';

export const PreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { htmlContent, category, template } = location.state || {};

  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  if (!htmlContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground mb-4">No preview available.</p>
          <button
            onClick={() => navigate('/categories')}
            className="text-primary hover:underline"
          >
            Go back to categories
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = async (content) => {
    try {
      setIsDownloading(true);
      setError(null);

      const binaryData = await generatePdf(content);
      const filename = `${template?.replace(/\.html$/, '') || 'document'}.pdf`;
      downloadPdf(binaryData, filename);
    } catch (err) {
      setError(err.message || 'Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/form', { state: { category, template } })}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-primary">Document Preview</h1>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-8 text-destructive">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <PreviewBox
          htmlContent={htmlContent}
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />
      </main>

      <Loader isLoading={isDownloading} />
    </div>
  );
};
