import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStore } from '../../shared/hooks-store/store';
import useHttp from '../../shared/hooks/http';

import { formControlChangeHandler, getFormControlValueById, setFormControl } from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';

import classes from './Auth.css';
import appClasses from '../../App.css';

const auth = props => {
    const [loginForm, setLoginForm] = useState({
        controls: [
            setFormControl('email', 'email', 'Email', 'input', 'text', 'Email', '', {
                required: true,
                isEmail: true
            }, false, false),
            setFormControl('password', 'password', 'Password', 'input', 'text', 'Password', '', {
                required: true,
                minLength: 6
            }, false, false),
        ],
        valid: true
    });

    const [isSignup, setIsSignup] = useState(false);

    const [state, dispatch] = useStore();

    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        reqIdentifer,
        clear
    } = useHttp();

    useEffect(() => {
        if (props.location.pathname === '/auth/signup') {
            setIsSignup(true);
        }
        if (props.location.pathname === '/auth/signin') {
            setIsSignup(false);
        }
    }, [setIsSignup]);


    // listen
    useEffect(() => {
        if (!isLoading && !error && data) {
            const authData = {...data.data};
            const expiresAt = new Date(new Date().getTime() + authData.expiresIn * 1000);
            authData.expiresAt = expiresAt;
            dispatch('AUTH_SUCCESS', authData);
            localStorage.setItem('auth', JSON.stringify(authData));
            props.history.push('/');
        }
        if (error) {
            dispatch('AUTH_FAILURE', error);
            alert('show error:' + error ? error.data.error.message : 'Server error occured');
        }
    }, [data, isLoading, error]);

    const inputChangedHandler = (event, controlId) => {
        const updatedLoginForm = formControlChangeHandler(event.target.value, controlId, loginForm)
        setLoginForm(updatedLoginForm);
    }

    const submitAuthHandler = useCallback(event => {
        event.preventDefault();
        dispatch('AUTH_REQUEST');

        const authPayload = {
            email: getFormControlValueById(loginForm, 'email'),
            password: getFormControlValueById(loginForm, 'password'),
            returnSecureToken: true
        }
        const methodParam = isSignup ? 'signUp' : 'signInWithPassword';

        sendRequest(
            `https://identitytoolkit.googleapis.com/v1/accounts:${methodParam}?key=AIzaSyAVVqYQhmq2ItJXERsC_qrmg-LRsfrH-Fw`,
            'post',
            authPayload,
            null,
            null
        );
    }, []);

    let loginFormJsx = (
        <div className={classes.AuthFormCard}>
            <form onSubmit={submitAuthHandler} className={classes.AuthForm}>
                {loginForm.controls.map(formControl => (
                    <Input
                        key={formControl.id}
                        elementType={formControl.elementType}
                        elementConfig={formControl.elementConfig}
                        value={formControl.value}
                        label={formControl.label}
                        invalid={!formControl.valid}
                        shouldValidate={formControl.validation}
                        touched={formControl.touched}
                        changed={(event) => inputChangedHandler(event, formControl.id)}/>
                ))}
                <div className={classes.FormButtons}>
                    <Button btnType="Primary" disabled={!loginForm.valid}
                            btnWidth="100%"
                            clicked={submitAuthHandler}>{isSignup ? 'Sign up' : 'Sign in'}</Button>
                </div>
            </form>
        </div>
    );

    if (state.isAuthLoading) {
        loginFormJsx = <CircularProgress/>;
    }

    let authRedirect = null;
    if (state.authData != null) {
        authRedirect = <Redirect to="/"/>
    }

    const timy = <div>Timy - Time based project management</div>;
    let formTitle = null;
    if (isSignup) {
        formTitle = (
            <div className={appClasses.TextCenter}>
                {timy}
                <p>Please sign in</p>
            </div>
        )
    } else {
        formTitle = (
            <div className={appClasses.TextCenter}>
                {timy}
                <p>Please sign in</p>
            </div>
        )
    }

    return (
        <React.Fragment>
            {authRedirect}
            {formTitle}
            {loginFormJsx}
        </React.Fragment>
    )
}
// export default withErrorHandler(auth, axios);
export default auth;
