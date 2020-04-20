import React, {Component} from 'react';
import axios from '../../axios';

import TextField from '@material-ui/core/TextField';

import classes from './Project.css';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import {setFormControl, formControlChangeHandler} from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as projectActions from './_store/project-actions';
import {connect} from 'react-redux';

export class Project extends Component {

    state = {
        projectForm: {
            controls: [
                setFormControl('projectNameId', 'projectName', 'input', 'text', 'Project name', '', {required: true}, false, false),
                setFormControl('projectCustomerId', 'customer', 'input', 'text', 'Customer name', '', {required: true}, false, false),
                setFormControl('projectCustomerIdId', 'customerId', 'input', 'text', 'Customer id', '', {required: true}, false, false),
            ],
            valid: true
        },
        submitted: false,
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            const projectId = this.props.match.params.id;
            this.props.getProjectRequest();
            axios.get(`/demo/projects/${projectId}.json`)
                .then(response => {
                    this.props.getProjectSuccess(response.data);
                    this.patchFormValues(response.data);
                    // this.setState({loading: false});
                })
                .catch(error => {
                    this.props.getProjectFailure(error);
                    // this.setState({loading: false, error: 'error to show'});
                });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('load data from backend by project id');
    }

    patchFormValues = (project) => {
        const updatedProjectForm = {
            ...this.state.projectForm
        };

        let controlIndex = -1;
        for (let projectProperty in project) {
            controlIndex = updatedProjectForm.controls.findIndex((control) => control.name === projectProperty);
            if (controlIndex > -1) {
                updatedProjectForm.controls[controlIndex].value = project[projectProperty];
            }
        }
        this.setState({projectForm: updatedProjectForm});
    }

    inputChangedHandler = (event, controlId) => {
        const updatedProjectForm = formControlChangeHandler(event.target.value, controlId, this.state.loginForm )
        this.setState({projectForm: updatedProjectForm});
    }

    submitProjectHandler = (event) => {
        event.preventDefault();
        const updatedProjectForm = {
            ...this.state.projectForm
        };

        const formData = {};
        updatedProjectForm.controls.forEach(control => {
            formData[control.name] = control.value;
        })

        const project = {
            ...formData,
            status: 'completed',
            phases: [
                {name: 'planning', estimatedHours: 12},
                {name: 'design-review', estimatedHours: 10},
                {name: 'development', estimatedHours: 15},
                {name: 'testing', estimatedHours: 20},
                {name: 'product-review', estimatedHours: 20},
                {name: 'transition', estimatedHours: 20},
                {name: 'support', estimatedHours: 20},
            ],
            currentPhase: 'planning'
        }

        const projectId = this.props.match.params.id;
        const crudAction = projectId ? 'put' : 'post';
        const endpointUrl = projectId ? `/demo/projects/${projectId}.json` : '/demo/projects.json';
        axios[crudAction](endpointUrl, project)
            .then(response => {
                this.props.history.push('/projects');
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let form = (
            <form onSubmit={this.submitProjectHandler}>
                {this.state.projectForm.controls.map(formControl => (
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
                <Button btnType="Success" disabled={!this.state.projectForm.valid}
                        clicked={this.submitProjectHandler}>ORDER</Button>
            </form>
        );
        if (this.props.isProjectLoading) {
            form = <CircularProgress/>;
        }

        let project = null;
        project = (
            <div className={classes.Project}>
                <h4>Project data</h4>
                <p>Project id is {this.props.match.params.id}</p>
                <form>
                    <TextField id="outlined-basic" label="Project name" variant="outlined" size="small"/>
                    <TextField id="outlined-basic" label="Customer" variant="outlined" size="small"/>
                    <TextField id="outlined-basic" label="Due date" variant="outlined" size="small"/>
                    <TextField id="outlined-basic" label="Owner" variant="outlined" size="small"/>
                </form>
                <Button variant="contained" color="primary"
                        onClick={this.submitProjectHandler}>Submit</Button>

                <h4>Custom FORM</h4>
                {form}

            </div>
        );

        return (
            <React.Fragment>
                {project}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentProject: state.currentProject.currentProject,
        isProjectLoading: state.currentProject.isProjectLoading,
        error: state.currentProject.error
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getProjectRequest: () => dispatch(projectActions.getProjectRequestAction()),
        getProjectSuccess: (project) => dispatch(projectActions.getProjectSuccessAction(project)),
        getProjectFailure: (error) => dispatch(projectActions.getProjectFailureAction(error)),
        // onDeleteProject: (projectId) => dispatch(projectActions.deleteProject(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Project, axios));
