import React, {Component} from 'react';
import axios from '../../axios';


import KanbanColumn from './Column/Column';

// import appClasses from '../../App.css';
import classes from './Kanban.css';

import withErrorHandler from '../../shared/hoc/withErrorHandler/withErrorHandler';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import LoadingIndicator from '../../shared/UI/Spinner/LoadingIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';

class Kanban extends Component {

    // // constructor not required when using state inside component shortcut
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        kanbanColumns: [],
        projects: [],
        isTicketClicked: false,
        currentTicket: null,
        currentProject: null,
        otherState: 'some other value',
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('/demo/kanbanColumns.json')
            .then(response => {
                const columns = Array.isArray(response.data) ? response.data : response.data[Object.keys(response.data)];
                this.setState({kanbanColumns: columns});
            })
            .catch(error => {
                // console.log(error);
                this.setState({loading: false, error: 'error to show'});
            });

        axios.get('/demo/projects.json')
            .then(res => {
                const projects = [];
                for (let key in res.data) {
                    projects.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({projects: projects});
            })
            .catch(error => {
                // console.log(error);
                this.setState({loading: false, error: 'error to show'});
            });

    }

    logoutHandler = () => {
        this.props.history.push('/auth/logout');
    };

    updateKanbanColumnsHandler = () => {
        const columns = this.state.kanbanColumns;
        axios.put('/demo/kanbanColumns.json', columns)
            .then(response => {
                // console.log(response);
                this.setState({loading: false});
            })
            .catch(error => {
                // console.log(error);
                this.setState({loading: false, error: 'error to show'});
            });
    }

    clickTicketHandler = (ticket) => {
        this.setState({isTicketClicked: true, currentTicket: ticket, loading: true});

        // retrieve project (POST) from backend
        if (ticket && ticket.id) {
            // example how to build query params
            const queryParams = [];
            const someDummyToQuery = [1, 2, 3];
            for (let i in someDummyToQuery) {
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(someDummyToQuery[i]));
            }
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname: '/projects/' + ticket.id,
                search: '?' + queryString
            });
        }
    };

    render() {
        let columns = null;
        if (this.state.kanbanColumns.length > 0 && this.state.projects.length > 0) {
            columns = this.state.kanbanColumns.map((column, index) => {
                return <KanbanColumn
                    columnNumber={index + 1}
                    totalColumns={this.state.kanbanColumns.length}
                    title={column.title}
                    color={column.color}
                    projects={this.state.projects.filter(project => project.status === column.status)}
                    ticketClicked={(ticket) => this.clickTicketHandler(ticket)}
                    key={column.id}
                />
            });
        } else {
            // // show skeleton
            // const skeletons = [];
            // skeletons.push(
            //     <Box display="flex" justifyContent="flex-start" key='box1'>
            //         <Skeleton animation="wave" variant="circle" width={40} height={40} key='0'/>
            //         <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 20}} key='1'/>
            //     </Box>);
            //
            // for (let i = 2; i < 7; i++) {
            //     skeletons.push(<Skeleton animation="wave" variant="rect" style={{height: 200, marginBottom: 20}}
            //                              key={i}/>)
            // }
            //
            // const skeletonCols = [1, 2, 3, 4, 5].map((val) => {
            //     return <div className={classes.SkeletonColumn} key={val}>
            //         {skeletons}
            //     </div>
            // });
            //
            // columns = (
            //     <div className={classes.Kanban}>
            //         {skeletonCols}
            //     </div>
            // );
            columns = (
                <div className={classes.Kanban}>
                    <LoadingIndicator />
                </div>
            );

            // columns = (
            //     <div className={classes.Kanban}>
            //         <CircularProgress/>
            //     </div>
            // );
        }

        columns = (
            <div className={classes.Kanban}>
                <LoadingIndicator />
            </div>
        );

        let filters = null;

        filters = (
            // <div className={appClasses.flex + ' ' + appClasses.justifyBetween}>
            <div className={classes.Filters}>
                <div>Filters</div>
                <button onClick={this.logoutHandler}>LOGOUT</button>
            </div>
        );


        return (
            <React.Fragment>
                <Button variant="contained" color="primary"
                        onClick={this.updateKanbanColumnsHandler}>Update kanban columns</Button>

                {filters}
                <div className={classes.Kanban}>
                    {columns}
                </div>

                <h2>Relevant articles:</h2>
                <p>State management - RxJs + hooks:
                    https://blog.logrocket.com/rxjs-with-react-hooks-for-state-management/</p>
                <p>React + Redux in depth: https://medium.com/octopus-wealth/authenticated-routing-with-react-react-router-redux-typescript-677ed49d4bd6</p>
                <p>React + RxJs: https://jasonwatmore.com/post/2019/02/13/react-rxjs-communicating-between-components-with-observable-subject</p>
                <p>React + firebase: https://www.robinwieruch.de/react-firebase-realtime-database</p>
                <p>React drag and drop: https://react-dnd.github.io/react-dnd/about</p>
                <p>React multi select: https://react-select.com/home + https://github.com/JedWatson/react-select</p>
                <p>Injectable services in react: https://medium.com/the-guild/injectable-services-in-react-de0136b6d476</p>
                <p>remember url before logout with store middleware: https://github.com/ReactTraining/react-router/issues/1066</p>
            </React.Fragment>
        )
    }
}

export default withErrorHandler(Kanban, axios);
