import { 
    FETCHING_USERS, 
    FETCHING_USERS_SUCCESS, 
    FETCHING_USERS_FAILURE,
} from '../actions/user';

const INITIAL_STATE = {
    users: [],
    loading: false,
    error: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCHING_USERS:
            return {
                ...state,
                error: '',
                loading: true
            };
        case FETCHING_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                error: '',
                loading:false
            };
        case FETCHING_USERS_FAILURE:
            return {
                ...state,
                users: [],
                error: action.error,
                loading:false
            };
        default:
            return state
    }
}
