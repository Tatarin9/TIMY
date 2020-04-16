import * as actionTypes from './kanban-actions'

const initialState = {
    kanbanColumns: [],
    projects: [],
    currentProject: null,
}

const kanbanReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects
            };
        case actionTypes.DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload.projectId)
            };
        default:
            return state;
    }
}

export default kanbanReducer;
