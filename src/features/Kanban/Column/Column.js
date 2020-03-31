import React from 'react';

import Aux from '../../../shared/Aux';
import classes from './Column.css';

const kanbanColumn = (props) => {

    const columnTitle = (<div className={classes.ColumnTitle}>{props.title}</div>);
    const columnTickets = (
        <div className={classes.Column}>
            {props.projects.map((project, index) => {
                return <div key={project.id}>{project.name}</div>
            })
            }
        </div>);


    return (
        <Aux>
            <div>
                {columnTitle}
                {columnTickets}
            </div>

        </Aux>
    );

};

export default kanbanColumn;