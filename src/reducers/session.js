import { 
      LOGGING_IN, 
      LOGGING_IN_SUCCESS, 
      LOGGING_IN_FAILURE, 
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

// export function registerFailure(state = '', action) {
//       switch(action.type) {
//             case REGISTERING_FAILURE:
//                   return {
//                         ...state,
//                         session: {
//                               user: {},
//                               token: '',
//                               error: action.error,
//                               valid: false,
//                               loading: false
//                         }
//                   };
//             default:
//                   return state;
//       }
      
// }

// export function registerSuccess(state = INITIAL_STATE, action) {

//       switch(action.type) {
//             case REGISTERING_SUCCESS:
//                   return {
//                         ...state,
//                         session: {
//                               user: action.session.user,
//                               auth_token: action.session.token,
//                               error: action.error,
//                               valid: false,
//                               loading: false
//                         }
//                   };
//             default:
//                   return state;
//       }
      
// }

export default function(state = INITIAL_STATE, action) {
      
   switch(action.type) {
      case LOGGING_IN:
         return {
            username: action.username,
            account: action.account,
            auth_token: '',
            error: '',
            valid: false,
            loading: true
         };
      case LOGGING_IN_SUCCESS:
         return {
            username: action.session.username,
            auth_token: action.session.token,
            account: action.session.account,
            error: '',
            valid: true,
            loading: false
         };
      case LOGGING_IN_FAILURE:
         return {
            username: '',
            auth_token: '',
            account: '',
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
                  test: action,
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
