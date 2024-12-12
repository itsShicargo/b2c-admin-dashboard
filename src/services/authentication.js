import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { config } from 'utils/apiEndPoint';

export async function logIn(payload) {
    try {
        const response = await axios.post(`${config?.authentication?.signIn}`, payload);
        localStorage.setItem('token', response?.data?.token)
        localStorage.setItem('refresh-token', response?.data?.refresh)
        return response;

    } catch (e) {
        console.error('Error in signIn API:', e);
    }
}      
export async function createNewUser(payload) {
    try {
        const response  = await axios.post(`${config?.authentication?.signUp}`, payload)
        console.log(response, 'checking the response')
        // return response
    }  catch(e) {
        console.log(e)
    }
}

// Function to get the current user
export function getCurrentUser() {
    try {
        const token = localStorage.getItem('token');
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};
