import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setFetchedBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            return state.concat(action.payload)
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        },
        addLikeToBlog(state, action) {
            const blog = state.find(blog => blog.id === action.payload)
            blog.likes += 1
            state.sort((a, b) => {
                if (a.likes < b.likes) {
                    return 1
                }
                if (a.likes > b.likes) {
                    return -1
                }
            })
        }
    },
})


export const { setFetchedBlogs, addBlog, removeBlog, addLikeToBlog, putComment } = blogsSlice.actions

const baseUrl = '/api/blogs'

export const getAll = (token) => {
    return async dispatch => {
        try {
            const request = await axios.get(baseUrl, { headers: { Authorization: token } })

            request.data.sort((a, b) => {
                if (a.likes < b.likes) {
                    return 1
                }
                if (a.likes > b.likes) {
                    return -1
                }

                // names must be equal
                return 0
            })

            dispatch(setFetchedBlogs(request.data))
        }
        catch (error) {
            console.log('error occured while fetching users from server', error)
            // if (error.response.status === 401) localStorage.clear()
            return error
        }
    }
}


export const createBlog = (token, title, author, url) => {
    return async dispatch => {
        const request = await axios.post(
            baseUrl,
            {
                'title': title,
                'author': author,
                'url': url,
                'likes': 0
            },
            {
                headers: { Authorization: token },
                'Content-Type': 'application/json'
            }
        )
        dispatch(addBlog(request.data))
    }
}


export const deleteBlog = (token, id) => {
    return async dispatch => {
        if (window.confirm('Do you really want to delete blog?')) {
            const request = await axios.delete(
                `${baseUrl}\\${id}`,
                {
                    headers: { Authorization: token },
                    'Content-Type': 'application/json'
                }
            )
            dispatch(removeBlog(id))
        }
        return null
    }
}

export const addLike = (token, blog) => {
    return async dispatch => {

        const blogObject = { ...blog }
        blogObject.likes += 1

        try {
            const request = await axios.put(
                `${baseUrl}\\${blog.id}`,
                blogObject,
                {
                    headers: { Authorization: token },
                    'Content-Type': 'application/json'
                }
            )
            dispatch(addLikeToBlog(blog.id))
        }
        catch (error) {
            console.log('like wasn\'t added because of error', error)
        }
    }
}

export default blogsSlice.reducer