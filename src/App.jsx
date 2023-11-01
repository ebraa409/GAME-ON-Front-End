import './App.css'
import './coach.css'
import Home from './pages/Home'
import Signup from './components/Signup'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Signin from './components/Signin'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL, Client } from '../Globals'
import Sessions from './components/Sessions'
import UserProfile from './pages/UserProfile'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const notify = (response) => {
  response.data.status
    ? toast.success(response.data.msg)
    : toast.error(response.data.msg)
}

const App = () => {
  const [user, setUser] = useState(null)

  const checkSession = async () => {
    try {
      const response = await Client.get(BASE_URL + '/session')
      return response.data
    } catch (error) {
      throw error
    }
  }

  const checkToken = async () => {
    const user = await checkSession()
    await setUser(user)
  }

  const [coaches, setCoaches] = useState([])

  const getCoaches = async () => {
    let response = await axios.get(`${BASE_URL}/show_coach`)
    setCoaches(response.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div id="app">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Nav user={user} />
        <Routes>
          <Route
            path={'/gamesession'}
            element={<Sessions user={user} coaches={coaches} notify={notify} />}
          />

          <Route
            path="/"
            element={
              <Home coaches={coaches} user={user} getCoaches={getCoaches} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route
            path="/profile"
            element={
              <UserProfile
                user={user}
                setUser={setUser}
                coaches={coaches}
                notify={notify}
              />
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App
