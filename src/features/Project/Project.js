import React, {Component} from 'react';
import axios from '../../axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import classes from './Project.css';
import Aux from '../../shared/hoc/Aux/Aux';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';

class Project extends Component {

    state = {
        name: '',
        customer: '',
        dueDate: '',
        budget: '',
        owner: '',
        loading: false,
        submitted: false,
        error: null,
    };

    componentDidMount() {
        const projectId = this.props.match.params.id;
        setTimeout(() => {
            axios.get(`/demo/projects/${projectId}.json`)
                .then(response => {
                    debugger
                    console.log(response);
                    this.setState({loading: false});
                })
                .catch(error => {
                    console.log(error);
                    this.setState({loading: false, error: 'error to show'});
                });
        }, 1500);
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
        let project = null;
        project = (
            <div className={classes.Project}>
                <h4>Project data</h4>
                <p>Project id is {this.props.match.params.id}</p>
                <form>
                    <TextField id="outlined-basic" label="Customer" variant="outlined" size="small"/>
                    <TextField id="outlined-basic" label="Due date" variant="outlined" size="small"/>
                </form>
                <Button variant="contained" color="primary"
                        onClick={this.submitProjectHandler}>Submit</Button>
            </div>
        );

        return (
            <Aux>
                {project}
            </Aux>
        )
    }
}

export default withErrorHandler(Project, axios);
