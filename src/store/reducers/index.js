import { combineReducers } from 'redux';
import results from './results';
import update from './update';

const rootReducer = combineReducers({
    results,
    update
});

export default rootReducer;
