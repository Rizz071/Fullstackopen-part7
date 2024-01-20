import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/sessionUserReducer'

const LoginForm = ({ username, setUsername, password, setPassword }) => {
    const dispatch = useDispatch()


    const handleLogin = async (event) => {
        event.preventDefault()

        const result = await dispatch(login({ username, password }))


        setUsername('')
        setPassword('')

        if (result?.response.data.error) {
            dispatch(showNotification(result.response.data.error))
            console.log(result)
            return
        }

        dispatch(showNotification(`Good day, ${username}!`))
    }


    return (
        <div className="mx-auto max-w-2xl">
            <form onSubmit={handleLogin} >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='text'
                                        value={username}
                                        name='Username'
                                        onChange={(event) => setUsername(event.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='password'
                                        value={password}
                                        name='Password'
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>


                        <button className="mt-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type='submit'>Login</button>
                    </div>
                </div>
            </form >
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
}


export default LoginForm