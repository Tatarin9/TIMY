import React, {Component, Suspense} from 'react';

import Aux from '../../shared/hoc/Aux/Aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';
import { Route, Switch} from 'react-router-dom';
import Kanban from '../Kanban/Kanban';
import PageNotFound from '../../shared/UI/PageNotFound/PageNotFound';
import Auth from '../Auth/Auth';

// import Project from '../Project/Project';
const Project = React.lazy(() => import('../Project/Project'));

class Layout extends Component {
    state = {
        showSideDrawer: false,
        auth: true
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };

    render() {
        return (
            <Aux>
                <div className={classes.Page}>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                        <Switch>
                            <Route path="/auth/signin" exact component={Auth}/>
                            <Route path="/auth/signup" exact component={Auth}/>
                            <Route path="/projects" exact component={Kanban}/>
                            <Route path="/projects/create"
                                   exact
                                   render={(props) => (
                                       <Suspense fallback={<div>Loading...</div>}><Project {...props}/></Suspense>)}
                            />
                            {this.state.auth ?
                                <Route path="/projects/:id"
                                       exact
                                       render={(props) => (
                                           <Suspense fallback={<div>Loading...</div>}><Project {...props}/></Suspense>)}
                                /> : null}

                            <Route path="/" exact component={Kanban}/>
                            {/*<Redirect from="/" to="/projects"/>*/}
                            <Route component={PageNotFound}/>
                        </Switch>
                    </main>
                </div>
            </Aux>
        )
    }
}

export default Layout;
