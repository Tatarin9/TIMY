import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../../axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import useHttp from '../../../shared/hooks/http';
import { useStore } from '../../../shared/hooks-store/store';

import classes from './Project.css';
import withErrorHandler from '../../../shared/hoc/withErrorHandler/withErrorHandler';
import { setFormControl, formControlChangeHandler } from '../../../shared/FormHelpers';
import Input from '../../../shared/UI/Input/Input';
import Button from '../../../shared/UI/Button/Button';

const project = props => {
    const [projectForm, setProjectForm] = useState({
        controls: [
            setFormControl('projectNameId', 'projectName', 'Project name', 'input', 'text', 'Project name', '', {required: true}, false, false),
            setFormControl('projectCustomerId', 'customer', 'Customer name', 'input', 'text', 'Customer name', '', {required: true}, false, false),
            setFormControl('projectCustomerIdId', 'customerId', 'Customer ID', 'input', 'text', 'Customer id', '', {required: true}, false, false),
        ],
        valid: true
    });

    const [state, dispatch] = useStore();
    const project = useHttp();

    // listen current project
    useEffect(() => {
        if (!project.isLoading && !project.error && project.data) {
            dispatch('FETCH_CURRENT_PROJECT_SUCCESS', project.data.data);
            patchFormValues(project.data.data);
        }
        if (project.error) {
            dispatch('FETCH_CURRENT_PROJECT_FAILURE', project.error);
            alert('show error:' + project.error ? project.error.data.error.message : 'Server error occured');
        }
    }, [project.data, project.isLoading, project.error]);

    const fetchCurrentProject = useCallback((projectId) => {
        dispatch('FETCH_CURRENT_PROJECT_REQUEST');
        project.sendRequest(
            `/demo/projects/${projectId}.json`,
            'get',
            null,
            null,
            null
        );
    }, [dispatch, project.sendRequest]);

    // fetch projects
    useEffect(() => {
        if (props.match.params.id) {
            const projectId = props.match.params.id;
            fetchCurrentProject(projectId);
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

        const projectToSubmit = {
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
            actualHours: 10,
            budgetHours: 30,
            issuedHours: 5,
            currentPhase: 'planning'
        }

        const projectId = props.match.params.id;
        const crudAction = projectId ? 'put' : 'post';
        const endpointUrl = projectId ? `/demo/projects/${projectId}.json` : '/demo/projects.json';

        axios[crudAction](endpointUrl, projectToSubmit)
            .then(response => {
                props.history.push('/projects');
            })
            .catch(error => {
                console.log(error);
            });
    }

    let form = (
        <form className={classes.ProjectForm} onSubmit={submitProjectHandler}>
            {projectForm.controls.map(formControl => (
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
        <Button btnType="Success" disabled={!projectForm.valid}
                clicked={submitProjectHandler}>ORDER</Button>
    </form>)

    if (state.isProjectLoading) {
        form = <CircularProgress/>;
    }

    let projectJsx = null;
    projectJsx = (
        <div className={classes.Project}>
            <h4>Project Edit</h4>
            <p>Project id is {props.match.params.id}</p>
            {form}
        </div>
    );

    return (
        <React.Fragment>
            {projectJsx}
        </React.Fragment>
    )
}
export default withErrorHandler(project, axios);
