import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        style={{'width': props.btnWidth}}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;
