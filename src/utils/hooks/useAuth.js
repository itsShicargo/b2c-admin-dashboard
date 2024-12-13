import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
// import { apiSignOut } from 'services/AuthService'
import { useNavigate } from 'react-router-dom'
import appConfig from 'configs/app.config'
// import { signUpapi, signIn as signInAPI } from 'services/LiveApi'
import { logIn, createNewUser } from 'services/authentication'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            const resp = await logIn(values)
            const token = resp.data 
            const accessToken = token.token
            localStorage.setItem('token', accessToken) 
            
            if (token) {
                dispatch(onSignInSuccess(token))
                const user = resp.data[0][0]
                if (user) {
                    dispatch(setUser(user))
                }
    
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
    
                return {
                    status: 'success',
                    message: 'Welcome to shipcargo',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    
    // Signup api calling
    const signUp = async (values) => {
        try {
            const resp = await createNewUser(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                username: '',
                                password: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        // await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
