import React, {Component, useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import useHttpErrorHandler from '../../hooks/http-error.handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={!!error}
                    onClose={() => {clearError}}
                    autoHideDuration={5000}
                    message={error ? error.statusText : null}
                />
                <WrappedComponent {...props}/>
            </React.Fragment>
        );
    }
}

export default withErrorHandler;
