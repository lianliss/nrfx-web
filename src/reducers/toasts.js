import * as actionTypes from '../actions/actionTypes';

const initialState = {
  items: [],
  counter: 0
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.TOASTS_PUSH:
      return {
        ...state,
        items: [...state.items, action.payload],
        counter: state.counter + 1
      };
    case actionTypes.TOASTS_DROP:
      return {
        ...state,
        items: state.items.filter(t => t.id !== action.id),
      };
    case actionTypes.TOASTS_HIDE:
      return {
        ...state,
        items: state.items.map(toast => toast.id !== action.id ? toast : {
          ...toast,
          hidden: true,
        })
      };
    default:
      return state;
  }
}
