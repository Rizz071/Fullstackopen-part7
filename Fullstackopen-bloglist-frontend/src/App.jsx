import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import Togglable from './components/Togglable'
import { addSignedInUser, addBearer } from './reducers/sessionUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import UsersList from './components/UsersList'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import DetailedUserInfo from './components/DetailedUserInfo'
import DetailedBlogInfo from './components/DetailedBlogInfo'
import NavBar from './components/NavBar'
import { getAll } from './reducers/blogsReducer'
import { requestUsers } from './reducers/usersListReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.sessionUser)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(addSignedInUser(user))
      dispatch(addBearer(user))
    }
  }, [dispatch])


  return (
    <Router>
      <NavBar loggedUser={sessionUser} />
      {sessionUser.name && <UserInfo loggedUser={sessionUser} />}

      <p className='text-3xl'>BLOGS Application</p>

      <Notification message={message} />

      <Routes>

        <Route path="/users/:id" element={<DetailedUserInfo />} />
        <Route path="/users/" element={<UsersList />} />
        <Route path="/blogs/:id" element={<DetailedBlogInfo />} />

        <Route path="/" element={
          <>
            {!sessionUser.name
              ? <Togglable buttonLabel='Login' >
                <LoginForm
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                />
              </Togglable>
              : <div>
                <BlogsList />
              </div>
            }
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App