import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, Client } from '../../Globals'
import axios from 'axios'
import moment from 'moment'
moment().format()

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Button from '@mui/material/Button'

const Sessions = ({
  user,
  coaches,
  sessionToEdit,
  setSelectedSession,
  notify
}) => {
  const [games, setGames] = useState([
    'Roblox',
    'Call of duty',
    'Fortnite',
    'Rainbow Six Siege',
    'Minecraft',
    'Apex Legends',
    'CSGO'
  ])
  const [sessionTypes, setSessionType] = useState([
    {
      type: 'Standard Training',
      price: '35 BHD',
      description:
        'Esports veterans who have competed against some of the greatest talent in their respective games and are recognized for their success on global competition stages. They have extensive coaching experience at the highest levels of play.'
    },
    {
      type: 'Advanced Training',
      price: '60 BHD',
      description:
        "Trained experts who've earned a distinguished place within the esports community through extensive experience coaching national teams and the next generation of esports pros. These Sensei are committed coaches devoted to coaching students and improving play at all ranks"
    },
    {
      type: 'Godly Training',
      price: '100 BHD',
      description:
        'Esports Gods who have competed against some of the greatest talent in their respective games and are recognized for their success on global competition stages. They have extensive coaching experience at the highest levels of play.'
    }
  ])
  const [selectedSessionType, setselectedSessionType] = useState(
    sessionTypes[0]
  )
  let navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [])

  let startingFormState = {
    game: '',
    date: '',
    sessionType: 'Standard Training',
    coach: '',
    userId: user.id
  }

  if (sessionToEdit) {
    startingFormState = sessionToEdit
  }

  const [formState, setFormState] = useState(startingFormState)

  const handleChange = (event) => {
    event.preventDefault()
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleDate = (event) => {
    setFormState({ ...formState, date: event.$d })
  }

  const bookSession = async () => {
    const response = sessionToEdit
      ? await Client.post(
          `${BASE_URL}/gamesession/edit/${sessionToEdit._id}`,
          formState
        )
      : await Client.post(`${BASE_URL}/gamesession/create`, formState)
    notify(response)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    bookSession()
    setFormState(startingFormState)
    setSelectedSession && setSelectedSession(null)
    navigate('/profile')
  }

  return (
    <div className="full-page">
      <form>
        <h1>Choose Your Game</h1>
        <ToggleButtonGroup
          color="primary"
          value={formState.game}
          exclusive
          aria-label="Platform"
          size="large"
        >
          {games.map((game) => (
            <ToggleButton
              key={game}
              id="game"
              size="large"
              value={game}
              onClick={(event) => {
                handleChange(event)
              }}
            >
              {game}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <h1>Session Date</h1>
        <div className="date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              onChange={(event) => handleDate(event)}
              defaultValue={dayjs(formState.date)}
              minDate={dayjs(moment().add(1, 'days'))}
              format="D MMMM YYYY hh:00"
              minuteStep={60}
            />
          </LocalizationProvider>
        </div>

        <h1>Session Type</h1>
        <div className="sessionType">
          <ToggleButtonGroup
            color="primary"
            value={formState.sessionType}
            exclusive
            aria-label="Platform"
            size="large"
          >
            {sessionTypes.map((sessionType) => (
              <ToggleButton
                key={sessionType.type}
                id="sessionType"
                size="large"
                value={sessionType.type}
                onClick={(event) => {
                  setselectedSessionType(sessionType)
                  handleChange(event)
                }}
              >
                {sessionType.type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <h2>{selectedSessionType.price}</h2>
          <h2>{selectedSessionType.description}</h2>
        </div>

        <h1>Choose Your Coach</h1>
        <div className="coaches-select">
          <ToggleButtonGroup
            color="primary"
            value={formState.coach}
            exclusive
            aria-label="Platform"
            size="large"
          >
            {coaches.map(
              (coach) =>
                coach.games.includes(formState.game) && (
                  <ToggleButton
                    key={coach.name}
                    id="coach"
                    size="large"
                    value={coach.name}
                    onClick={(event) => {
                      handleChange(event)
                    }}
                  >
                    {coach.name}
                  </ToggleButton>
                )
            )}
          </ToggleButtonGroup>
        </div>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  )
}

export default Sessions
