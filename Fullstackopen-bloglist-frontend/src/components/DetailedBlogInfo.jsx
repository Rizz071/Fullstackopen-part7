import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showNotification } from '../reducers/notificationReducer'
import { addLike } from '../reducers/blogsReducer'
import Comments from './Comments'
import { useEffect } from 'react'
import { getAll } from '../reducers/blogsReducer'

const DetailedBlogInfo = () => {

    const dispatch = useDispatch()

    const id = useParams().id
    let token = useSelector(state => state.sessionUser.convertedToken)

    useEffect(() => {
        dispatch(getAll(token))
    }, [dispatch, token])


    const blogs = useSelector(state => state.blogs)

    const blog = blogs.find(blog => blog.id === id)


    const handleAddLike = async () => {
        try {
            dispatch(addLike(token, blog))

            dispatch(showNotification(`Like to blog ${blog.title}\nwas added successfully`))
        } catch (exception) {
            dispatch(showNotification(`Adding like error\n${exception}`))
        }
    }


    if (!blog) {
        return <p>Fetching data from server...</p>
    } else {
        return (
            <div>
                <h2>{blog.title}</h2>
                <a href={blog.url}>{blog.url}</a>
                <span>&nbsp;likes: {blog.likes}</span> <button style={{ margin: '0 0 0 3px' }} onClick={handleAddLike}>&#128077;</button>
                <p>added by {blog.author}</p>
                <ul>
                    { }
                </ul>
                <Comments blog={blog} />
            </div >
        )
    }
}


export default DetailedBlogInfo