export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const authRequestAction = () => {
    return {
        type: AUTH_REQUEST,
    };
}

export const authSuccessAction = (authData) => {
    return {
        type: AUTH_SUCCESS,
        payload: {authData: authData}
    };
}

export const authFailureAction = (error) => {
    return {
        type: AUTH_FAILURE,
        payload: {error: error}
    };
}
