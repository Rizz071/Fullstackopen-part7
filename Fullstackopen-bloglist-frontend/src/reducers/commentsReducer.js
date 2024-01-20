import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        addComment(state, action) {
            return state.concat(action.payload)
        },
        delComment(state, action) {
            return state.filter(comment => {
                // console.log(comment.id, action.payload)
                return comment.id !== action.payload
            })
        }
    },
})


export const { setComments, addComment, delComment } = commentsSlice.actions

export const getComments = (blog) => {
    return async dispatch => {
        try {

            const request = await axios.get(`/api/comments/${blog.id}`)
            // console.log(blog.id)
            // request.data.sort((a, b) => {
            //     if (a.likes < b.likes) {
            //         return 1
            //     }
            //     if (a.likes > b.likes) {
            //         return -1
            //     }

            //     // names must be equal
            //     return 0
            // })

            dispatch(setComments(request.data))
        }
        catch (error) {
            console.log('comments not founded on server', error)
        }
    }
}


export const postComment = (token, comment, blog) => {
    return async dispatch => {
        const request = await axios.post(
            `/api/comments/${blog.id}`,
            {
                'comment': comment,
                'date': Date.now()
            },
            {
                headers: { Authorization: token },
                'Content-Type': 'application/json'
            }
        )
        dispatch(addComment(request.data))
    }
}

export const deleteComment = (commentId, token) => {
    return async dispatch => {
        try {
            const request = await axios.delete(`/api/comments/${commentId}`,
                {
                    headers: { Authorization: token },
                    'Content-Type': 'application/json'
                }
            )
            dispatch(delComment(commentId))
        }
        catch (error) {
            console.log('Comment wasn\'t delete because of error: ', error)
        }

    }
}



export default commentsSlice.reducer