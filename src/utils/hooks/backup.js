// import { useSelector, useDispatch } from 'react-redux';
// import { setUser, initialState } from 'store/auth/userSlice';
// import { apiSignOut } from 'services/AuthService';
// import { useNavigate } from 'react-router-dom';
// import appConfig from 'configs/app.config';
// import { signUpapi, signIn as signInAPI } from 'services/LiveApi';
// import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice';
// import { REDIRECT_URL_KEY } from 'constants/app.constant';
// import useQuery from './useQuery';
// import { useEffect } from 'react';

// function useAuth() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const query = useQuery();
//     const { token, signedIn } = useSelector((state) => state.auth.session);

//     // Timeout settings for 1 hour (60 minutes)
//     const TIMEOUT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
//     let logoutTimer = null;

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

//                 // Start or reset logout timer on successful login
//                 startLogoutTimer();
    
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

//                 // Start or reset logout timer on successful signup
//                 startLogoutTimer();
    
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

//         // Clear the logout timer on sign out
//         clearLogoutTimer();
//     }

//     const signOut = async () => {
//         // await apiSignOut()
//         handleSignOut()
//     }

//     // Function to start or reset the logout timer
//     const startLogoutTimer = () => {
//         clearLogoutTimer(); // Clear existing timer if it exists
//         logoutTimer = setTimeout(() => {
//             // Perform logout actions after timeout
//             handleSignOut();
//         }, TIMEOUT_DURATION);
//     };

//     // Function to clear the logout timer
//     const clearLogoutTimer = () => {
//         if (logoutTimer) {
//             clearTimeout(logoutTimer);
//             logoutTimer = null;
//         }
//     };

//     // Reset the logout timer on user activity
//     const handleUserActivity = () => {
//         if (signedIn) {
//             startLogoutTimer();
//         }
//     };

//     // Attach event listeners to reset the timer on user activity
//     useEffect(() => {
//         const resetTimeoutOnActivity = () => {
//             handleUserActivity();
//         };

//         // Attach event listeners for user activity
//         window.addEventListener('mousemove', resetTimeoutOnActivity);
//         window.addEventListener('keypress', resetTimeoutOnActivity);
        
//         // Clear the logout timer when the component unmounts
//         return () => {
//             window.removeEventListener('mousemove', resetTimeoutOnActivity);
//             window.removeEventListener('keypress', resetTimeoutOnActivity);
//             clearLogoutTimer();
//         };
//     }, [signedIn]);

//     return {
//         authenticated: token && signedIn,
//         signIn,
//         signUp,
//         signOut,
//     };
// }

// export default useAuth;
