import Axios from 'axios'
export const BASE_URL = 'https://game-on-4vo3.onrender.com'

export const Client = Axios.create({ BASE_URL })

Client.interceptors.request.use(
  (config) => {
    //This would read the token that is stored in local storage
    const token = localStorage.getItem('token')
    //if statement where if there is a token, it would set the authorization header
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
