import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../Globals'
import { NavLink } from 'react-router-dom'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Signin = ({ setUser }) => {
  let navigate = useNavigate()
  const startingState = {
    emailAddress: '',
    password: ''
  }
  const [signinState, setSigninState] = useState(startingState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = await axios.post(`${BASE_URL}/signin`, signinState)

    setUser(payload.data.user)
    localStorage.setItem('token', payload.data.token)

    setSigninState(startingState)
    navigate('/')
  }

  const handleChange = (event) => {
    setSigninState({ ...signinState, [event.target.id]: event.target.value })
  }

  return (
    <div className="full-page">
      <form onSubmit={handleSubmit} className="signupform">
        <h1 className="signinh1">Sign in</h1>
        <br />
        <label htmlFor="emailAddress" className="signinlabel">
          Email Address
        </label>
        <input
          type="email"
          id="emailAddress"
          onChange={handleChange}
          value={signinState.emailAddress}
        />
        <label htmlFor="passwordDigest" className="signinlabel">
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={signinState.password}
        />
        <div>
          <Button variant="text" onClick={() => navigate('/signup')}>
            Sign up
          </Button>
          <Button variant="contained" type="submit">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Signin
