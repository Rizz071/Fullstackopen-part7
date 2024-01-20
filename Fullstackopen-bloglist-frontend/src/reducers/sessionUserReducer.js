import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {}

const sessionUserSlice = createSlice({
    name: 'sessionUser',
    initialState,
    reducers: {
        addSignedInUser(state, action) {
            return action.payload
        },
        removeSignedInUser(state, action) {
            window.localStorage.removeItem('loggedBlogsAppUser')
            return {}
        },
        addBearer(state, action) {
            state.convertedToken = `Bearer ${action.payload.token}`
        }
    },
})




export const { addSignedInUser, removeSignedInUser, addBearer } = sessionUserSlice.actions


export const login = (credentials) => {
    return async dispatch => {
        const baseUrl = '/api/login'

        try {
            const response = await axios.post(baseUrl, credentials)
            dispatch(addSignedInUser(response.data))

            window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(response.data))
            dispatch(addBearer(response.data))
        }
        catch (error) {
            console.log('Wrong credentials', error)
            return error
        }
    }
}




export default sessionUserSlice.reducer