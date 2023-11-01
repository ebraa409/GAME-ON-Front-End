import { BASE_URL } from '../../Globals'

import * as React from 'react'
import Rating from '@mui/material/Rating'

const findAvg = (arr) => {
  let sum = 0
  arr.forEach((review) => {
    sum += review.rating
  })
  return parseFloat(sum ? (sum /= arr.length).toFixed(2) : 0)
}

const Coaches = ({ coaches, handleClick }) => {
  return (
    <div className="coaches-container">
      {coaches.map((coach) => (
        <div
          key={coach.name}
          className="coach-card"
          onClick={() => {
            handleClick && handleClick(coach)
          }}
        >
          <h2>{coach.name}</h2>
          <img src={`${BASE_URL}/${coach.profile_image}`} alt="" />

          <div className="rating">
            <Rating
              name="read-only"
              value={findAvg(coach.reviews)}
              precision={0.5}
              readOnly
              size="large"
            />
            <h2>({coach.reviews.length})</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Coaches
