import React, {useState} from 'react';

// import appClasses from '../../../../App.css';
import classes from './Ticket.css';
// import Button from '../../../../shared/UI/Button/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined'
// import VisibilityOutlineindexdIcon from '@material-ui/icons/VisibilityOutlined';
import { withRouter } from 'react-router';

const kanbanTicket = React.memo((props) => {
    const ticketState = useState({projectStatus: null});

    const maxHours = Math.max(props.project.actualHours, props.project.budgetHours, props.project.issuedHours);
    const actualPercent = props.project.actualHours / maxHours * 100 + '%';
    const budgetPercent = props.project.budgetHours / maxHours * 100 + '%';
    const issuedPercent = props.project.issuedHours / maxHours * 100 + '%';

    const editProjectHandler = () => {
        props.history.push({
            pathname: '/projects/' + props.project.id
        });
    }

    return (
        <React.Fragment>
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
                            <Tooltip title="Move left">
                                <IconButton aria-label="move" style={{'padding': '5px'}}  disabled={props.columnNumber === 1}>
                                    <ForwardOutlinedIcon fontSize="small" className={classes.TicketIcon} style={{'fontSize': '1.1rem', transform: 'rotate(180deg)'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Edit">
                                <IconButton aria-label="edit" style={{'padding': '5px'}} onClick={editProjectHandler}>
                                    <EditOutlinedIcon fontSize="small" style={{'fontSize': '1.1rem'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Archive">
                                <IconButton aria-label="archive" style={{'padding': '5px'}}
                                            onClick={event => {ticketState[1]({projectStatus: 'archived'}) }}>
                                    <ArchiveOutlinedIcon fontSize="small" style={{'fontSize': '1.1rem'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Move right">
                                <IconButton aria-label="move" style={{'padding': '5px'}} disabled={props.columnNumber === props.totalColumns}>
                                    <ForwardOutlinedIcon fontSize="small" style={{'fontSize': '1.1rem'}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );

});

export default withRouter(kanbanTicket);
