import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../../shared/hooks-store/store';

const logout = (props) => {
    const dispatch = useStore()[1];
    useEffect(() => {
        dispatch('AUTH_CLEAR');
        localStorage.removeItem('auth');
    }, []);
    return <Redirect to='/auth/signin'/>;
}

export default logout;
