import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notifications: [],
  unreadCount: 0,
  pending: true,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_SET:
      return {
        ...state,
        notifications: action.notifications,
        unreadCount: action.notifications.filter(n => n.unread).length,
        pending: false
      };

    case actionTypes.NOTIFICATIONS_DELETE: {
      let notifications = Object.assign([], state.notifications);
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].id === action.id) {
          notifications[i].deleted = true;
          break;
        }
      }

      return Object.assign({}, state, { notifications });
    };

    case actionTypes.NOTIFICATIONS_RESTORE: {
      let notifications = Object.assign([], state.notifications);
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].id === action.id) {
          delete notifications[i].deleted;
          break;
        }
      }

      return Object.assign({}, state, { notifications });
    }

    default:
      return state;
  }
}
