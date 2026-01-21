const logger = require('./logger')

/**
 * Currency Converter Helper
 * 
 * Exchange rates relative to RON (Romanian Leu)
 * NOTE: These are approximate rates and should be updated regularly
 * For production, consider using an API like exchangerate-api.com or fixer.io
 * 
 * Last updated: 2024
 */

const EXCHANGE_RATES = {
    'RON': 1.0,      // Base currency
    'USD': 0.22,     // 1 RON = ~0.22 USD (1 USD = ~4.5 RON)
    'EUR': 0.20      // 1 RON = ~0.20 EUR (1 EUR = ~5.0 RON)
}

/**
 * Convert amount from one currency to another
 * @param {Number} amount - Amount to convert
 * @param {String} fromCurrency - Source currency (RON, USD, EUR)
 * @param {String} toCurrency - Target currency (RON, USD, EUR)
 * @returns {Number} - Converted amount
 */
exports.convertCurrency = (amount, fromCurrency, toCurrency = 'RON') => {
    try {
        // If same currency, no conversion needed
        if (fromCurrency === toCurrency) {
            return amount
        }

        // Validate currencies
        if (!EXCHANGE_RATES[fromCurrency]) {
            logger.warn(`Unknown source currency: ${fromCurrency}, defaulting to RON`)
            fromCurrency = 'RON'
        }
        if (!EXCHANGE_RATES[toCurrency]) {
            logger.warn(`Unknown target currency: ${toCurrency}, defaulting to RON`)
            toCurrency = 'RON'
        }

        // Convert to base currency (RON) first, then to target currency
        const amountInRON = amount / EXCHANGE_RATES[fromCurrency]
        const convertedAmount = amountInRON * EXCHANGE_RATES[toCurrency]

        // Round to 2 decimal places
        return Math.round((convertedAmount + Number.EPSILON) * 100) / 100
    } catch (err) {
        logger.error(`Currency conversion error: ${err.message}`)
        return amount // Return original amount on error
    }
}

/**
 * Convert multiple expenses to a target currency and sum them
 * @param {Array} expenses - Array of expense objects with amount and currency
 * @param {String} toCurrency - Target currency for total
 * @returns {Object} - Object with total and breakdown by original currency
 */
exports.calculateTotalWithConversion = (expenses, toCurrency = 'RON') => {
    const breakdown = {}
    let total = 0

    expenses.forEach(expense => {
        const currency = expense.expenseCurrency || expense.currency || 'RON'
        const amount = expense.expenseAmount || expense.amount || 0

        // Track original amounts by currency
        if (!breakdown[currency]) {
            breakdown[currency] = 0
        }
        breakdown[currency] += amount

        // Convert and add to total
        const convertedAmount = exports.convertCurrency(amount, currency, toCurrency)
        total += convertedAmount
    })

    return {
        total: Math.round((total + Number.EPSILON) * 100) / 100,
        currency: toCurrency,
        breakdown: breakdown,
        conversionNote: 'Amounts converted using approximate exchange rates'
    }
}

/**
 * Get exchange rate between two currencies
 * @param {String} fromCurrency - Source currency
 * @param {String} toCurrency - Target currency
 * @returns {Number} - Exchange rate
 */
exports.getExchangeRate = (fromCurrency, toCurrency = 'RON') => {
    if (fromCurrency === toCurrency) {
        return 1.0
    }

    const fromRate = EXCHANGE_RATES[fromCurrency] || 1.0
    const toRate = EXCHANGE_RATES[toCurrency] || 1.0

    return toRate / fromRate
}

/**
 * Get all supported currencies with their rates relative to RON
 * @returns {Object} - Exchange rates object
 */
exports.getSupportedCurrencies = () => {
    return { ...EXCHANGE_RATES }
}

module.exports = exports
