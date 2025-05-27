/**
 * Format a date to a string in the format MM/DD/YYYY
 * @param {Date} date - The date to format
 * @returns {string} The formatted date string
 */
export function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
}

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} The formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}