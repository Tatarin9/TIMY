import React, {Component} from 'react';
import {formControlChangeHandler, getFormControlValueById, setFormControl} from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from '../Project/Project.css';
import TextField from '@material-ui/core/TextField';
import Aux from '../../shared/hoc/Aux/Aux';
import {connect} from 'react-redux';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import * as authActions from './_store/auth-actions';

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
               this.props.authSuccess(response.data);
                // this.patchFormValues(response.data);
                // this.setState({loading: false});
            })
            .catch(error => {
                this.props.authFailure(error);
                // this.setState({loading: false, error: 'error to show'});
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

        return (
            <Aux>
                {loginForm}
            </Aux>
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
