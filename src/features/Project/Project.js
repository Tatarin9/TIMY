import React, { useEffect, useState } from 'react';
import axios from '../../axios';

import classes from './Project.css';
import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import { setFormControl, formControlChangeHandler } from '../../shared/FormHelpers';
import Input from '../../shared/UI/Input/Input';
import Button from '../../shared/UI/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as projectActions from './_store/project-actions';
import { useDispatch, useSelector } from 'react-redux';

const project = props => {

    const [projectForm, setProjectForm] = useState({
        controls: [
            setFormControl('projectNameId', 'projectName', 'input', 'text', 'Project name', '', {required: true}, false, false),
            setFormControl('projectCustomerId', 'customer', 'input', 'text', 'Customer name', '', {required: true}, false, false),
            setFormControl('projectCustomerIdId', 'customerId', 'input', 'text', 'Customer id', '', {required: true}, false, false),
        ],
        valid: true
    });

    const dispatch = useDispatch();
    const getProjectRequest = () => dispatch(projectActions.getProjectRequestAction());
    const getProjectSuccess = (project) => dispatch(projectActions.getProjectSuccessAction(project));
    const getProjectFailure = (error) => dispatch(projectActions.getProjectFailureAction(error));

    const isProjectLoading = useSelector(state => state.currentProject.isProjectLoading);

    // send request only on first render (pass [] in useEffect arguments)
    useEffect(() => {
        if (props.match.params.id) {
            const projectId = props.match.params.id;
            getProjectRequest();
            axios.get(`/demo/projects/${projectId}.json`)
                .then(response => {
                    getProjectSuccess(response.data);
                    patchFormValues(response.data);
                })
                .catch(error => {
                    getProjectFailure(error);
                });
        }
    }, []);

    const patchFormValues = (project) => {
        const updatedProjectForm = {
            ...projectForm
        };

        let controlIndex = -1;
        for (let projectProperty in project) {
            controlIndex = updatedProjectForm.controls.findIndex((control) => control.name === projectProperty);
            if (controlIndex > -1) {
                updatedProjectForm.controls[controlIndex].value = project[projectProperty];
            }
        }
        setProjectForm(updatedProjectForm);
    }

    const inputChangedHandler = (event, controlId) => {
        const updatedProjectForm = formControlChangeHandler(event.target.value, controlId, projectForm)
        setProjectForm(updatedProjectForm);
    }

    const submitProjectHandler = (event) => {
        event.preventDefault();
        const updatedProjectForm = {
            ...projectForm
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

        const projectId = props.match.params.id;
        const crudAction = projectId ? 'put' : 'post';
        const endpointUrl = projectId ? `/demo/projects/${projectId}.json` : '/demo/projects.json';
        axios[crudAction](endpointUrl, project)
            .then(response => {
                props.history.push('/projects');
            })
            .catch(error => {
                console.log(error);
            });
    }

    let form = (<form onSubmit={submitProjectHandler}>
        {projectForm.controls.map(formControl => (
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
        <Button btnType="Success" disabled={!projectForm.valid}
                clicked={submitProjectHandler}>ORDER</Button>
    </form>)

    if (isProjectLoading) {
        form = <CircularProgress/>;
    }

    let project = null;
    project = (
        <div className={classes.Project}>
            <h4>Project Edit</h4>
            <p>Project id is {props.match.params.id}</p>
            {form}
        </div>
    );

    return (
        <React.Fragment>
            {project}
        </React.Fragment>
    )
}
export default withErrorHandler(project, axios);
