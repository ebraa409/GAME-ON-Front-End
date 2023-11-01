import { useState } from 'react'
import axios from 'axios'
import { BASE_URL, Client } from '../../Globals'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Coaches from './Coaches'

const AddReview = ({
  user,
  selectedSession,
  setSelectedSession,
  coaches,
  notify
}) => {
  const [coach, setCoach] = useState(
    coaches.filter((obj) => {
      return obj.name == selectedSession.coach
    })[0]
  )
  const [formState, setFormState] = useState({
    comment: '',
    rating: 5,
    user: user.id
  })
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (sessionID, coachID) => {
    let response = await Client.post(
      `${BASE_URL}/add_review?coach_id=${coachID}`,
      formState
    )
    await Client.get(`${BASE_URL}/gamesession/delete/${sessionID}`)
    notify(response)
    setSelectedSession(null)
  }

  return (
    coach && (
      <div className="full-page">
        <form>
          <h1>Add review</h1>
          <Coaches coaches={[coach]} />

          <div>
            <h2>Rating</h2>
            <Rating
              name="simple-controlled"
              size="large"
              precision={0.5}
              value={formState.rating}
              onChange={(event) => {
                setFormState({
                  ...formState,
                  rating: parseFloat(event.target.value)
                })
              }}
            />
          </div>

          <input
            type="text"
            id="comment"
            onChange={(event) => {
              handleChange(event)
            }}
          />

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => handleSubmit(selectedSession._id, coach._id)}
          >
            add review
          </Button>
        </form>
      </div>
    )
  )
}

export default AddReview
