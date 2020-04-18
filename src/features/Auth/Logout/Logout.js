import React, {Component} from 'react';
import * as authActions from '../_store/auth-actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

    componentDidMount() {
        // const history = useHistory();
        // console.log(history);
        console.log(this.props);
        this.props.onLogout();
        localStorage.removeItem('auth');
    }

    render () {
        // return <div>{this.props.pathBeforeLogout}</div>;
        return <Redirect to="/auth/signin" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (pathBeforeLogout) => dispatch(authActions.authLogoutAction(pathBeforeLogout)),
    }
}

export default connect(null, mapDispatchToProps)(Logout);
