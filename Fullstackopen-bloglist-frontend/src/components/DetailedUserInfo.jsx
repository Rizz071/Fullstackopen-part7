import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { requestUsers } from '../reducers/usersListReducer'

const DetailedUserInfo = () => {


    const usersArray = useSelector(state => state.usersList)
    console.log(usersArray)

    const id = useParams().id

    const user = usersArray.find(user => user.id === id)

    if (!user) {
        return <p>Fetching data from server...</p>
    } else {
        return (
            <div>
                <h2>{user.name}</h2>
                <strong>Added blogs</strong>
                <ul>
                    {user.blogs.map(blog => <li key={Math.round(Math.random() * 10000)}><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></li>)}
                </ul>
            </div>
        )
    }
}


export default DetailedUserInfo