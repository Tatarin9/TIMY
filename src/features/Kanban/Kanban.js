import React, {Component} from 'react';
// import axios from 'axios';
import axios from '../../axios';


import Aux from '../../shared/Aux';
import KanbanColumn from './Column/Column';

// import '../../App.css';
import appClasses from '../../App.css';
import classes from './Kanban.css';
import Modal from '../../shared/Modal/Modal';

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
            {id: 2, name: 'project 2', status: 'pending-approval'},
            {id: 3, name: 'project 3', status: 'in-progress'},
            {id: 4, name: 'project 4', status: 'completed'},
            {id: 5, name: 'project 5', status: 'archived'},

        ],
        posts: [],
        isTicketClicked: false,
        currentTicket: null,
        currentProject: null,
        otherState: 'some other value'
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
            console.log(res);
            const threePosts = res.data.slice(0, 3);
            const threePostsWithNewProperty = threePosts.map((post, index) => {
                return {...post, newProp: 'new ' + index}
            });
            this.setState({posts: threePostsWithNewProperty});
            console.log(this.state.posts);
        });
    }

    addProjectHandler = () => {
        alert('add new project form will render');
    };

    clickTicketHandler = (ticket) => {
        this.setState({isTicketClicked: true, currentTicket: ticket});
        // retrieve project (POST) from backend
        if (ticket && ticket.id) {
            axios.get('/posts/' + ticket.id)
                .then(res => {
                    let currentProject = res.data;
                    currentProject = {...currentProject, newProp: 'new edited project'}
                    this.setState({currentProject: currentProject});
                })
                .catch(error => {
                    console.log((error));
                });
        }

    };

    cancelModalHandler = () => {
        this.setState({isTicketClicked: false});
    };

    render() {

        let columns = null;

        columns = this.state.columns.map((column, index) => {
            return <KanbanColumn
                title={column.title}
                projects={this.state.projects.filter(project => project.status === column.status)}
                ticketClicked={(ticket) => this.clickTicketHandler(ticket)}
                key={column.id}
            />
        })
        ;

        let filters = null;

        filters = (
            <div className={appClasses.flex + ' ' + appClasses.justifyBetween}>
                <div>Filters</div>
                <button onClick={this.addProjectHandler}>Add project</button>
            </div>
        );

        let currentProjectEdit = null;
        if (this.state.currentProject) {
            currentProjectEdit = (
                <div>
                    <p>EDITED PROJECT - TO BE CONVERTED TO ROUTED PAGE</p>
                    <h3>Project title: {this.state.currentProject.title}</h3>
                </div>
            );
        }

        return (
            <Aux>
                {filters}
                <div className={classes.Kanban}>
                    {columns}
                </div>
                <Modal show={this.state.isTicketClicked} modalClosed={this.cancelModalHandler}>
                    <p>ticket clicked</p>
                    <p>{this.state.currentTicket ? this.state.currentTicket.name : null}</p>
                </Modal>
                {currentProjectEdit}
                <h2>Relevant articles:</h2>
                <p>State management - RxJs + hooks: https://blog.logrocket.com/rxjs-with-react-hooks-for-state-management/</p>
            </Aux>
        )
    }
}

export default Kanban;
