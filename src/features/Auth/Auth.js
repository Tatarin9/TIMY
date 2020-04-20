import React, {Component} from 'react';
import {formControlChangeHandler, getFormControlValueById, setFormControl} from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from '../Project/Project.css';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import * as authActions from './_store/auth-actions';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state = {
        loginForm: {
            controls: [
                setFormControl('email', 'email', 'input', 'text', 'Email', '', {
                    required: true,
                    isEmail: true
                }, false, false),
                setFormControl('password', 'password', 'input', 'text', 'Password', '', {
                    required: true,
                    minLength: 6
                }, false, false),
            ],
            valid: true
        },
        submitted: false,
        isSignup: false
    };

    componentDidMount() {
        console.log(this.props);
        if (this.props.location.pathname === '/auth/signup') {
            this.setState({isSignup: true});
        }
        if (this.props.location.pathname === '/auth/signin') {
            this.setState({isSignup: false});
        }
    }

    inputChangedHandler = (event, controlId) => {
        const updatedLoginForm = formControlChangeHandler(event.target.value, controlId, this.state.loginForm)
        this.setState({projectForm: updatedLoginForm});
    }

    submitAuthHandler = (event) => {
        event.preventDefault();
        const authData = {
            email: getFormControlValueById(this.state.loginForm, 'email'),
            password: getFormControlValueById(this.state.loginForm, 'password'),
            returnSecureToken: true
        }
        this.props.authRequest();
        const methodParam = this.state.isSignup ? 'signUp' : 'signInWithPassword';

        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${methodParam}?key=AIzaSyAVVqYQhmq2ItJXERsC_qrmg-LRsfrH-Fw`, authData)
            .then(response => {
                const authData = {...response.data};
                const expiresAt = new Date(new Date().getTime() + authData.expiresIn * 1000);
                authData.expiresAt = expiresAt;
               this.props.authSuccess(authData);
               localStorage.setItem('auth', JSON.stringify(authData));
               this.props.history.push('/');
            })
            .catch(error => {
                this.props.authFailure(error);
            });
    }

    render() {
        let loginForm = (
            <form onSubmit={this.submitAuthHandler}>
                {this.state.loginForm.controls.map(formControl => (
                    <Input
                        key={formControl.id}
                        elementType={formControl.elementType}
                        elementConfig={formControl.elementConfig}
                        value={formControl.value}
                        invalid={!formControl.valid}
                        shouldValidate={formControl.validation}
                        touched={formControl.touched}
                        changed={(event) => this.inputChangedHandler(event, formControl.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.loginForm.valid}
                        clicked={this.submitAuthHandler}>{this.state.isSignup ? 'Sign up' : 'Sign in'}</Button>
            </form>
        );
        if (this.props.isLoading) {
            loginForm = <CircularProgress/>;
        }

        let authRedirect = null;
        if (this.props.authData != null) {
            authRedirect = <Redirect to="/" />
        }

        return (
            <React.Fragment>
                {authRedirect}
                {loginForm}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        authData: state.auth.authData,
        isLoading: state.auth.isLoading,
        error: state.auth.error
    }
};


const mapDispatchToProps = dispatch => {
    return {
        authRequest: () => dispatch(authActions.authRequestAction()),
        authSuccess: (auth) => dispatch(authActions.authSuccessAction(auth)),
        authFailure: (error) => dispatch(authActions.authFailureAction(error)),
        // onDeleteProject: (projectId) => dispatch(projectActions.deleteProject(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
