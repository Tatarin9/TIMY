import React, { useCallback, useEffect } from 'react';

import useHttp from '../../../shared/hooks/http';
import { useStore } from '../../../shared/hooks-store/store';

import KanbanColumn from './Column/Column';
import LoadSpinner from '../../../shared/UI/LoadSpinner/LoadSpinner';

import appClasses from '../../../App.css';
import classes from './Kanban.css';

const kanban = props => {
    const [state, dispatch] = useStore();

    const projects = useHttp();
    const columns = useHttp();

    // listen kanban columns
    useEffect(() => {
        if (!columns.isLoading && !columns.error && columns.data) {
            const columnsRes = Array.isArray(columns.data.data) ? columns.data.data : columns.data.data[Object.keys(columns.data.data)];
            dispatch('FETCH_COLUMNS_SUCCESS', columnsRes);
        }
        if (columns.error) {
            dispatch('FETCH_COLUMNS_FAILURE', columns.error);
            alert('show error:' + columns.error ? columns.error.data.error.message : 'Server error occured');
        }
    }, [columns.data, columns.isLoading, columns.error]);


    // listen projects
    useEffect(() => {
        if (!projects.isLoading && !projects.error && projects.data) {
            const projectsRes = [];
            for (let key in projects.data.data) {
                projectsRes.push({
                    ...projects.data.data[key],
                    id: key
                })
            }
            dispatch('FETCH_PROJECTS_SUCCESS', projectsRes);
        }
        if (projects.error) {
            dispatch('FETCH_PROJECTS_FAILURE', projects.error);
            alert('show error:' + projects.error ? projects.error.data.error.message : 'Server error occured');
        }
    }, [projects.data, projects.isLoading, projects.error]);

    const fetchProjects = useCallback(() => {
        dispatch('FETCH_PROJECTS_REQUEST');
        projects.sendRequest(
            '/demo/projects.json',
            'get',
            null,
            null,
            null
        );
    }, [dispatch, projects.sendRequest]);

    // fetch projects
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchColumns = useCallback(() => {
        dispatch('FETCH_COLUMNS_REQUEST');
        columns.sendRequest(
            '/demo/kanbanColumns.json',
            'get',
            null,
            null,
            null
        );
    }, [dispatch, columns.sendRequest]);

    // fetch columns
    useEffect(() => {
        fetchColumns();
    }, []);

    let columnsJsx = null;
    if (state.columnsData != null && state.projectsData != null) {
        columnsJsx = state.columnsData.map((column, index) => {
            return <KanbanColumn
                columnNumber={index + 1}
                totalColumns={state.columnsData.length}
                title={column.title}
                color={column.color}
                projects={state.projectsData.filter(project => project.status === column.status)}
                key={column.id}
            />
        });
    }

    let filters = null;

    const setTheme = () => {
        const bodyElement = document.getElementsByTagName('body')[0];
        const htmlElement = document.getElementsByTagName('html')[0];
        let theme = htmlElement.getAttribute('data-theme');
        bodyElement.classList.add('color-theme-in-transition');
        if (!theme) {
            theme = 'dark';
         }
        htmlElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme);

        // TODO clear timeout
        window.setTimeout(() => {
            bodyElement.classList.remove('color-theme-in-transition');
        }, 2000);
    }

    filters = (
        <div className={classes.Filters}>
            <div>Filters</div>
            <button onClick={setTheme}>Change theme</button>
        </div>
    );


    const spinner = (
        <div className={appClasses.TextCenter}>
            <LoadSpinner/>
        </div>
    );

    return (
        <React.Fragment>
            <h2>Projects status board</h2>
            {filters}
            {state.projectsData ?
                <div className={classes.Kanban}>
                    {columnsJsx}
                </div>
                : spinner}
        </React.Fragment>
    )
}

export default kanban;
