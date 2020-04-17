import * as actionTypes from './auth-actions'

const initialState = {
    authData: null,
    isLoading: false,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                authData: action.payload.authData,
                isLoading: false,
                error: null
            };
        case actionTypes.AUTH_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false
            };
        default:
            return state;
    }
}

export default authReducer;
