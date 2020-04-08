import React from 'react';

import classes from './Ticket.css';
import Aux from '../../../shared/hoc/Aux/Aux';
import Button from '../../../shared/UI/Button/Button';

const kanbanTicket = (props) => {

    return (
        <Aux>
            <div className={classes.Ticket}>
                <div>{props.projectName}</div>
                <div>
                    Project details
                </div>
                <Button btnType="Danger" clicked={props.currentTicket}>Show Modal</Button>
            </div>
        </Aux>
    );

};

export default kanbanTicket;
