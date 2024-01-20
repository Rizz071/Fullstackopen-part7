import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            state.push(action.payload)
        },
        removeNotification(state, action) {
            state.shift()
        }

    },
})




export const { addNotification, removeNotification } = notificationSlice.actions


export const showNotification = (message) => {
    return async dispatch => {
        dispatch(addNotification(message))

        setTimeout(() => {
            dispatch(removeNotification())
        }, 3000)

    }
}


export default notificationSlice.reducer