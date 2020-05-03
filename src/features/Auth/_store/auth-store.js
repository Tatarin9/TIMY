import { initStore } from '../../../shared/hooks-store/store';

const initialState = {
    isAuthLoading: false,
    authData: null,
    authError: null
}

const configureStore = () => {
    const actions = {
        AUTH_REQUEST: () => ({isAuthLoading: true}),
        AUTH_SUCCESS: (resAuthData) => {
            console.log('hey hey');
            console.log(resAuthData);
            return {isAuthLoading: false, authData: resAuthData, authError: null};
        },
        AUTH_FAILURE: (err) => ({isAuthLoading: false, authError: err}),
        AUTH_CLEAR: () => ({isAuthLoading: false, authData: null, authError: null}),
    };
    initStore(actions, initialState);
};

export default configureStore;
