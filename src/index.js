import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import axios from 'axios';
//
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// // axios.defaults.headers.post['Content-Type'] = 'application/json'; // default
//
// // this one is for failure on request send (like no internet)
// axios.interceptors.request.use(request => {
//     console.log(request);
//     // edit then return request
//     return request;
// }, error => {
//     console.log(error);
//     // handle the error in the component that sent the request
//     return Promise.reject(error);
// });
//
// // here is interceptor for response
// axios.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     console.log(error);
//     // handle the error in the component that sent the request
//     return Promise.reject(error);
// });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
