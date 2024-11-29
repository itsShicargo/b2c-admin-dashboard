import BaseService from './BaseService';

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response);
                })
                .catch((errors) => {
                    reject(errors);
                });
        });
    },

    // signOut(token) {
    //     return new Promise((resolve, reject) => {
    //         BaseService.post('/api/sign-out', { token })
    //             .then((response) => {
    //                 resolve(response.data); // Assuming response.data contains useful data
    //             })
    //             .catch((error) => {
    //                 reject(error); // Handle error
    //             });
    //     });
    // },
};

export default ApiService;
