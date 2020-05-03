import {useEffect, useState} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

// clear error when request is fired
    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });

    const resInterceptor = httpClient.interceptors.response.use(response => response, err => {
        setError(err);
    });

// this class instance is created multiple times for each component that it wraps over,
// so there may be memory leaks to cleaned here
// clear interceptors
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];

}

