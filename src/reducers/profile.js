import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loadingStatus: {},
  dashboard: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.PROFILE_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.PROFILE_DASHBOARD_SET: {
      return Object.assign({}, state, {
        dashboard: action.dashboard
      });
    }

    case actionTypes.PROFILE_SET: {
      return Object.assign({}, state, {}); //...
    }

    default:
      return state;
  }
}