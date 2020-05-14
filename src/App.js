import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './features/Layout/Layout';

const loggerMiddleware = store => {
    return next => {
        return action => {
            // console.log('[Logger Middleware] Dispatching', action);
            const result = next(action);
            // console.log('[Logger Middleware] Next state', store.getState());
            return result;
        }
    }
}

const app = props => {
    // check auto auth here
    useEffect(() => {

    }, []);

    return (
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    );
}

export default app;
