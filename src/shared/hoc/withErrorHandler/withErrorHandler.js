import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Snackbar from '@material-ui/core/Snackbar';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component  {

        // constructor(props) {
        //     super(props);


        state = {
            error: null
        }
        reqInterceptor;
        resInterceptor;

        componentWillMount() {
            console.log('Will mount', this.reqInterceptor, this.resInterceptor);
            // clear error when request is fired
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        // this class instance is created multiple times for each component that it wraps over,
        // so there may be memory leaks to cleaned here
        componentWillUnmount() {
            // clear interceptors
            console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render () {
            return (
                <Aux>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={!!this.state.error}
                        onClose={()=>{this.setState({error: null})}}
                        autoHideDuration={10000}
                        message={this.state.error ? this.state.error.message : null}
                    />
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }

    }
}

export default withErrorHandler;
