import React from 'react';

import timyLogoWhite from '../../../assets/timy_logo_white.svg';
import timyLogoColored from '../../../assets/timy_logo_colored.svg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={props.type === 'colored' ? timyLogoColored : timyLogoWhite } alt="Timy" />
    </div>
);

export default logo
