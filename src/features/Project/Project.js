import React, {Component} from 'react';
import axios from '../../axios';


import Aux from '../../shared/hoc/Aux/Aux';

import classes from './Project.css';

import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Project extends Component {

    state = {
        projects: null,
        loading: false,
        submitted: false,
        error: null,
    };

    componentDidMount() {
        console.log(this.props);
        console.log('project id: ' + this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('load data from backend by project id');
    }

    submitProjectHandler = () => {
        const project = {
            name: 'stam',
            action: 'clicked',
            changedByUserId: 123
        };

        axios.post('/demo/projects.json', project)
            .then(response => {
                console.log(response);
                this.setState({loading: false, submitted: true});
                this.props.history.push('/projects');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, error: 'error to show'});
            });
    }

    render() {
        // let redirect = null;
        // if (this.state.submitted) {
        //     redirect = <Redirect to="/projects"/>
        // }

        let project = null;

        project = (
            <div>
                <p>Project id is {this.props.match.params.id}</p>
                <p>Render</p>
            </div>
        );

        return (
            <Aux>
                <div>
                    {project}
                    <Button variant="contained" color="primary"
                            onClick={this.submitProjectHandler}>Submit</Button>

                </div>
                {/*{redirect}*/}
            </Aux>
        )
    }
}

export default withErrorHandler(Project, axios);
