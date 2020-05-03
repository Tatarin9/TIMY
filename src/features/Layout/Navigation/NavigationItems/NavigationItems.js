import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (<ul className={classes.NavigationItems}>
        {props.isAuthenticated ?
            <React.Fragment>
                <NavigationItem link={{pathname: '/'}} clicked={props.clicked}
                                exact>Projects</NavigationItem>
                {/*<NavigationItem link={{pathname: '/projects/create', hash: '#submit', search: '?quick-submit=true'}}*/}
                {/*                clicked={props.clicked}*/}
                <NavigationItem link={{pathname: '/projects/create'}}
                                clicked={props.clicked}
                                exact>Add Project</NavigationItem>
                <NavigationItem link={{pathname: '/auth/logout'}}
                                clicked={props.clicked}
                                exact>Logout</NavigationItem>
            </React.Fragment>

            : null}
        {!props.isAuthenticated ?
            <React.Fragment>
                <NavigationItem link={{pathname: '/auth/signin'}}
                                clicked={props.clicked}
                                exact>Signin</NavigationItem>
            </React.Fragment>
            : null}
    </ul>)
}


export default navigationItems;
