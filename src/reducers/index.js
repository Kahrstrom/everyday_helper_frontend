import { combineReducers } from 'redux';
import SessionReducer, { registerFailure, registerSuccess } from './session';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
   session: SessionReducer,
   form: formReducer
});

export default rootReducer;