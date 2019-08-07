import * as actionTypes from '../actions/actionTypes';

const initialState = {
  activeModal: null
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.MODALGROUP_SET_ACTIVE_MODAL: {
      return Object.assign({}, state, {
        activeModal: action.activeModal,
      });
    }
    default:
      return state;
  }
}
