import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getComments, postComment, deleteComment } from '../reducers/commentsReducer'
import { useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'



const Comments = ({ blog }) => {

    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const token = useSelector(state => state.sessionUser.convertedToken)

    const comments = useSelector(state => state.comments)
    const sessionUser = useSelector(state => state.sessionUser)

    useEffect(() => {
        dispatch(getComments(blog))
    }, [dispatch, blog])

    const handleCreateComment = event => {
        event.preventDefault()

        dispatch(postComment(token, value, blog))
        dispatch(showNotification(`Comment ${value} added`))
        setValue('')

    }

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId, token))
        dispatch(showNotification(`Comment ${commentId} was deleted`))
    }

    const convertDate = value => {
        const date = new Date(value)
        return date.toISOString().split('T')[0]
    }


    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={handleCreateComment}>
                <input id='comments'
                    type='text'
                    value={value}
                    name='comments'
                    onChange={(event) => setValue(event.target.value)}>
                </input>
                <button type='submit'>Submit comment</button>
            </form>
            <ul>{comments.map(comment =>
                <li style={{ margin: '0 0 10px 0' }} key={comment.id}>
                    [{convertDate(comment.date)}] {comment.comment} <br />by {comment.user && comment.user.name}
                    {comment.user.id === sessionUser.id && <button style={{ margin: '0 0 0 3px' }} onClick={() => handleDeleteComment(comment.id)}> x </button>}
                </li>)}
            </ul>
        </div >
    )

}

export default Comments