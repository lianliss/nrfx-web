import * as actionTypes from './actionTypes';

export function update() {
  return (dispatch) => dispatch({type: actionTypes.TEST});
}
