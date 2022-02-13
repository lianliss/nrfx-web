import * as actionTypes from "../actionTypes";

export function web3SetInitState(payload) {
  return { type: actionTypes.WEB3_SET_INIT_STATE, payload };
}

export function web3SetStatus(section, status) {
  return {
    type: actionTypes.WEB3_SET_STATUS,
    section,
    status
  };
}

export function web3SetData(payload) {
  return { type: actionTypes.WEB3_SET_DATA, payload };
}

export function web3Update(payload) {
  return { type: actionTypes.WEB3_UPDATE, payload };
}

export function web3SetRate(token, rate) {
  return {
    type: actionTypes.WEB3_SET_RATE,
    payload: {
      token, rate,
    },
  };
}
