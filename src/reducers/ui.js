import { SHOW_TOAST, HIDE_TOAST } from '../actions/ui';

const INITIAL_STATE = {
      snackbar: {
            autohide: true,
            toasts: []
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
      default:
         return state;
   }
}