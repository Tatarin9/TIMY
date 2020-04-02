import React, {Component} from 'react';

import Aux from '../../shared/Aux';
import KanbanColumn from './Column/Column';

// import '../../App.css';
import appClasses from '../../App.css';
import classes from './Kanban.css';

class Kanban extends Component {

    // // constructor not required when using state inside component shortcut
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        columns: [
            {id: 1, title: 'Proposal', status: 'proposal'},
            {id: 2, title: 'Pending approval', status: 'pending-approval'},
            {id: 3, title: 'In progress', status: 'in-progress'},
            {id: 4, title: 'Completed', status: 'completed'},
            {id: 5, title: 'Archived', status: 'archived'}
        ],
        projects: [
            {id: 1, name: 'project 1', status: 'proposal'},
            {id: 1, name: 'project 2', status: 'pending-approval'},
            {id: 1, name: 'project 3', status: 'in-progress'},
            {id: 1, name: 'project 4', status: 'completed'},
            {id: 1, name: 'project 5', status: 'archived'},

        ],
        otherState: 'some other value'
    };

    addProjectHandler = () => {
        alert('add new project form will render');
    };

    render() {

        let columns = null;

        columns = (
            <div className={classes.KanbanColumnWrapper}>
                {this.state.columns.map((column, index) => {
                    return <KanbanColumn
                        title={column.title}
                        projects={this.state.projects.filter(project => project.status === column.status)}
                        key={column.id}
                    />
                })}
            </div>
        );

        let filters = null;

        filters = (
            <div className={appClasses.flex + ' ' + appClasses.justifyBetween}>
                <div>Filters</div>
                <button onClick={this.addProjectHandler}>Add project</button>
            </div>
        );

        return (
            <Aux>
                {filters}
                <div className={classes.Kanban}>
                    {columns}
                </div>
            </Aux>
        );
    }
}

export default Kanban;
