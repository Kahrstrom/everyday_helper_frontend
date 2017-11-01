import { 
    FETCHING_SHOPPING_LISTS, 
    FETCHING_SHOPPING_LISTS_SUCCESS, 
    FETCHING_SHOPPING_LISTS_FAILURE, 
    SAVING_SHOPPING_LIST,
    SAVING_SHOPPING_LIST_FAILURE,
    SAVING_SHOPPING_LIST_SUCCESS,
    SELECT_SHOPPING_LIST,
    CREATING_SHOPPING_LIST,
    CANCEL_EDIT_SHOPPING_LIST,
    EDIT_SHOPPING_LIST,
    DELETING_SHOPPING_LIST,
    DELETING_SHOPPING_LIST_FAILURE,
    DELETING_SHOPPING_LIST_SUCCESS,
    CHECK_FILTER_DONE,
    CHECK_FILTER_MINE
} from '../actions/shopping_list';

const INITIAL_STATE = {
    shoppingLists: [],
    editing: false,
    activeShoppingList: {},
    loading: false,
    error: '',
    filterDone: false,
    filterMine: false
};

const EMPTY_SHOPPING_LIST = {
    done: false,
    name: '',
    value: 0,
    todos: [],
    shopping_list_items: [],
    user: null
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCHING_SHOPPING_LISTS:
            return {
                ...state,
                error: '',
                loading: true
            };
        case FETCHING_SHOPPING_LISTS_SUCCESS:
            return {
                ...state,
                shoppingLists: action.shoppingLists,
                editing: false,
                loading:false
            };
        case FETCHING_SHOPPING_LISTS_FAILURE:
            return {
                ...state,
                shoppingLists: [],
                error: action.error,
                loading:false
            };
        case SAVING_SHOPPING_LIST:
            return {
                ...state,
                error: '',
                loading: true
            };
        case SAVING_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                activeShoppingList: action.shoppingList.data,
                editing: false,
                error: '',
                loading:false
            };
        case SAVING_SHOPPING_LIST_FAILURE:
            return {
                ...state,
                error: action.error,
                loading:false
            };
        case DELETING_SHOPPING_LIST:
            return {
                ...state,
                error: '',
                loading: true
            };
        case DELETING_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                activeShoppingList: {},
                editing: false,
                error: '',
                loading:false
            };
        case DELETING_SHOPPING_LIST_FAILURE:
            return {
                ...state,
                error: action.error,
                loading:false
            };
        case SELECT_SHOPPING_LIST:
            return {
                ...state,
                activeShoppingList: action.shoppingList
            };
        case CREATING_SHOPPING_LIST:
            const activeShoppingList = EMPTY_SHOPPING_LIST;
            activeShoppingList.user = action.user;
            return {
                ...state,
                editing: true,
                activeShoppingList: activeShoppingList
            }
        case CANCEL_EDIT_SHOPPING_LIST:
            return {
                ...state,
                editing: false
            }
        case EDIT_SHOPPING_LIST:
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