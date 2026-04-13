/**
 * Convert camelCase field names to readable labels
 * Example: agreementCity → Agreement City
 */
export const formatLabel = (fieldName) => {
  // Insert space before uppercase letters and capitalize first letter
  const formatted = fieldName.replace(/([A-Z])/g, ' $1');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
