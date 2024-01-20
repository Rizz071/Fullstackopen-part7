import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const usersListReducer = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        createUsersList(state, action) {
            return action.payload
        }
    },
})




export const { createUsersList } = usersListReducer.actions


export const requestUsers = () => {
    return async dispatch => {
        try {
            const fetchedUsers = await axios.get('http://127.0.0.1:3003/api/users')
            dispatch(createUsersList(fetchedUsers.data))
        }
        catch (error) {
            console.log('error occured while fetching users from server')
        }
    }
}

export default usersListReducer.reducer