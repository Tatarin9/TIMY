import React, { useEffect, useState } from 'react';
import axios from '../../axios';

import KanbanColumn from './Column/Column';

// import appClasses from '../../App.css';
import classes from './Kanban.css';

import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
// import Button from '@material-ui/core/Button';
// import Skeleton from '@material-ui/lab/Skeleton';
// import Box from '@material-ui/core/Box';
import LoadSpinner from '../../shared/UI/LoadSpinner/LoadSpinner';
import { setFormControl } from '../../shared/FormHelpers';
import useHttp from '../../shared/hooks/http';

const kanban = props => {
    const [kanbanColumns, setKanbanColumns] = useState([]);
    const [projects, setProjects] = useState([]);

    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        reqIdentifer,
        clear
    } = useHttp();

    // state = {
    //     kanbanColumns: [],
    //     projects: [],
    //     isTicketClicked: false,
    //     currentTicket: null,
    //     currentProject: null,
    //     otherState: 'some other value',
    //     loading: false,
    //     error: null
    // };

    useEffect(() => {
        axios.get('/demo/kanbanColumns.json')
            .then(response => {
                const columns = Array.isArray(response.data) ? response.data : response.data[Object.keys(response.data)];
                setKanbanColumns(columns);
            })
            .catch(error => {
                // console.log(error);
            });

        axios.get('/demo/projects.json')
            .then(res => {
                const projects = [];
                for (let key in res.data) {
                    projects.push({
                        ...res.data[key],
                        id: key
                    })
                }
                setProjects(projects);
            })
            .catch(error => {
                // console.log(error);
                // this.setState({loading: false, error: 'error to show'});
            });
    }, []);

    let columns = null;
    if (kanbanColumns.length > 0 && projects.length > 0) {
        columns = kanbanColumns.map((column, index) => {
            return <KanbanColumn
                columnNumber={index + 1}
                totalColumns={kanbanColumns.length}
                title={column.title}
                color={column.color}
                projects={projects.filter(project => project.status === column.status)}
                key={column.id}
            />
        });
    }

    let filters = null;

    filters = (
        <div className={classes.Filters}>
            <div>Filters</div>
            {/*<button onClick={this.search}>Add Project</button>*/}
        </div>
    );

    const spinner = (
        <div className={classes.SpinnerWrapper}>
            <LoadSpinner/>
        </div>
    );

    return (
        <React.Fragment>
            <h2>Projects status board</h2>
            {filters}
            {projects.length > 0 ?
                <div className={classes.Kanban}>
                    {columns}
                </div>
                : spinner}
        </React.Fragment>
    )
}

export default withErrorHandler(kanban, axios);
