import React from 'react';

import classes from './Ticket.css';
import Aux from '../../../shared/hoc/Aux/Aux';
import Button from '../../../shared/UI/Button/Button';

const kanbanTicket = (props) => {

    return (
        <Aux>
            <div className={classes.Ticket}>
                <div>Project details</div>
                <div>{props.projectName}</div>
                <Button btnType="Danger" clicked={props.currentTicket}>View project</Button>
            </div>
        </Aux>
    );

};

export default kanbanTicket;
