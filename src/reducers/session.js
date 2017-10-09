import { 
      LOGGING_IN, 
      LOGGING_IN_SUCCESS, 
      LOGGING_IN_FAILURE, 
      LOGGING_OUT,
      LOGGING_OUT_FAILURE,
      LOGGING_OUT_SUCCESS,
      REGISTERING, 
      REGISTERING_FAILURE, 
      REGISTERING_SUCCESS 
} from '../actions/session';

const INITIAL_STATE = {
      user: {},
      auth_token: '',
      error: '',
      valid: false,
      loading: false
};

export default function(state = INITIAL_STATE, action) {
      
   switch(action.type) {
      case LOGGING_IN:
         return {
            user: {},
            auth_token: '',
            error: '',
            valid: false,
            loading: true
         };
      case LOGGING_IN_SUCCESS:
         return {
            user: action.session.user,
            auth_token: action.session.auth_token,
            error: '',
            valid: true,
            loading: false
         };
      case LOGGING_IN_FAILURE:
         return {
            ...state,
            error: action.error,
            valid: false,
            loading: false
         };
      case LOGGING_OUT:
         return {
            ...state,
            error: '',
            valid: false,
            loading: true
         };
      case LOGGING_OUT_SUCCESS:
         return {
            user: {},
            auth_token: '',
            error: '',
            valid: false,
            loading: false
         };
      case LOGGING_OUT_FAILURE:
         return {
            user: {},
            auth_token: '',
            error: action.error,
            valid: false,
            loading: false
         };
      case REGISTERING:
         return {
               user: {},
               auth_token: '',
               error: '',
               valid: false,
               loading: true
         };

      case REGISTERING_SUCCESS:
            return {
                  user: action.session.user,
                  auth_token: action.session.auth_token,
                  error: action.error,
                  valid: true,
                  loading: false
            };
      case REGISTERING_FAILURE:
            return {
                  user: {},
                  token: '',
                  error: action.error,
                  valid: false,
                  loading: false
            };
      default:
         return state;
   }
}
