import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Coaches from '../components/Coaches'
import CoachProfile from '../components/CoachProfile'

import * as React from 'react'
import Button from '@mui/material/Button'
import { BASE_URL } from '../../Globals'

const Home = ({ coaches, user, getCoaches }) => {
  const [coach, setCoach] = useState(null)

  useEffect(() => {
    getCoaches()
  }, [])

  const handleClick = async (coach) => {
    await setCoach(coach)
    location.href = '#coach-profile'
  }

  return (
    <main className="home">
      <section id="Book-session">
        <video autoPlay loop muted>
          <source src={BASE_URL + '/./videos/bg_vid.mp4'} type="video/mp4" />
        </video>
        <div className="content">
          <h1>GAME ON!</h1>
          <h2>Get Pro</h2>
          <NavLink to={user ? '/gamesession' : '/signin'}>
            <Button variant="contained" color="success" size="large">
              Book a Session
            </Button>
          </NavLink>
        </div>
      </section>
      <section id="our-coaches">
        <h1>Our Coaches</h1>
        <Coaches coaches={coaches} handleClick={handleClick} />
      </section>
      {coach && <CoachProfile coach={coach} />}

      <section id="why">
        <h1>Why GAME ON?</h1>
        <p>
          <strong>Experienced and Knowledgeable Coaches:</strong> <br />
          Our coaches are experts in a variety of esports titles and have a
          proven track record of success.
        </p>
        <p>
          <strong>Personalized Coaching:</strong> <br />
          We offer one-on-one and group coaching sessions so that you can get
          the personalized attention you need.
        </p>
        <p>
          <strong>Affordable Pricing:</strong> <br />
          We offer a variety of coaching packages to fit your budget, committed
          in helping you achieve your esports goals.
        </p>
      </section>
      <section id="about">
        <div className="content2">
          <h1>About GAME ON</h1>
          <br />
          <br />
          <p>
            GAME ON is a premier esports coaching service that helps gamers of
            all levels reach their full potential. We offer one-on-one and group
            coaching sessions with experienced and knowledgeable coaches who can
            help you improve your skills, learn new strategies, and develop a
            winning mindset.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home
