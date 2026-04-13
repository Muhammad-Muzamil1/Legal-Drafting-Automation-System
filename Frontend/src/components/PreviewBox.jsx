import { useState, useEffect } from 'react';
import { FileDown, Edit2 } from 'lucide-react';

export const PreviewBox = ({ htmlContent, onDownload, isDownloading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState(htmlContent);

  // ✅ Sync new HTML
  useEffect(() => {
    setEditedHtml(htmlContent);
  }, [htmlContent]);

  const handleDownload = () => {
    onDownload(isEditing ? editedHtml : htmlContent);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-md"
        >
          <Edit2 className="w-4 h-4" />
          {isEditing ? 'View Preview' : 'Edit HTML'}
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          <FileDown className="w-4 h-4" />
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      {/* Editor */}
      {isEditing ? (
        <textarea
          value={editedHtml}
          onChange={(e) => setEditedHtml(e.target.value)}
          className="w-full h-96 p-4 border rounded-md font-mono text-sm"
        />
      ) : (
        <div className="border rounded-md p-6 min-h-96 overflow-auto">
          {htmlContent ? (
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <p>No preview available</p>
          )}
        </div>
      )}
    </div>
  );
};