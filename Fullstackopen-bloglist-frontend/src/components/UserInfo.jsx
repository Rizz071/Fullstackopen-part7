import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeSignedInUser } from '../reducers/sessionUserReducer'
import { useEffect } from 'react'
import { requestUsers } from '../reducers/usersListReducer'

const UserInfo = ({ loggedUser }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(requestUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogout = () => {
        navigate('/')
        dispatch(removeSignedInUser())
    }

    if (loggedUser) {

        const inline_style = {
            display: 'flex',
            alignItems: 'baseline',
            margin: '0 0 0 0',

        }

        return (
            <div style={inline_style} >
                <span><strong>{loggedUser.name}</strong> logged in&nbsp;</span>
                <button type='button' className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' onClick={handleLogout}> Logout </button>
            </div >
        )
    }
}


export default UserInfo