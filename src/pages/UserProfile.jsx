import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, Client } from '../../Globals'
import Sessions from '../components/Sessions'
import AddReview from '../components/AddReview'
import moment from 'moment'
moment().format()

import Button from '@mui/material/Button'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'

const UserProfile = ({ user, setUser, coaches, notify }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [message, setMessage] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const navigate = useNavigate()
  moment.locale('en-gb')

  const handleUser = async () => {
    if (user) {
      let response = await Client.get(`${BASE_URL}/profile?userid=${user.id}`)
      let sessionResponse = await Client.get(
        `${BASE_URL}/gamesession/get?userId=${user.id}`
      )
      setUserInfo({ ...response.data, ...sessionResponse })
    } else {
      navigate('/signin')
    }
  }

  const deleteSession = async (id) => {
    let response = await Client.get(`${BASE_URL}/gamesession/delete/${id}`)
    notify(response)
    setMessage(response.data.msg)
  }

  const logout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setUser(null)
    navigate('/signin')
  }

  useEffect(() => {
    handleUser()
  }, [message, selectedSession])

  return (
    userInfo && (
      <div className="full-page" id="profilep">
        <ToastContainer toastStyle={{ backgroundColor: 'black' }} />
        <Button
          variant="outlined"
          color="error"
          id="logout-button"
          onClick={logout}
        >
          logout
        </Button>

        <div className="userInfo">
          <h2>Profile Details</h2>
          <div>
            <h4>
              Name: {userInfo.firstName} {userInfo.lastName}
            </h4>
          </div>
          <div>
            <h4>Email: {userInfo.emailAddress}</h4>
          </div>
          <div>
            <h4>Age: {userInfo.age}</h4>
          </div>
          <div>
            <h4>Discord: {userInfo.discordAccount}</h4>
          </div>
        </div>
        {userInfo.data.length !== 0 && (
          <table className="Schedule">
            <tbody>
              <tr className="tableformat">
                <th>Game</th>
                <th>Date</th>
                <th>Session Type</th>
                <th>Coach</th>
                <th>Status</th>
              </tr>
            </tbody>
            {userInfo.data.map((session) => (
              <tbody key={session._id}>
                <tr>
                  <td className="details">{session.game}</td>
                  <td className="details">
                    {moment(session.date).format('llll')}
                  </td>
                  <td className="details">{session.sessionType}</td>
                  <td className="details">{session.coach}</td>
                  {moment().isBefore(session.date) ? (
                    <td>
                      <IconButton
                        color="secondary"
                        aria-label="add an alarm"
                        size="large"
                        onClick={() => setSelectedSession(session)}
                      >
                        <EditCalendarIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        color="error"
                        onClick={() => deleteSession(session._id)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                    </td>
                  ) : (
                    <td>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        color="success"
                        onClick={() => setSelectedSession(session)}
                      >
                        <ThumbsUpDownIcon fontSize="large" />
                      </IconButton>
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
          </table>
        )}
        {selectedSession &&
          (moment().isBefore(selectedSession.date) ? (
            <Sessions
              user={user}
              sessionToEdit={selectedSession}
              setSelectedSession={setSelectedSession}
              coaches={coaches}
              notify={notify}
            />
          ) : (
            <AddReview
              user={user}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              coaches={coaches}
              notify={notify}
            />
          ))}
      </div>
    )
  )
}

export default UserProfile
