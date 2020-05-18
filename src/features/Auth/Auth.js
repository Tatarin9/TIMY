import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { useStore } from '../../shared/hooks-store/store';
import useHttp from '../../shared/hooks/http';

import { formControlChangeHandler, getFormControlValueById, setFormControl } from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';
import LoadSpinner from '../../shared/UI/LoadSpinner/LoadSpinner';

import classes from './Auth.css';
import appClasses from '../../App.css';
import timyLogoColored from '../../assets/timy_logo_colored.svg';
import marketingPic from '../../assets/tmp-pic.png';



const auth = props => {
    const [loginForm, setLoginForm] = useState({
        controls: [
            setFormControl('email', 'email', 'Email', 'input', 'text', 'Email', '', {
                required: true,
                isEmail: true
            }, false, false),
            setFormControl('password', 'password', 'Password', 'input', 'password', 'Password', '', {
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
                <Link href='#'>Forgot password?</Link>
                <Link href='#' className={appClasses.TextEnd}>Sign up to create account</Link>
            </form>
        </div>
    );

    if (state.isAuthLoading) {
        loginFormJsx = (
            <div className={appClasses.TextCenter}>
                <LoadSpinner/>
            </div>
        );
    }

    let authRedirect = null;
    if (state.authData != null) {
        authRedirect = <Redirect to="/"/>
    }

    const logo = <img src={timyLogoColored} alt="Timy"/>
    const pic = <div><img src={marketingPic} alt="Timy"/></div>
    const timy = <h2>Timy - Time based project management</h2>;
    let formTitle = null;
    formTitle = (
        <div className={appClasses.TextCenter}>
            {logo}
            {pic}
            {timy}
        </div>
    )

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
