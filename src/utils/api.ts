import axios from 'axios'

const API_BASE_URL = 'https://api.overpass.example.com' // Replace with actual API URL

export const fetchTransactions = async (address: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/${address}`)
    return response.data
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}
