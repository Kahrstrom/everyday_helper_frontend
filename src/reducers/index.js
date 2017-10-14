import { combineReducers } from 'redux';
import session from './session';
import ui from './ui';
import todo from './todo';
import user from './user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
   session,
   ui,
   todo,
   user,
   form: formReducer
});

export default rootReducer;