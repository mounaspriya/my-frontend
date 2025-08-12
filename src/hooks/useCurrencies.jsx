import { useState, useEffect } from 'react'

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check if currencies are cached in localStorage
        const cachedCurrencies = localStorage.getItem('currencies')
        const cacheTimestamp = localStorage.getItem('currencies_timestamp')
        const oneDay = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        if (cachedCurrencies && cacheTimestamp) {
          const isExpired = Date.now() - parseInt(cacheTimestamp) > oneDay
          if (!isExpired) {
            setCurrencies(JSON.parse(cachedCurrencies))
            setLoading(false)
            return
          }
        }

        // Fetch from API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data && data.rates) {
          const currencyList = Object.keys(data.rates).sort()
          setCurrencies(currencyList)
          
          // Cache the results
          localStorage.setItem('currencies', JSON.stringify(currencyList))
          localStorage.setItem('currencies_timestamp', Date.now().toString())
        } else {
          throw new Error('Invalid API response')
        }
      } catch (err) {
        console.error('Error fetching currencies:', err)
        setError(err.message)
        
        // Fallback to default currencies
        const fallbackCurrencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY", "INR", "KRW"]
        setCurrencies(fallbackCurrencies)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [])

  return { currencies, loading, error }
}
