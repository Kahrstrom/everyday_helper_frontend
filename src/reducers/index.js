import { combineReducers } from 'redux';
import SessionReducer from './session';
import UIReducer from './ui';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
   session: SessionReducer,
   ui: UIReducer,
   form: formReducer
});

export default rootReducer;