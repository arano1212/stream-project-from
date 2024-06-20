import axios from 'axios'

const BASE_URL = 'https://api.tvmaze.com'

const getAllShowsServices = () => axios.get(`${BASE_URL}/shows`)

export { getAllShowsServices }