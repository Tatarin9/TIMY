import React from 'react';

import Grid from '@material-ui/core/Grid';

import classes from './Column.css';
import KanbanTicket from '../Ticket/Ticket';

const kanbanColumn = (props) => {

    const columnTitle = (
        <Grid container justify="space-between" className={classes.TitleWrap}>
            <Grid item>
                <Grid container>
                    <div className={classes.ColumnTag} style={{'background': props.color}}/>
                    <div>{props.title}</div>
                </Grid>
            </Grid>
            <Grid item style={{'marginRight': '0.5rem'}}>{props.projects.length}</Grid>
        </Grid>
    );

    const columnTickets =
        props.projects.map((project, index) => {
            return (
                <KanbanTicket
                    key={project.id}
                    project={project}
                    columnNumber={props.columnNumber}
                    totalColumns={props.totalColumns}
                    currentTicket={() => props.ticketClicked(project)}
                />
            )
        });

    return (
        <React.Fragment>
            <div className={classes.Column}>
                {columnTitle}
                {columnTickets}
            </div>
        </React.Fragment>
    );

};

export default kanbanColumn;
