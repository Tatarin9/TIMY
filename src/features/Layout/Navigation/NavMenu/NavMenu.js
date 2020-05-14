import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import classes from './NavMenu.css';

const navMenu = (props) => (
    <header className={classes.NavMenu}>
        <DrawerToggle clicked={props.drawerToggleClicked} isAuthenticated={props.isAuthenticated}/>
        <div className={classes.Logo}>
            <Logo type="white"/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} clicked={props.clicked}/>
        </nav>
    </header>
);

export default navMenu;
