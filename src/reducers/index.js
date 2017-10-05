import { combineReducers } from 'redux';
import SessionReducer from './session';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
   session: SessionReducer,
   form: formReducer
});


export default rootReducer;