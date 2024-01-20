import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog, addLike } from '../reducers/blogsReducer'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog, blogDetailsVisible, setBlogDetailsVisible }) => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.sessionUser.convertedToken)
  const user = useSelector(state => state.sessionUser)

  const handleDeleteBlog = async () => {
    try {
      const result = dispatch(deleteBlog(token, blog.id))

      if (result === 204) {
        dispatch(showNotification(`blog ${blog.title} was deleted successfully`))

      } else {
        dispatch(showNotification(`blog ${blog.title} wasn't delete`))

      }
    } catch (exception) {
      dispatch(showNotification(`Deleting blog error ${exception}`))
    }
  }

  const handleViewDetails = () => {
    setBlogDetailsVisible(!blogDetailsVisible)
  }

  const handleAddLike = async () => {
    try {
      dispatch(addLike(token, blog))

      dispatch(showNotification(`Like to blog ${blog.title}\nwas added successfully`))
    } catch (exception) {
      dispatch(showNotification(`Adding like error\n${exception}`))
    }
  }



  const item = {
    // flexBasis: '200px'
    // borderStyle: 'solid',
    // borderWidth: '1px',
    // borderRadius: '5px',
    // width: '100px'
    // alignItems: 'baseline',
    flexDirection: 'row',
    // padding: '20px 20px 20px 20px',
    margin: '20px 20px 20px 20px',
    // width: '50vw'
    // position: 'absolute',
    // top: '10px'
  }

  const toggleVisibilityButton1 = {
    display: blogDetailsVisible ? '' : 'none',
    margin: '0 0 0 0'
  }
  const toggleVisibilityButton2 = {
    display: blogDetailsVisible ? 'none' : '',
    margin: '0 0 0 0'
  }


  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">&nbsp;created by: <Link to={`/users/${blog.user.id}`}>{blog.user.name ? blog.user.name : blog.user.username}</Link></p>
      </div>

      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        {user.id === blog.user.id
          ? <button type="button" onClick={handleDeleteBlog} className="border px-3 py-1 rounded-lg"> x </button>
          : false
        }
      </div>
    </li>
  )
}


export default Blog