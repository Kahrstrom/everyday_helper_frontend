import { 
      LOGGING_IN, 
      LOGGING_IN_SUCCESS, 
      LOGGING_IN_FAILURE, 
      REGISTERING, 
      REGISTERING_FAILURE, 
      REGISTERING_SUCCESS 
} from '../actions/session';

const INITIAL_STATE = {
      username: '',
      account: '',
      token: '',
      error: '',
      valid: false,
      loading: false
};

export default function(state = INITIAL_STATE, action) {
      
   switch(action.type) {
      case LOGGING_IN:
         return {
            ...state,
            session: {
               username: action.username,
               account: action.account,
               token: '',
               error: '',
               valid: false,
               loading: true
            }
         };
      case LOGGING_IN_SUCCESS:
         return {
            ...state, 
            session: {
               username: action.session.username,
               token: action.session.token,
               account: action.session.account,
               error: '',
               valid: true,
               loading: false
            }
         };
      case LOGGING_IN_FAILURE:
         return {
            ...state,
            session: {
               username: '',
               token: '',
               account: '',
               error: action.error,
               valid: false,
               loading: false
            }
         };
      case REGISTERING:
         return {
            ...state,
            session: {
               username: action.username,
               account: action.account,
               token: '',
               error: '',
               valid: false,
               loading: true
            }
         };
      case REGISTERING_SUCCESS:
         return {
            ...state, 
            session: {
               username: action.session.username,
               account: action.session.account,
               token: action.session.token,
               error: '',
               valid: true,
               loading: false
            }
         };
      case REGISTERING_FAILURE:
         return {
            ...state,
            session: {
               username: '',
               account: '',
               token: '',
               error: action.error,
               valid: false,
               loading: false
            }
         };
      
      default:
         return state;
   }
}
