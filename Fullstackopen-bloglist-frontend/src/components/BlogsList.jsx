import { useEffect, useState, useRef } from 'react'
import BlogCreate from './BlogCreate'
import Blog from './Blog'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { getAll } from '../reducers/blogsReducer'
import Comments from './Comments'


const BlogsList = () => {

    const dispatch = useDispatch()


    const token = useSelector(state => state.sessionUser.convertedToken)

    useEffect(() => {
        dispatch(getAll(token))
    }, [dispatch, token])



    const blogs = useSelector(state => state.blogs)



    const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

    const newBlogFormRef = useRef()

    if (blogs.length === 0) {
        return <p>Fetching data from server...</p>
    } else {
        return (
            <div className='flex flex-col max-w-xl m-auto'>
                <Togglable buttonLabel='New blog' ref={newBlogFormRef}>
                    <BlogCreate newBlogFormRef={newBlogFormRef} />
                </Togglable>

                <p className="text-2xl">Blogs in list</p>
                <ul role="list" className="divide-y divide-gray-100">
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            blogDetailsVisible={blogDetailsVisible}
                            setBlogDetailsVisible={setBlogDetailsVisible} />)}
                </ul>
            </div>
        )
    }
}

export default BlogsList