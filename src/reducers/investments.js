import * as actionTypes from '../actions/actionTypes';

const initialState = {
  deposits: [],
  payments: [],
  profits: [],
  withdrawals: {
    isLoadingMore: false,
  },
  chart: {},
  loadingStatus: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.INVESTMENTS_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.INVESTMENTS_SET: {
      return Object.assign({}, state, {
        deposits: action.deposits,
        payments: action.payments,
        chart: action.chart,
      });
    }

    case actionTypes.INVESTMENTS_PROFITS_SET: {
      return Object.assign({}, state, {
        profits: action.profits,
      });
    }

    case actionTypes.INVESTMENTS_WITHDRAWALS_SET: {
      return Object.assign({}, state, {
        withdrawals: action.withdrawals,
      });
    }

    case actionTypes.INVESTMENTS_WITHDRAWALS_APPEND: {
      return {
        ...state,
        withdrawals: {
          ...state.withdrawals,
          items: [ ...state.withdrawals.items, ...action.items ],
          next: action.next
        }
      }
    }

    case actionTypes.INVESTMENTS_WITHDRAWALS_SET_LOADING_MORE_STATUS: {
      return {
        ...state,
        withdrawals: {
          ...state.withdrawals,
          isLoadingMore: action.payload
        }
      }
    }

    default:
      return state;
  }
}
