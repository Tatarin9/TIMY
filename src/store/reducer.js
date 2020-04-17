import {combineReducers} from 'redux';
import projectReducer from '../features/Project/_store/project-reducer';
import authReducer from '../features/Auth/_store/auth-reducer';

const rootReducer = combineReducers({
    currentProject: projectReducer,
    auth: authReducer
});

export default rootReducer;


