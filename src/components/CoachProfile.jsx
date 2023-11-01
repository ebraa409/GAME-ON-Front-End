import { BASE_URL } from '../../Globals'

import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

const CoachProfile = ({ coach }) => {
  const findAvg = (arr) => {
    let sum = 0
    arr.forEach((review) => {
      sum += review.rating
    })
    return parseFloat(sum ? (sum /= arr.length).toFixed(2) : 0)
  }
  return (
    <section id="coach-profile">
      <div className="details-container">
        <h1>{coach.name}</h1>
        <img src={`${BASE_URL}/${coach.profile_image}`} alt="" />
        <h2>{coach.description}</h2>
        <h3>avrage rating: {findAvg(coach.reviews)}</h3>
        <Rating
          name="read-only"
          value={findAvg(coach.reviews)}
          precision={0.5}
          readOnly
          size="large"
        />
      </div>
      <div className="reviews-container">
        <h3>reviews:</h3>
        {coach.reviews.map((reviwe) => (
          <div className="review" key={reviwe._id}>
            <h4>{reviwe.user.firstName + ':  ' + reviwe.comment}</h4>
            <Rating
              className="rating"
              name="read-only"
              value={findAvg(coach.reviews)}
              precision={0.5}
              readOnly
              size="small"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CoachProfile
