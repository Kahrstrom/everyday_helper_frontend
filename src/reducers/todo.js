import { 
    FETCHING_TODOS, 
    FETCHING_TODOS_SUCCESS, 
    FETCHING_TODOS_FAILURE, 
    SAVING_TODO,
    SAVING_TODO_FAILURE,
    SAVING_TODO_SUCCESS,
    SELECT_TODO,
    CREATING_TODO,
    CANCEL_EDIT_TODO,
    EDIT_TODO,
    DELETING_TODO,
    DELETING_TODO_FAILURE,
    DELETING_TODO_SUCCESS,
    CHECK_FILTER_DONE,
    CHECK_FILTER_MINE
} from '../actions/todo';

const INITIAL_STATE = {
    todos: [],
    editing: false,
    activeTodo: {},
    loading: false,
    error: '',
    filterDone: false,
    filterMine: false
};

const EMPTY_TODO = {
    done: false,
    date: null,
    title: '',
    description: '',
    shopping_list: null,
    user: null
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCHING_TODOS:
            return {
                ...state,
                error: '',
                loading: true
            };
        case FETCHING_TODOS_SUCCESS:
            return {
                ...state,
                todos: action.todos,
                // error: '',
                // activeTodo: {},
                editing: false,
                loading:false
            };
        case FETCHING_TODOS_FAILURE:
            return {
                ...state,
                todos: [],
                // activeTodo: {},
                // editing: false,
                error: action.error,
                loading:false
            };
        case SAVING_TODO:
            return {
                ...state,
                error: '',
                loading: true
            };
        case SAVING_TODO_SUCCESS:
            return {
                ...state,
                activeTodo: action.todo.data,
                editing: false,
                error: '',
                loading:false
            };
        case SAVING_TODO_FAILURE:
            return {
                ...state,
                error: action.error,
                loading:false
            };
        case DELETING_TODO:
            return {
                ...state,
                error: '',
                loading: true
            };
        case DELETING_TODO_SUCCESS:
            return {
                ...state,
                activeTodo: {},
                editing: false,
                error: '',
                loading:false
            };
        case DELETING_TODO_FAILURE:
            return {
                ...state,
                error: action.error,
                loading:false
            };
        case SELECT_TODO:
            return {
                ...state,
                activeTodo: action.todo
            };
        case CREATING_TODO:
            const activeTodo = EMPTY_TODO;
            activeTodo.user = action.user;
            return {
                ...state,
                editing: true,
                activeTodo: activeTodo
            }
        case CANCEL_EDIT_TODO:
            return {
                ...state,
                editing: false
            }
        case EDIT_TODO:
            return {
                ...state,
                editing: true
            }
        case CHECK_FILTER_DONE:
            return {
                ...state,
                filterDone: action.checked
            }
        case CHECK_FILTER_MINE:
            return {
                ...state,
                filterMine: action.checked
            }
        default:
            return state;
    }
}