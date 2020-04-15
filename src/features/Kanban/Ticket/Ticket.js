import React from 'react';

import classes from './Ticket.css';
import Aux from '../../../shared/hoc/Aux/Aux';
import Button from '../../../shared/UI/Button/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const kanbanTicket = (props) => {

    const maxHours = Math.max(props.project.actualHours, props.project.budgetHours, props.project.issuedHours);
    const actualPercent = props.project.actualHours / maxHours * 100 + '%';
    const budgetPercent = props.project.budgetHours / maxHours * 100 + '%';
    const issuedPercent = props.project.issuedHours / maxHours * 100 + '%';

    return (
        <Aux>
            <div className={classes.Ticket}>
                <div
                    className={classes.TicketTitle}>{props.project.projectName + ' (' + props.project.customer + ')'}</div>
                <div className={classes.ProjectDetailsWrapper}>
                    <div>Due date: {props.project.dueDate}</div>
                    <div>Phase: {props.project.currentPhase}</div>

                    <div className={classes.GridContainer}>
                        <div className={classes.GridItemText}>Budget</div>
                        <div className={classes.GridItemBarWrapper}>
                            <div className={classes.GridItemBar}
                                 style={{'width': budgetPercent, 'background': '#eaa41f'}}>{props.project.budgetHours}</div>
                        </div>

                        <div className={classes.GridItemText}>Actual</div>
                        <div className={classes.GridItemBarWrapper}>
                            <div className={classes.GridItemBar}
                                 style={{'width': actualPercent, 'background': '#93c47d'}}>{props.project.actualHours}</div>
                        </div>

                        <div className={classes.GridItemText}>Issued</div>
                        <div className={classes.GridItemBarWrapper}>
                            <div className={classes.GridItemBar}
                                 style={{'width': issuedPercent, 'background': '#6fa8dc'}}>{props.project.issuedHours}</div>
                        </div>
                    </div>

                    <Grid container justify="center">
                        <Grid item>
                            <Tooltip title="Edit">
                                <IconButton aria-label="edit" style={{'padding': '5px'}} onClick={props.currentTicket}>
                                    <EditOutlinedIcon fontSize="small" style={{'font-size': '1.1rem'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete" style={{'padding': '5px'}}>
                                    <DeleteOutlinedIcon fontSize="small" style={{'font-size': '1.1rem'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Aux>
    );

};

export default kanbanTicket;
