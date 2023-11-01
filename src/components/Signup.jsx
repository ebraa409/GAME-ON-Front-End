import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Globals'
import Button from '@mui/material/Button'

const Signup = () => {
  let navigate = useNavigate()
  const startingState = {
    firstName: '',
    lastName: '',
    age: '',
    discordAccount: '',
    emailAddress: '',
    passwordDigest: ''
  }
  const [signupState, setSignupState] = useState(startingState)

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post(`${BASE_URL}/signup`, signupState)

    setSignupState(startingState)
    navigate('/signin')
  }

  const handleChange = (event) => {
    setSignupState({ ...signupState, [event.target.id]: event.target.value })
  }

  return (
    <div className="full-page">
      <form onSubmit={handleSubmit} className="signupform">
        <h1 className="signinh1">Sign Up</h1>
        <br />
        <br />
        <br />
        <label htmlFor="firstName" className="signinlabel">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          onChange={handleChange}
          value={signupState.firstName}
        />
        <label htmlFor="lastName" className="signinlabel">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          onChange={handleChange}
          value={signupState.lastName}
        />
        <label htmlFor="age" className="signinlabel">
          Age
        </label>
        <input
          type="number"
          id="age"
          onChange={handleChange}
          value={signupState.age}
        />
        <label htmlFor="discordAccount" className="signinlabel">
          {' '}
          Discord Name
        </label>
        <input
          type="text"
          id="discordAccount"
          onChange={handleChange}
          value={signupState.discordAccount}
        />
        <label htmlFor="emailAddress" className="signinlabel">
          {' '}
          Email Address
        </label>
        <input
          type="email"
          id="emailAddress"
          onChange={handleChange}
          value={signupState.emailAddress}
        />
        <label htmlFor="passwordDigest" className="signinlabel">
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={signupState.password}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
          size="large"
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default Signup
