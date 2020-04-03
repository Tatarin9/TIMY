import React from 'react';

import Aux from '../../../shared/Aux';
import classes from './Column.css';

import KanbanTicket from '../Ticket/Ticket';

const kanbanColumn = (props) => {

    const columnTitle = (<div className={classes.ColumnTitle}>{props.title}</div>);
    const columnTickets = (
        <div className={classes.Column}>
            {props.projects.map((project, index) => {
                return <KanbanTicket
                    key={project.id}
                    projectName={project.name}
                    currentTicket={() => props.ticketClicked(project)}
                />
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
