export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CHECK_STATUS = 'AUTH_CHECK_STATUS';


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
export const authCheckStatus = () => {
    return {
        type: AUTH_CHECK_STATUS
    };
}

export const authLogoutAction = (pathBeforeLogout) => {
    return {
        type: AUTH_LOGOUT,
        payload: {pathBeforeLogout: pathBeforeLogout}
    };
}
