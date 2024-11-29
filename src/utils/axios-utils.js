import Axios from 'axios';

const axios = Axios.create({})

export const error401 = (error) => {
    if (error.response?.status === 401) {
        // AuthService.logout();
    }
    return Promise.reject(error);
}


export async function request(
    config,
    useResponseData = true
) {
    if (!axios.defaults.baseURL) {
        throw new Error('Error Url is not provided');
    }
    const resp = await axios.request(config);
    if (useResponseData) {

        return resp.data;
    } else {
        return resp;
    }
}


export const throwError = (error) => { console.log({ error }); throw error; }

export default {
    setBaseAPI_URL: (url) => axios.defaults.baseURL = url,

    setHeader: (type = 'Content-Type', value = 'application/json') => {
        axios.defaults.headers.common[type] = value
    },

    // setAuthHeader: (access_token) => axios.defaults.headers.common['Authorization'] = access_token,
    
    setAuthHeader: (access_token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    },

    throwError: (error) => { console.log('Error', error.response); throw error }

}