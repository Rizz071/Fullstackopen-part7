import { useSelector } from 'react-redux'

const Notification = () => {
    const notifications = useSelector(state => state.notification)
    // console.log(notifications)

    const style = {
        display: 'flex',
        flexDirection: 'column',
    }

    return (
        <div style={style}>
            <p>{notifications.map(notification => <span key={Math.round(Math.random() * 10000)}>{notification}<br /></span>)}</p>
        </div>
    )
}

export default Notification