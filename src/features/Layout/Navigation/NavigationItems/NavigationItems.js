import React from 'react';

import classes from './NavigationItems.css';
import {NavLink} from 'react-router-dom';
import Aux from '../../../../shared/hoc/Aux/Aux';

const navigationItems = () => (
    <Aux>
        <ul className={classes.NavigationItems}>
            <li>
                <NavLink to={{pathname: '/'}}
                         exact
                         activeClassName="dummy-active"
                         activeStyle={{color: 'red'}}>
                    Projects
                </NavLink>
            </li>
            <li>
                <NavLink to={{
                    pathname: '/projects/create',
                    hash: '#submit',
                    search: '?quick-submit=true'
                }} exact>Add Project</NavLink>
            </li>
        </ul>

    </Aux>

);

export default navigationItems;
