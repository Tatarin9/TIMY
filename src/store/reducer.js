import {combineReducers} from 'redux';
import projectReducer from '../features/Projects/Project/_store/project-reducer';

const rootReducer = combineReducers({
    currentProject: projectReducer,
});

export default rootReducer;


