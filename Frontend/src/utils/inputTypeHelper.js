/**
 * Determine input type based on field name
 * Logic:
 * - Contains "day" → number
 * - Contains "month" → text (for month names)
 * - Contains "cnic" → text
 * - Contains "amount" → number
 * - Default: text
 */
export const getInputType = (fieldName) => {
  const lowerFieldName = fieldName.toLowerCase();

  if (lowerFieldName.includes('day')) {
    return 'number';
  }
  if (lowerFieldName.includes('month')) {
    return 'text';
  }
  if (lowerFieldName.includes('cnic')) {
    return 'text';
  }
  if (lowerFieldName.includes('amount')) {
    return 'number';
  }

  return 'text';
};
