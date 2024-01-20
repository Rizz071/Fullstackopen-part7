import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import blogsService from '../services/blogsService'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { useSelector } from 'react-redux'

const BlogCreate = ({ newBlogFormRef }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const token = useSelector(state => state.sessionUser.convertedToken)


    const handleCreateBlog = event => {
        event.preventDefault()

        try {
            newBlogFormRef.current.toggleVisibility()

            dispatch(createBlog(token, title, author, url))

            setTitle('')
            setAuthor('')
            setUrl('')

            dispatch(showNotification(`Blog ${title} was created`))

        } catch (exception) {
            console.log(exception)
            dispatch(showNotification(`Creation blog error\n${exception}`))
        }
    }



    return (
        <form onSubmit={handleCreateBlog} >
            <table>
                <caption style={{ textAlign: 'left' }}>
                    <h2>Create new blog</h2>
                </caption>
                <tbody>
                    <tr>
                        <td>
                            Title
                        </td>
                        <td>
                            <input
                                id='title'
                                type='text'
                                value={title}
                                name='title'
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Author
                        </td>
                        <td>
                            <input
                                id='author'
                                type='text'
                                value={author}
                                name='author'
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            URL
                        </td>
                        <td>
                            <input
                                id='url'
                                type='text'
                                value={url}
                                name='url'
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>


            <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="submit">Add blog</button>
        </form >
    )



}


export default BlogCreate