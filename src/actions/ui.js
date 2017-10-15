export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const TOGGLE_TODO_EXPANDER = 'TOGGLE_TODO_EXPANDER';

export function showToast(toast) {
   return {
      type: SHOW_TOAST,
      toast
   }
}

export function hideToast() {
   return {
      type: HIDE_TOAST
   }
}

export function toggleTodoExpander(expander) {
   return {
      type: TOGGLE_TODO_EXPANDER,
      expander
   }
}