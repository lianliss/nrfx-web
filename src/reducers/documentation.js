import * as actionTypes from "../actions/actionTypes";
import { diff } from "src/utils";
import apiSchema from "../services/apiSchema";

const initialState = {
  loadingStatus: {
    default: "loading"
  },
  menu: {},
  schema: {}
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.DOCUMENTATION_TOGGLE_MENU:
      function toggleSchema(schema, path) {
        const currentPath = path[0];
        const newSchema = {
          ...schema,
          opened: path.length ? schema.opened : !schema.opened
        };

        if (currentPath) {
          newSchema[currentPath] = toggleSchema(
            schema[currentPath],
            path.slice(1)
          );
        }

        return newSchema;
      }
      return {
        ...state,
        schema: toggleSchema(state.schema, action.path)
      };

    case actionTypes.DOCUMENTATION_INIT:
      return {
        ...state,
        loadingStatus: {
          ...state.loadingStatus,
          default: action.status
        },
        schema: action.schema
      };

    default:
      return state;
  }
}
