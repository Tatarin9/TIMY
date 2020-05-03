import axios from 'axios';

// all requests that are sent using this instance will overwrite the global defaults in index.js
const instance = axios.create({
    baseURL: 'https://timy-6c706.firebaseio.com'
});

instance.interceptors.request.use(request => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if ( authData !== null ) {
        // check if has query param, then add auth=token
        request.url = request.url.includes('?') ? `${request.url}&auth=${authData.idToken}` : `${request.url}?auth=${authData.idToken}`;
    }
    // console.log(request);
    // edit then return request
    return request;
}, error => {
    // console.log(error);
    // handle the error in the component that sent the request
    return Promise.reject(error);
});

// here is interceptor for response
instance.interceptors.response.use(response => {
    // console.log(response);
    return response;
}, error => {
    // console.log(error.response);
    if (401 === error.response.status) {
        // auto logout if 401 response returned from api
        window.location = '/auth/signin';
    }
    // handle the error in the component that sent the request
    return Promise.reject(error.response);
});

export default instance;
