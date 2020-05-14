import { initStore } from '../../../shared/hooks-store/store';

const initialState = {
    isProjectsLoading: false,
    projectsData: null,
    projectsError: null,
    isColumnsLoading: false,
    columnsData: null,
    columnsError: null,
    isCurrentProjectLoading: false,
    currentProjectData: null,
    currentProjectError: null
}

const configureProjectsStore = () => {
    const actions = {
        FETCH_PROJECTS_REQUEST: () => ({isProjectsLoading: true}),
        FETCH_PROJECTS_SUCCESS: (resProjects) => ({isProjectsLoading: false, projectsData: resProjects, projectsError: null}),
        FETCH_PROJECTS_FAILURE: (err) => ({isProjectsLoading: false, projectsError: err}),
        FETCH_COLUMNS_REQUEST: () => ({isColumnsLoading: true}),
        FETCH_COLUMNS_SUCCESS: (resColumns) => ({isColumnsLoading: false, columnsData: resColumns, columnsError: null}),
        FETCH_COLUMNS_FAILURE: (err) => ({isColumnsLoading: false, columnsError: err}),
        FETCH_CURRENT_PROJECT_REQUEST: () => ({isCurrentProjectLoading: true}),
        FETCH_CURRENT_PROJECT_SUCCESS: (resCurrentProject) => ({isCurrentProjectLoading: false, currentProjectData: resCurrentProject, currentProjectError: null}),
        FETCH_CURRENT_PROJECT_FAILURE: (err) => ({isCurrentProjectLoading: false, currentProjectError: err}),
    };
    initStore(actions, initialState);
};

export default configureProjectsStore;
