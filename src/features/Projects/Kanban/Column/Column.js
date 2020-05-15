import React from 'react';

import KanbanTicket from '../Ticket/Ticket';

import classes from './Column.css';
import appClasses from '../../../../App.css';

const kanbanColumn = (props) => {

    const columnTitle = (
        <div className={[appClasses.Flex, appClasses.SpaceBetween, classes.TitleWrap].join(' ')}>
            <div className={[appClasses.Flex, appClasses.FlexStart].join(' ')}>
                <div className={classes.ColumnTag} style={{'background': props.color}}/>
                <div>{props.title}</div>
            </div>
            <div style={{'marginRight': '0.5rem'}}>{props.projects.length}</div>
        </div>
    );

    const columnTickets =
        props.projects.map((project) => {
            return (
                <KanbanTicket
                    key={project.id}
                    project={project}
                    columnNumber={props.columnNumber}
                    totalColumns={props.totalColumns}
                />
            )
        });

    return (
        <div className={classes.Column}>
            {columnTitle}
            {columnTickets}
        </div>
    );

};

export default kanbanColumn;
