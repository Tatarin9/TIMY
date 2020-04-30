import React, {Component, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import Layout from './features/Layout/Layout';
import rootReducer from './store/reducer';

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

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(loggerMiddleware)));

const app = props => {

    // check auto auth here
    useEffect(() => {

    }, []);

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </Provider>
        );
}

export default app;
