export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

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