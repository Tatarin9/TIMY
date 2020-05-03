import React, { Component, useEffect, useState } from 'react';
import { formControlChangeHandler, getFormControlValueById, setFormControl } from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from '../Project/Project.css';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import * as authActions from './_store/auth-actions';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../shared/hooks-store/store';

const auth = props => {

    const [loginForm, setLoginForm] = useState({
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
    });

    const [isSignup, setIsSignup] = useState(false);

    const [state, dispatch] = useStore();
    // console.log('auth');
    // console.log(state.authData);

    useEffect(() => {
        if (props.location.pathname === '/auth/signup') {
            setIsSignup(true);
        }
        if (props.location.pathname === '/auth/signin') {
            setIsSignup(false);
        }
    }, [setIsSignup]);

    const inputChangedHandler = (event, controlId) => {
        const updatedLoginForm = formControlChangeHandler(event.target.value, controlId, loginForm)
        setLoginForm(updatedLoginForm);
    }

    const submitAuthHandler = (event) => {
        event.preventDefault();
        dispatch('AUTH_REQUEST');

        const authPayload = {
            email: getFormControlValueById(loginForm, 'email'),
            password: getFormControlValueById(loginForm, 'password'),
            returnSecureToken: true
        }
        // props.authRequest();
        const methodParam = isSignup ? 'signUp' : 'signInWithPassword';
        setTimeout( () => {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${methodParam}?key=AIzaSyAVVqYQhmq2ItJXERsC_qrmg-LRsfrH-Fw`, authPayload)
                .then(response => {
                    const authData = {...response.data};
                    const expiresAt = new Date(new Date().getTime() + authData.expiresIn * 1000);
                    authData.expiresAt = expiresAt;
                    // props.authSuccess(authData);

                    dispatch('AUTH_SUCCESS', authData);
                    localStorage.setItem('auth', JSON.stringify(authData));
                    props.history.push('/');
                })
                .catch(error => {
                    // props.authFailure(error);
                    dispatch('AUTH_FAILURE', error);
                });
        }, 2000);
    }

    let loginFormJsx = (
        <form onSubmit={submitAuthHandler}>
            {loginForm.controls.map(formControl => (
                <Input
                    key={formControl.id}
                    elementType={formControl.elementType}
                    elementConfig={formControl.elementConfig}
                    value={formControl.value}
                    invalid={!formControl.valid}
                    shouldValidate={formControl.validation}
                    touched={formControl.touched}
                    changed={(event) => inputChangedHandler(event, formControl.id)}/>
            ))}
            <Button btnType="Success" disabled={!loginForm.valid}
                    clicked={submitAuthHandler}>{isSignup ? 'Sign up' : 'Sign in'}</Button>
        </form>
    );
    if (state.isAuthLoading) {
        loginFormJsx = <CircularProgress/>;
    }

    let authRedirect = null;
    if (state.authData != null) {
        authRedirect = <Redirect to="/"/>
    }

    return (
        <React.Fragment>
            {authRedirect}
            {loginFormJsx}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        authData: state.auth.authData,
        isLoading: state.auth.isLoading,
        error: state.auth.error
    }
};


// const mapDispatchToProps = dispatch => {
//     return {
//         authRequest: () => dispatch(authActions.authRequestAction()),
//         authSuccess: (auth) => dispatch(authActions.authSuccessAction(auth)),
//         authFailure: (error) => dispatch(authActions.authFailureAction(error)),
//         // onDeleteProject: (projectId) => dispatch(projectActions.deleteProject(projectId))
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(auth, axios));
export default withErrorHandler(auth, axios);
