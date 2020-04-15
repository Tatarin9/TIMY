import React from 'react';

import Aux from '../../../shared/hoc/Aux/Aux';
import classes from './Column.css';
import appClasses from '../../../App.css';

import KanbanTicket from '../Ticket/Ticket';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const kanbanColumn = (props) => {

    const columnTitle = (
        <Grid container justify="space-between" className={classes.TitleWrap}>
            <Grid item>
                <Grid container>
                    <div className={classes.ColumnTag} style={{'background': props.color}}/>
                    <div>{props.title}</div>
                </Grid>
            </Grid>
            <Grid item style={{'margin-right': '0.5rem'}}>{props.projects.length}</Grid>
        </Grid>
    );

    const columnTickets =
        props.projects.map((project, index) => {
            return (
                <KanbanTicket
                    key={project.id}
                    project={project}
                    currentTicket={() => props.ticketClicked(project)}
                />
            )
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
