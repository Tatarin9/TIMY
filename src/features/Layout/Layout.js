import React, {Component} from 'react';

import Aux from '../../shared/hoc/Aux/Aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';
import {Route, Switch} from 'react-router-dom';
import Kanban from '../Kanban/Kanban';
import Project from '../Project/Project';

class Layout extends Component {
    state = {
        showSideDrawer: false
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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                    <Switch>
                        <Route path="/" exact component={Kanban} />
                        <Route path="/projects/create" exact component={Project} />
                        <Route path="/projects/:id" exact component={Project} />
                    </Switch>
                </main>
            </Aux>
        )
    }
}

export default Layout;
