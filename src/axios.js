import axios from 'axios';

// all requests that are sent using this instance will overwrite the global defaults in index.js
const instance = axios.create({
    baseURL: 'https://AAAtimy-6c706.firebaseio.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;
