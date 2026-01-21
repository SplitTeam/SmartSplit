

// ----------------------------------------------------------------------


export function convertToCurrency(number) {
  number = Math.abs(Math.round((number  + Number.EPSILON) * 100) / 100)
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function currencyFind(currencyType){
  switch (currencyType) {
      case "RON":
          return 'lei'
      case "USD":
          return '$'
      case "EUR":
          return "€"
      default:
          return 'lei'
  }
}

/**
 * Format currency breakdown for display
 * @param {Object} breakdown - Breakdown object with currencies and amounts
 * @returns {String} - Formatted string like "100 lei RON, 50 $ USD"
 */
export function formatCurrencyBreakdown(breakdown) {
  if (!breakdown || Object.keys(breakdown).length === 0) {
    return '';
  }
  
  return Object.entries(breakdown)
    .map(([currency, amount]) => {
      const symbol = currencyFind(currency);
      const formattedAmount = convertToCurrency(amount);
      return `${formattedAmount} ${symbol} ${currency}`;
    })
    .join(', ');
}

/**
 * Format total with currency conversion info
 * @param {Number} total - Total amount
 * @param {String} currency - Currency code
 * @param {Object} breakdown - Original amounts by currency
 * @returns {Object} - Formatted display strings
 */
export function formatTotalWithConversion(total, currency, breakdown) {
  const symbol = currencyFind(currency);
  const formattedTotal = convertToCurrency(total);
  const breakdownText = formatCurrencyBreakdown(breakdown);
  
  // Check if conversion happened (more than one currency in breakdown)
  const hasConversion = breakdown && Object.keys(breakdown).length > 1;
  
  return {
    mainTotal: `${formattedTotal} ${symbol} ${currency}`,
    breakdown: breakdownText,
    hasConversion: hasConversion,
    tooltip: hasConversion 
      ? `Original amounts: ${breakdownText}. Converted to ${currency} using approximate exchange rates.`
      : null
  };
}



export function categoryIcon(groupCategory){
  switch (groupCategory) {
      case "Home":
          return 'ant-design:home-filled'
      case "Trip":
          return 'ic:outline-flight'
      case "Office":
          return 'mdi:office-building-marker'
      case "Sports":
          return 'material-symbols:sports-cricket'
      case "Others":
          return 'foundation:page-edit'
      default:
          return 'ic:baseline-insert-page-break'
  }
}

export const monthNamesMMM = ["JAN", "FRB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
export function getMonthMMM(expDate) {
  const date = new Date(expDate)
  return monthNamesMMM[date.getMonth()];
}

Number.prototype.zeroPad = function() {
  return ('0'+this).slice(-2);
};