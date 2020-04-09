import React, {Component} from 'react';
import axios from '../../axios';


import Aux from '../../shared/hoc/Aux/Aux';

import classes from './Project.css';

import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';

class Project extends Component {

    state = {
        projects: null,
        loading: false,
        error: null
    };

    componentDidMount() {
        console.log(this.props);
        console.log('project id: ' + this.props.match.params.id);
    }
      componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('load data from backend by project id');
      }

    render() {

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
                </div>
            </Aux>
        )
    }
}

export default withErrorHandler(Project, axios);
