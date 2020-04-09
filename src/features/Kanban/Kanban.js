import React, {Component} from 'react';
// import axios from 'axios';
import axios from '../../axios';


import Aux from '../../shared/hoc/Aux/Aux';
import KanbanColumn from './Column/Column';

// import '../../App.css';
import appClasses from '../../App.css';
import classes from './Kanban.css';
import Modal from '../../shared/UI/Modal/Modal';
import Spinner from '../../shared/UI/Spinner/Spinner';

import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import {Route} from 'react-router-dom';
import Project from '../Project/Project';

class Kanban extends Component {

    // // constructor not required when using state inside component shortcut
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    // columns: [
    //     {id: 1, title: 'Proposal', status: 'proposal'},
    //     {id: 2, title: 'Pending approval', status: 'pending-approval'},
    //     {id: 3, title: 'In progress', status: 'in-progress'},
    //     {id: 4, title: 'Completed', status: 'completed'},
    //     {id: 5, title: 'Archived', status: 'archived'}
    // ]

    state = {
        kanbanColumns: null,
        projects: [
            {id: 1, name: 'project 1', status: 'proposal'},
            {id: 2, name: 'project 2', status: 'pending-approval'},
            {id: 3, name: 'project 3', status: 'in-progress'},
            {id: 4, name: 'project 4', status: 'completed'},
            {id: 5, name: 'project 5', status: 'archived'},
            {id: 5, name: 'project 5', status: 'deleted'},
        ],
        posts: [],
        isTicketClicked: false,
        currentTicket: null,
        currentProject: null,
        otherState: 'some other value',
        loading: false,
        error: null
    };

    componentDidMount() {
        setTimeout(() => {
            axios.get('/demo/kanbanColumns.json')
                .then(response => {
                    const columns = Array.isArray(response.data) ? response.data : response.data[Object.keys(response.data)];
                    this.setState({kanbanColumns: columns});
                })
                .catch(error => {
                    console.log(error);
                    this.setState({loading: false, error: 'error to show'});
                });
        }, 2500);
    }

    addProjectHandler = () => {
        alert('add new project form will render');
    };

    updateKanbanColumnsHandler = () => {
        const columns = this.state.kanbanColumns;
        // const columns =   [
        //         {id: 1, title: 'Proposal', status: 'proposal'},
        //         {id: 2, title: 'Pending approval', status: 'pending-approval'},
        //         {id: 3, title: 'In progress', status: 'in-progress'},
        //         {id: 4, title: 'Completed', status: 'completed'},
        //         {id: 5, title: 'Archived', status: 'archived'}
        //     ];
        axios.put('/demo/kanbanColumns.json', columns)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, error: 'error to show'});
            });
    }

    clickTicketHandler = (ticket) => {
        this.setState({isTicketClicked: true, currentTicket: ticket});

        // retrieve project (POST) from backend
        this.setState({loading: true});



        if (ticket && ticket.id) {
            this.props.history.push({pathname: '/projects/' + ticket.id});
            // const project = {
            //     name: ticket.name,
            //     action: 'clicked',
            //     changedByUserId: 123
            // };
            //
            // setTimeout(() => {
            //     axios.post('/demo/projects.json', project)
            //         .then(response => {
            //             console.log(response);
            //             this.setState({loading: false});
            //         })
            //         .catch(error => {
            //             console.log(error);
            //             this.setState({loading: false, error: 'error to show'});
            //         });
            // }, 1500);
        }
    };

    cancelModalHandler = () => {
        this.setState({isTicketClicked: false});
    };

    snackbarCloseHandler = () => {
        alert('close snackbar');
        this.setState({error: null});
    };

    tmpHandleClick = () => {
        this.setState({error: 'error to show'});
    };


    render() {

        let columns = null;
        if (this.state.kanbanColumns) {
            columns = this.state.kanbanColumns.map((column, index) => {
                return <KanbanColumn
                    title={column.title}
                    projects={this.state.projects.filter(project => project.status === column.status)}
                    ticketClicked={(ticket) => this.clickTicketHandler(ticket)}
                    key={column.id}
                />
            });
        } else {
            // show skeleton
            const skeletons = [];
            skeletons.push(
                <Box display="flex" justifyContent="flex-start" key='box1'>
                    <Skeleton animation="wave" variant="circle" width={40} height={40} key='0'/>
                    <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 20}} key='1'/>
                </Box>);

            for (let i = 2; i < 7; i++) {
                skeletons.push(<Skeleton animation="wave" variant="rect" style={{height: 200, marginBottom: 20}}
                                         key={i}/>)
            }

            const skeletonCols = [1, 2, 3, 4, 5].map((val) => {
                return <div className={classes.SkeletonColumn} key={val}>
                    {skeletons}
                </div>
            });

            columns = (
                <div className={classes.Kanban}>
                    {skeletonCols}
                </div>
            );
        }

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

        let modalContent = (
            <div>
                <p>ticket clicked</p>
                <p>{this.state.currentTicket ? this.state.currentTicket.name : null}</p>
            </div>
        );

        if (this.state.loading) {
            modalContent = <Spinner/>
        }

        return (
            <Aux>
                <Button variant="contained" color="primary"
                        onClick={this.updateKanbanColumnsHandler}>Update kanban columns</Button>


                {filters}

                <div className={classes.Kanban}>
                    {columns}
                </div>

                {/*<Modal show={this.state.isTicketClicked} modalClosed={this.cancelModalHandler}>*/}
                {/*    {modalContent}*/}
                {/*</Modal>*/}

                <Route path="/" exact component={Project} />


                {currentProjectEdit}

                <h2>Relevant articles:</h2>
                <p>State management - RxJs + hooks:
                    https://blog.logrocket.com/rxjs-with-react-hooks-for-state-management/</p>
            </Aux>
        )
    }
}

export default withErrorHandler(Kanban, axios);
