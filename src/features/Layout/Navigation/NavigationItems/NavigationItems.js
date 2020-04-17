import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItems.css';

import Aux from '../../../../shared/hoc/Aux/Aux';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <Aux>
        <ul className={classes.NavigationItems}>
            <NavigationItem link={{pathname: '/'}}
                            exact>Projects</NavigationItem>
            <NavigationItem link={{pathname: '/projects/create', hash: '#submit', search: '?quick-submit=true'}}
                            exact>Add Project</NavigationItem>
            <NavigationItem link={{pathname: '/auth/signin'}}
                            exact>Signin</NavigationItem>
            <NavigationItem link={{pathname: '/auth/signup'}}
                            exact>Signup</NavigationItem>
        </ul>

    </Aux>

);

export default navigationItems;
