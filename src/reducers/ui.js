import { SHOW_TOAST, HIDE_TOAST, TOGGLE_TODO_EXPANDER } from '../actions/ui';

const INITIAL_STATE = {
      snackbar: {
            autohide: true,
            toasts: []
      },
      todo: {
            futureExpanded: false,
            todayExpanded: true,
            lateExpanded: false
      }
}

export default function(state = INITIAL_STATE, action) {
   switch(action.type) {
      case SHOW_TOAST:
         return {
            ...state,
            snackbar: {
                  autohide: true,
                  toasts: [{
                        text: action.toast.text,
                        action: action.toast.action,
                  }]
            }
         };
      case HIDE_TOAST:
         
         return {
            ...state,
            snackbar: {
                  autohide: true,
                  toasts: []
            }
         }
      case TOGGLE_TODO_EXPANDER:
         const newState = Object.assign({}, state);
         newState.todo[action.expander] = !newState.todo[action.expander];
         return newState;

      default:
         return state;
   }
}