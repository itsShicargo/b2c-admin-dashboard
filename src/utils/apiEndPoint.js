// const BASE_URL = process.env.REACT_PUBLIC_BASE_URL;
const BASE_URL = 'https://api.shipcluescargo.com/'

export const config = {
    authentication: {
        signIn: `${BASE_URL}auth/login/`,
        signUp: `${BASE_URL}auth/register/`,
    }, 
    recharge: {
        createOrder: `${BASE_URL}/transactions/create/order/shipcargo/`,
        verifyPayment: `${BASE_URL}/transactions/shipcargo/verify/payment/`,
    }
}