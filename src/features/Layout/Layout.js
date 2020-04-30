import React, {Component, Suspense, useState} from 'react';

import NavMenu from './Navigation/NavMenu/NavMenu';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';
import {Route, Switch} from 'react-router-dom';
import Kanban from '../Kanban/Kanban';
import PageNotFound from '../../shared/UI/PageNotFound/PageNotFound';
import Auth from '../Auth/Auth';
import Logout from '../Auth/Logout/Logout';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// import Project from '../Project/Project';
const Project = React.lazy(() => import('../Project/Project'));

const layout = props => {
    const [isSideDrawerVisible, setSideDrawerVisibility] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisibility(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerVisibility(!isSideDrawerVisible);
    };

    // checkAuthTimeout = (expirationTime) => {
    //     setTimeout(() => {
    //         this.props.history.push('/auth/logout');
    //     }, expirationTime * 1000);
    // }

    // componentDidMount() {
    //     const authData = JSON.parse(localStorage.getItem('auth'));
    //
    //     if (!authData) {
    //         this.props.history.push('/auth/logout');
    //     } else {
    //         const expirationDate = new Date(authData.expiresAt);
    //         if (expirationDate < new Date()) {
    //             this.props.history.push('/auth/logout');
    //         } else {
    //             this.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000);
    //         }
    //     }
    //     // TODO - how to auto refresh token?
    // }

    // console.log('layout props');
    // // console.log(this.props.location.pathname);
    // console.log('this.props.isAuth');
    // console.log(this.props.isAuth);

    let routes = (
        <Switch>
            <Route path="/auth/signin" exact component={Auth}/>
            <Route path="/auth/signup" exact component={Auth}/>
        </Switch>
    );

    if (props.isAuth) {
        // console.log('this.props.isAuth');
        // console.log(this.props.isAuth);
        routes = (
            <Switch>
                {/*<Route path="/auth/logout" exact*/}
                {/*       render={(beforeLogoutPath) => (*/}
                {/*    <Logout pathBeforeLogout={this.props.location.pathname}/>)}/>*/}
                <Route path="/auth/logout" exact component={Logout}/>
                <Route path="/projects" exact component={Kanban}/>
                <Route path="/projects/create"
                       exact
                       render={(props) => (<Project {...props}/>)}
                />
                {props.isAuth ?
                    <Route path="/projects/:id"
                           exact
                           render={(props) => (<Project {...props}/>)}
                    /> : null}

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
                         isAuthenticated={props.isAuth}/>
                <SideDrawer
                    open={isSideDrawerVisible}
                    isAuthenticated={props.isAuth}
                    closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                    <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
                </main>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authData !== null
    }
};

export default connect(mapStateToProps)(withRouter(layout));
