import * as actionTypes from './project-actions'

const initialState = {
    currentProject: null,
    isProjectLoading: false,
    customers: null,
    employees: null,
    projectPhases: null
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROJECT_REQUEST:
            return {
                ...state,
                isProjectLoading: true
            };
        case actionTypes.GET_PROJECT_SUCCESS:
            return {
                ...state,
                currentProject: action.payload.project,
                isProjectLoading: false
            };
        case actionTypes.GET_PROJECT_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                isProjectLoading: false
            };
        default:
            return state;
    }
}

export default projectReducer;
