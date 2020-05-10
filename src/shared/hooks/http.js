import { useReducer, useCallback } from 'react';
import axios from '../../axios';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
};

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                identifier: action.identifier
            };
        case 'RESPONSE':
            return {
                ...curHttpState,
                loading: false,
                data: action.responseData,
                extra: action.extra
            };
        case 'ERROR':
            return {loading: false, error: action.errorMessage};
        case 'CLEAR':
            return initialState;
        default:
            throw new Error('Should not be reached!');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({type: 'CLEAR'}), []);

    const sendRequest = useCallback(
        (url, method, payload, reqExtra, reqIdentifer) => {
            dispatchHttp({type: 'SEND', identifier: reqIdentifer});
            axios[method](url, payload)
                .then(response => {
                    dispatchHttp({
                        type: 'RESPONSE',
                        responseData: response,
                        extra: reqExtra
                    });
                })
                .catch(error => {
                    dispatchHttp({
                        type: 'ERROR',
                        errorMessage: error
                    });
                });
        }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifer: httpState.identifier,
        clear: clear
    };
};

export default useHttp;
