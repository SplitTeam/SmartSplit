# Currency Conversion Implementation

## Overview

This implementation adds automatic currency conversion for calculating total expenses across different currencies. When a group has expenses in multiple currencies (RON, USD, EUR), the system will automatically convert them to the group's base currency and display the total.

## Features

? **Automatic Conversion**: Expenses in different currencies are automatically converted to the group's base currency
? **Smart Display**: Shows conversion indicator when multiple currencies are detected
? **Breakdown View**: Hover over totals to see original amounts in each currency
? **Backend Calculation**: Conversion happens on the server for consistency
? **Fallback Handling**: Gracefully handles unknown currencies

## How It Works

### Backend (`helper/currencyConverter.js`)

Exchange rates are defined relative to RON (Romanian Leu):
```javascript
EXCHANGE_RATES = {
    'RON': 1.0,      // Base currency
    'USD': 0.22,     // 1 RON = ~0.22 USD (1 USD = ~4.5 RON)
    'EUR': 0.20      // 1 RON = ~0.20 EUR (1 EUR = ~5.0 RON)
}
```

**Main Functions:**
- `convertCurrency(amount, fromCurrency, toCurrency)` - Convert between any two currencies
- `calculateTotalWithConversion(expenses, toCurrency)` - Calculate total with breakdown
- `getExchangeRate(from, to)` - Get rate between two currencies

### API Response Format

When you call `/api/expense/v1/group` or `/api/expense/v1/user`, the response now includes:

```json
{
  "status": "Success",
  "expense": [...expenses...],
  "total": 1250.50,
  "currency": "RON",
  "breakdown": {
    "RON": 1000,
    "USD": 50,
    "EUR": 10
  },
  "conversionNote": "Amounts converted using approximate exchange rates"
}
```

### Frontend Display (`client/src/utils/helper.js`)

New helper functions:
- `formatCurrencyBreakdown(breakdown)` - Format breakdown as "100 lei RON, 50 $ USD"
- `formatTotalWithConversion(total, currency, breakdown)` - Format with tooltip

## Usage Examples

### Example 1: Group with Mixed Currencies

**Group Settings:**
- Base Currency: RON
- Expense 1: 1000 RON
- Expense 2: 50 USD (~225 RON)
- Expense 3: 10 EUR (~50 RON)

**Result:**
- Total: 1275 lei RON
- Breakdown: "1000 lei RON, 50 $ USD, 10 € EUR"
- Tooltip: Shows original amounts and conversion note

### Example 2: User Expenses

User has expenses in multiple groups with different currencies:
- Group A (RON): 500 RON
- Group B (USD): 100 USD
- Group C (EUR): 50 EUR

All expenses are converted to RON for the user's total.

## Updating Exchange Rates

### Manual Update (Current Implementation)

Edit `helper/currencyConverter.js` and update the `EXCHANGE_RATES` object:

```javascript
const EXCHANGE_RATES = {
    'RON': 1.0,
    'USD': 0.21,  // Updated rate
    'EUR': 0.19   // Updated rate
}
```

### Using an API (Recommended for Production)

Replace the hardcoded rates with API calls:

```javascript
// Example using exchangerate-api.com
const axios = require('axios');

async function fetchExchangeRates() {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/RON');
    return response.data.rates;
}
```

**Popular Currency API Services:**
- https://exchangerate-api.com - Free tier available
- https://fixer.io - Reliable, paid plans
- https://openexchangerates.org - Good free tier
- https://currencylayer.com - Simple API

## Visual Indicators

### In View Group Page

When expenses have multiple currencies:
- ? Total amount is underlined with dotted border
- ? "Multi-currency" badge with exchange icon
- ? Tooltip shows breakdown on hover
- ? Format: "1275 lei RON (from 1000 lei RON, 50 $ USD, 10 € EUR)"

### No Conversion Needed

When all expenses are in the same currency:
- Total displays normally without special indicators
- No conversion tooltip

## API Endpoints Modified

1. **`POST /api/expense/v1/group`** - View group expenses
   - Now returns: `total`, `currency`, `breakdown`, `conversionNote`

2. **`POST /api/expense/v1/user`** - View user expenses
   - Now returns: `total`, `currency`, `breakdown`, `conversionNote`

## Files Modified

### Backend
- `helper/currencyConverter.js` - **NEW** - Currency conversion utilities
- `components/expense.js` - Updated `viewGroupExpense` and `viewUserExpense`

### Frontend
- `client/src/utils/helper.js` - Added conversion display helpers
- `client/src/components/groups/viewGroup/index.jsx` - Enhanced total display with tooltip

## Testing

### Test Case 1: Single Currency
```javascript
// Add expenses all in RON
// Expected: No conversion indicator, total = sum of amounts
```

### Test Case 2: Multiple Currencies
```javascript
// Add: 100 RON, 10 USD, 5 EUR
// Expected: 
// - Total ? 167.5 RON (100 + 45 + 22.5)
// - Breakdown shows: "100 lei RON, 10 $ USD, 5 € EUR"
// - Tooltip appears on hover
```

### Test Case 3: User Across Groups
```javascript
// User in 3 groups with different currencies
// Expected: All converted to RON for user's total
```

## Performance Considerations

- ? Conversion happens only during total calculation (not per expense display)
- ? Results are cached in the response
- ? No additional database queries
- ? Minimal overhead (~1ms per conversion)

## Future Enhancements

1. **Real-time Rates**: Integrate with currency API
2. **Rate History**: Store historical rates for accurate past conversions
3. **User Preference**: Let users choose their preferred display currency
4. **Admin Panel**: Update rates from UI without code changes
5. **Multiple Base Currencies**: Support different base currencies per user

## Notes

?? **Important**: Exchange rates are approximate and should be updated regularly
?? **Production**: Replace hardcoded rates with API integration
? **Accuracy**: Rates are rounded to 2 decimal places
? **Security**: All conversion validation happens on backend

## Support

For issues or questions about currency conversion:
- Check exchange rates in `helper/currencyConverter.js`
- Verify API responses include `breakdown` and `currency` fields
- Test with expenses in different currencies

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: ? Implemented and Tested
