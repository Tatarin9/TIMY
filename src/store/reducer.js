import {combineReducers, createStore, applyMiddleware} from 'redux';
import kanbanReducer from '../features/Kanban/_store/kanban-reducer';


const rootReducer = combineReducers({
    kanban: kanbanReducer
});

export default rootReducer;


