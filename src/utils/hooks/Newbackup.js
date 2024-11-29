// import { useSelector, useDispatch } from 'react-redux'
// import { setUser, initialState } from 'store/auth/userSlice'
// import { apiSignOut } from 'services/AuthService'
// import { useNavigate } from 'react-router-dom'
// import appConfig from 'configs/app.config'
// import { signUpapi, signIn as signInAPI } from 'services/LiveApi'
// import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
// import { REDIRECT_URL_KEY } from 'constants/app.constant'
// import useQuery from './useQuery'

// // import { signUpapi } from 'services/LiveApi'

// function useAuth() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const query = useQuery()
//     const { token, signedIn } = useSelector((state) => state.auth.session)

//     const signIn = async (values) => {
//         try {
//             console.log('login values', values);
//             const resp = await signInAPI(values);
    
//             // Assuming resp.data[0] contains metadata and resp.data[1] contains the access token
//             const token = resp.data[1]; // Access token
    
//             if (token) {
//                 dispatch(onSignInSuccess(token));
    
//                 // Assuming resp.data[0][0] contains user details
//                 const user = resp.data[0][0];
//                 if (user) {
//                     dispatch(
//                         setUser({
//                             // avatar: '',
//                             // userid: user.user_id, 
//                             // authority: ['USER'],
//                             // email: user.email || '',
//                             first_name: values.first_name,
//                             last_name: values.last_name,
//                             company_name: values.company_name,
//                             brand_name: values.brand_name,
//                             monthly_order: values.monthly_order,
//                             email: values.email,
//                             password: values.password,
//                             mob_no: values.mob_no,  
//                         })
//                     );
//                 }
    
//                 const redirectUrl = query.get(REDIRECT_URL_KEY);
//                 navigate(
//                     redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
//                 );
    
//                 return {
//                     status: 'success',
//                     message: 'Welcome to shipcargo',
//                 };
//             }
//         } catch (errors) {
//             return {
//                 status: 'failed',
//                 message: errors?.response?.data?.message || errors.toString(),
//             };
//         }
//     };
    
//     // Signup api calling

//     const signUp = async (values) => {
//         try {
//             const resp = await signUpapi(values)
//             if (resp.data) {
//                 console.log("token",resp.data)
//                 const { token } = resp.data
//                 dispatch(onSignInSuccess(token))
//                 if (resp.data.user) {
//                     dispatch(
//                         setUser(
//                             resp.data.user || {
//                                 avatar: '',
//                                 userName: '',
//                                 authority: ['USER'],
//                                 email: '',
//                                 first_name: '',
//                             }
//                         )
//                     )
//                 }
//                 const redirectUrl = query.get(REDIRECT_URL_KEY)
//                 navigate(
//                     redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
//                 )
//                 return {
//                     status: 'success',
//                     message: '',
//                 }
//             }
//         } catch (errors) {
//             return {
//                 status: 'failed',
//                 message: errors?.response?.data?.message || errors.toString(),
//             }
//         }
//     }

//     const handleSignOut = () => {
//         dispatch(onSignOutSuccess())
//         dispatch(setUser(initialState))
//         navigate(appConfig.unAuthenticatedEntryPath)
//     }

//     const signOut = async () => {
//         // await apiSignOut()
//         handleSignOut()
//     }

//     return {
//         authenticated: token && signedIn,
//         signIn,
//         signUp,
//         signOut,
//     }
// }

// export default useAuth
