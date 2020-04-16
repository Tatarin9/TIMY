export const GET_PROJECTS = 'GET_PROJECTS';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const getProjects = () => {
    return {
        type: GET_PROJECTS,
    };
}

export const deleteProject = (id) => {
    return {
        type: DELETE_PROJECT,
        payload: {projectId: id}
    };
}
