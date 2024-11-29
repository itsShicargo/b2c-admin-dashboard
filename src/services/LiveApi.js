import axios from 'axios';
import axiosInstance from './_authHttp';

export async function signIn(body) {
    try {
        const response = await axios.post(`https://api.shipcluescargo.com/auth/login/`, body);
        console.log("response",response)
        return response;
        
    } catch (e) {
        console.error('Error in signIn API:', e);
        throw e; 
    }
}      
export async function signUpapi(body) {
    try {
        const response  = await axios.post(`https://api.shipcluescargo.com/auth/register/`, body)
        return response
    }  catch(e) {
        console.log(e)
        return e
    }
}

// create order razorpay 
export const razorpayCreateOrder = async (data, paymentError) => {
    try{
       const response = await axiosInstance.post(
          `https://api.shipcluescargo.com/transactions/create/order/shipcargo/`, 
          data
      );
      return response?.data?.data;
    }catch(error){
        paymentError()
        console.log(error)
    }
  };


export const paymentVerify = async (data, paymentSuccess,  paymentError) => {
    const payload = {
        "razorpay_order_id": data?.order_id,
        "razorpay_payment_id": data?.razorpay_payment_id,
        "razorpay_signature": data?.razorpay_signature
    };

    try {
        const response = await axios.post(
            'https://api.shipcluescargo.com/transactions/shipcargo/verify/payment/',
            payload
        );  
        if(response){
          paymentSuccess()
        }

    } catch (error) {
        paymentError()
        console.error(error.response ? error.response.data : error.message);
    }
};
