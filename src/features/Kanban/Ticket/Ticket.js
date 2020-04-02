import React from 'react';

import classes from './Ticket.css';
import Modal from '../../../shared/Modal/Modal';
import Aux from '../../../shared/Aux';

const kanbanTicket = (props) => {
    let showModal = false;
    let modal = null;


    const showModalClicked = () => {
        debugger
        showModal = !showModal;
        if (showModal) {
            modal = <Modal/>;
        }
    };

    return (
        <Aux>
            <div className={classes.Ticket}>
                <div>{props.projectName}</div>
                <div>
                    Project details
                </div>
                <button onClick={showModalClicked}>Show Modal</button>
            </div>
            <Modal>
                <h1>Want to archive that?</h1>
                <div>{props.projectName}</div>
            </Modal>
        </Aux>
    );

};

export default kanbanTicket;
