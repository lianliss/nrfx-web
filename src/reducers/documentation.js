import * as actionTypes from '../actions/actionTypes';
import apiSchema from "../services/apiSchema";

const initialState = {
  loadingStatus: {
    default: 'loading'
  },
  menu: [
    {
      title: 'Api',
      opened: false,
      items: Object.keys(apiSchema).map((group) => {
        return {
          title: group,
          opened: false,
          items: !apiSchema[group].path ? Object.keys(apiSchema[group]).map(method => ({
            title: method,
          })) : undefined
        }
      })
    }
  ],
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.DOCUMENTATION_TOGGLE_MENU:
      console.log(action);
      debugger;
      function menu(items, path) {
        return items ? items.map(item => ({
          ...item,
          // TODO
          opened: (path.length === 1 && item.title === path[0] ? !item.opened : item.opened),
          items: menu(item.items, path.slice(1))
        })) : undefined;
      }

    case actionTypes.DOCUMENTATION_TOGGLE_MENU:

      return {
        ...state,
        menu: menu(state.menu, action.path)
      };

    default:
      return state;
  }
}
