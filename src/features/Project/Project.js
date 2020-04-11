import React, {Component} from 'react';
import axios from '../../axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import classes from './Project.css';
import Aux from '../../shared/hoc/Aux/Aux';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import {setFormControl, checkFromElementValidity} from '../../shared/Helpers';
import Input from '../../shared/UI/Input/Input';

class Project extends Component {

    state = {
        projectForm: {
            controls: [
                setFormControl('projectNameId', 'projectName', 'input', 'text', 'Project name', '', { required: true}, false, false),
                setFormControl('projectCustomerId','customer', 'input', 'text', 'Customer name', '', { required: true}, false, false),
                setFormControl('projectCustomerIdId','customerId', 'input', 'text', 'Customer id', '', { required: true}, false, false),
            ],
            valid: true
        },
        loading: false,
        submitted: false,
        error: null,
    };

    // projectName: '',
    // customer: '',
    // customerId: '',
    // approvalDate: '',
    // dueDate: '',
    // budgetHours: '',
    // actualHours: '',
    // ownerId: '',
    // ownerName: '',
    // steps: [],



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

    inputChangedHandler = (event, inputIdentifier) => {
        debugger
        const updatedProjectForm = {
            ...this.state.projectForm
        };
        const controlIndex = updatedProjectForm.controls.findIndex( (control) => control.id === inputIdentifier );
        const updatedFormElement = {
            ...updatedProjectForm.controls[controlIndex]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkFromElementValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedProjectForm.controls[controlIndex] = updatedFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedProjectForm) {
            isFormValid = updatedProjectForm.controls[controlIndex].valid && isFormValid;
        }
        updatedProjectForm.valid = isFormValid;
        this.setState({projectForm: updatedProjectForm});
    }

    submitProjectHandler = (event) => {
        event.preventDefault();

        const project = {
            name: 'stam',
            action: 'clicked',
            changedByUserId: 123,
            status: 'completed'
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
        let form = (
            <form onSubmit={this.submitProjectHandler}>
                {this.state.projectForm.controls.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={formElement.value}
                        invalid={!formElement.valid}
                        shouldValidate={formElement.validation}
                        touched={formElement.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        // if ( this.state.loading ) {
        //     form = <Spinner />;
        // }


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
                {form}
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
