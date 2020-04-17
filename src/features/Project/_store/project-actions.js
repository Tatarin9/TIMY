export const GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST';
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';

export const getProjectRequestAction = () => {
    return {
        type: GET_PROJECT_REQUEST,
    };
}

export const getProjectSuccessAction = (project) => {
    return {
        type: GET_PROJECT_SUCCESS,
        payload: {project: project}
    };
}

export const getProjectFailureAction = (error) => {
    return {
        type: GET_PROJECT_FAILURE,
        payload: {error: error}
    };
}
