/**
 * Handle PDF download logic
 * Creates a blob from binary data and triggers download
 */
export const downloadPdf = (binaryData, filename = 'document.pdf') => {
  try {
    // Create blob from binary data
    const blob = new Blob([binaryData], { type: 'application/pdf' });

    // Create blob URL
    const url = window.URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw new Error('Failed to download PDF');
  }
};
