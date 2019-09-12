import * as actionTypes from '../actions/actionTypes';

const initialState = [];

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.TOASTS_PUSH:
      return [...state, action.payload]
    case actionTypes.TOASTS_DROP:
      return state.filter(t => t.id !== action.id);
    case actionTypes.TOASTS_HIDE:
      return state.map(toast => toast.id != action.id ? toast : {
        ...toast,
        hidden: true,
      });
    default:
      return state;
  }
}
