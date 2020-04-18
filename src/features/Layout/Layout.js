import React, {Component, Suspense} from 'react';

import Aux from '../../shared/hoc/Aux/Aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
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

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    checkAuthTimeout = (expirationTime) => {
        setTimeout(() => {
            this.props.history.push('/auth/logout');
        }, expirationTime * 1000);
    }

    componentDidMount() {
        const authData = JSON.parse(localStorage.getItem('auth'));

        if (!authData) {
            this.props.history.push('/auth/logout');
        } else {
            const expirationDate = new Date(authData.expiresAt);
            if (expirationDate < new Date()) {
                this.props.history.push('/auth/logout');
            } else {
                this.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000);
            }
        }
        // TODO - how to auto refresh token?
    }

    render() {
        // console.log('layout props');
        // // console.log(this.props.location.pathname);
        console.log('this.props.isAuth');
        console.log(this.props.isAuth);

        let routes = (
            <Switch>
                <Route path="/auth/signin" exact component={Auth}/>
                <Route path="/auth/signup" exact component={Auth}/>
            </Switch>
        );

        if (this.props.isAuth) {
            console.log('this.props.isAuth');
            console.log(this.props.isAuth);
            routes = (
                <Switch>
                    {/*<Route path="/auth/logout" exact*/}
                    {/*       render={(beforeLogoutPath) => (*/}
                    {/*    <Logout pathBeforeLogout={this.props.location.pathname}/>)}/>*/}
                    <Route path="/auth/logout" exact component={Logout}/>
                    <Route path="/projects" exact component={Kanban}/>
                    <Route path="/projects/create"
                           exact
                           render={(props) => (
                               <Suspense fallback={<div>Loading...</div>}><Project {...props}/></Suspense>)}
                    />
                    {this.props.isAuth ?
                        <Route path="/projects/:id"
                               exact
                               render={(props) => (
                                   <Suspense fallback={<div>Loading...</div>}><Project {...props}/></Suspense>)}
                        /> : null}

                    <Route path="/" exact component={Kanban}/>
                    {/*<Redirect from="/" to="/projects"/>*/}
                    <Route component={PageNotFound}/>
                </Switch>
            )
        }

        return (
            <Aux>
                <div className={classes.Page}>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                        {routes}
                    </main>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authData !== null
    }
};

export default connect(mapStateToProps)(withRouter(Layout));
