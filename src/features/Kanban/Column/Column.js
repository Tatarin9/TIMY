import React from 'react';

import Aux from '../../../shared/hoc/Aux/Aux';
import classes from './Column.css';

import KanbanTicket from '../Ticket/Ticket';

const kanbanColumn = (props) => {

    const columnTitle = (<div className={classes.ColumnTitle}>{props.title}</div>);
    const columnTickets =
        props.projects.map((project, index) => {
            return <KanbanTicket
                key={project.id}
                projectName={project.name}
                currentTicket={() => props.ticketClicked(project)}
            />
        });


    return (
        <Aux>
            <div className={classes.Column}>
                {columnTitle}
                {columnTickets}
            </div>
        </Aux>
    );

};

export default kanbanColumn;
