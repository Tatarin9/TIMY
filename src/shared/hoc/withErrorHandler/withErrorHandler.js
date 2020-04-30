import React, {Component, useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        // constructor(props) {
        //     super(props);
        const [error, setError] = useState(null);

        // clear error when request is fired
        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });

        const resInterceptor = axios.interceptors.response.use(response => response, err => {
            setError({err});
        });

        // this class instance is created multiple times for each component that it wraps over,
        // so there may be memory leaks to cleaned here
        // clear interceptors
        useEffect(() => {
            return () => {
                console.log('Will unmount');
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={!!error}
                    onClose={() => {
                        this.setState({error: null})
                    }}
                    autoHideDuration={5000}
                    message={error ? error.message : null}
                />
                <WrappedComponent {...props}/>
            </React.Fragment>
        );
    }
}

export default withErrorHandler;
