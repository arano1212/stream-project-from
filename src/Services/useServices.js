import axios from 'axios'

const BASE_URL = 'https://stream-project-1.onrender.com/api/v1'

const loginUserServices = (data) => axios.post(`${BASE_URL}/login`, data)
const registerUserServices = (data) => axios.post(`${BASE_URL}/register`, data)
const checkUserName = (username) => axios.get(`${BASE_URL}/check-username/${username}`)

export {
  loginUserServices,
  registerUserServices,
  checkUserName
}
