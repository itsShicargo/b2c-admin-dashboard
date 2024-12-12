// const BASE_URL = process.env.REACT_PUBLIC_BASE_URL;
const BASE_URL = 'https://shipclues.com/'

export const config = {
    authentication: {
        signIn: `${BASE_URL}api/employee/login`,
        signUp: `${BASE_URL}auth/register/`,
    }, 
    dashboard: {
        employee: `${BASE_URL}api/employee/dashboard`,
    }
}