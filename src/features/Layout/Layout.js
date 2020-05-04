import React, { Component, Suspense, useEffect, useState } from 'react';

import NavMenu from './Navigation/NavMenu/NavMenu';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';
import { Route, Switch } from 'react-router-dom';
import Kanban from '../Kanban/Kanban';
import PageNotFound from '../../shared/UI/PageNotFound/PageNotFound';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import { withRouter } from 'react-router-dom';
import { useStore } from '../../shared/hooks-store/store';

// import Project from '../Project/Project';
const Project = React.lazy(() => import('../Project/Project'));

const layout = props => {
    const [isSideDrawerVisible, setSideDrawerVisibility] = useState(false);
    const [state, dispatch] = useStore();

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('auth'));
        if (!authData) {
            props.history.push('/auth/logout');
        } else {
            const expirationDate = new Date(authData.expiresAt);
            if (expirationDate < new Date()) {
                props.history.push('/auth/logout');
            } else {
                dispatch('AUTH_SUCCESS', authData);
                logoutAfterTime((expirationDate.getTime() - new Date().getTime()) / 1000);
            }
        }
    }, []);

    const logoutAfterTime = (expirationTime) => {
        setTimeout(() => {
            props.history.push('/auth/logout');
        }, expirationTime * 1000);
    }

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisibility(!isSideDrawerVisible);
    };

    let routes = (
        <Switch>
            <Route path="/auth/signin" exact component={Auth}/>
            <Route path="/auth/logout" exact component={Logout}/>
        </Switch>
    );

    if (!!state.authData) {
        routes = (
            <Switch>
                <Route path="/auth/logout" exact component={Logout}/>
                <Route path="/projects" exact component={Kanban}/>
                <Route path="/projects/create"
                       exact
                       render={(props) => (<Project {...props}/>)}
                />
                <Route path="/projects/:id"
                       exact
                       render={(props) => (<Project {...props}/>)}
                />

                {/*{isAuthenticated ?*/}
                {/*    <Route path="/projects/:id"*/}
                {/*           exact*/}
                {/*           render={(props) => (<Project {...props}/>)}*/}
                {/*    /> : null}*/}

                <Route path="/" exact component={Kanban}/>
                {/*<Redirect from="/" to="/projects"/>*/}
                <Route component={PageNotFound}/>
            </Switch>
        )
    }

    return (
        <React.Fragment>
            <div className={classes.Page}>
                <NavMenu drawerToggleClicked={sideDrawerToggleHandler}
                         isAuthenticated={!!state.authData}/>
                <SideDrawer
                    open={isSideDrawerVisible}
                    isAuthenticated={!!state.authData}
                    closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                    <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
                </main>
            </div>
        </React.Fragment>
    )
}

export default withRouter(layout);
