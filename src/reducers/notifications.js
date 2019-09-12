import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notifications: [],
  unreadCount: 0
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_SET:
      return {
        ...state,
        notifications: action.notifications,
        unreadCount: action.notifications.filter(n => n.unread).length
      }
    default:
      return state;
  }
}
