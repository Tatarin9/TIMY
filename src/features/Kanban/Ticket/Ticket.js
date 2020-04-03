import React from 'react';

import classes from './Ticket.css';
import Aux from '../../../shared/Aux';
import Button from '../../../shared/Button/Button';

const kanbanTicket = (props) => {

    return (
        <Aux>
            <div className={classes.Ticket}>
                <div>{props.projectName}</div>
                <div>
                    Project details
                </div>
                <Button btnType="Danger" click="" clicked={props.currentTicket}>Show Modal</Button>
            </div>
        </Aux>
    );

};

export default kanbanTicket;
