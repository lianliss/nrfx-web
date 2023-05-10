import * as actionTypes from '../actionTypes';
import wei from 'utils/wei';

/**
 *  Sets p2p mode.
 * @param {'buy' | 'sell'} mode
 * @returns dispatch
 */
export const setP2PMode = (mode) => (dispatch) =>
  dispatch({ type: actionTypes.DAPP_SET_P2P_MODE, payload: mode });

/**
 *  Sets p2p currency.
 * @returns dispatch
 */
export const setP2PCurrency = (fiat) => (dispatch) => {
  return dispatch({
    type: actionTypes.DAPP_SET_P2P_CURRENCY,
    payload: fiat,
  });
};

/**
 *  Sets p2p payment.
 * @param {'buy' | 'sell'} mode
 * @param {object} payment
 * @returns dispatch
 */
export const setP2PPayment = (mode, payment) => (dispatch) => {
  return dispatch({
    type: actionTypes.DAPP_SET_P2P_PAYMENT,
    payload: { payment, mode },
  });
};

/**
 *  Sets p2p KYC data.
 * @returns dispatch
 */
export const updateP2PKYC = (context) => async (dispatch) => {
  try {
    const {
      accountAddress,
      chainId,
      network,
      getWeb3,
    } = context;
    const {p2p} = network.contractAddresses;
    if (!p2p) return dispatch({
      type: actionTypes.DAPP_UPDATE_P2P_KYC,
      payload: null,
    });
    
    const kycContract = new (getWeb3().eth.Contract)(
      require('src/index/constants/ABI/p2p/kyc'),
      p2p.kyc,
    );
    const data = await Promise.all([
      kycContract.methods.isKYCVerified(accountAddress).call(),
      kycContract.methods.getData([accountAddress]).call(),
      kycContract.methods.getCanTrade(accountAddress).call()
    ]);
    const payload = data[0]
      ? {
        accountAddress,
        name: data[1][0],
        isValidator: data[2],
      }
      : null;
    return dispatch({
      type: actionTypes.DAPP_UPDATE_P2P_KYC,
      payload,
    });
  } catch (error) {
    console.error('[updateP2PKYC]', error);
  }
};

/**
 *  Sets p2p KYC data.
 * @returns dispatch
 */
export const updateP2PAvailableForTrade = (fiatAddress, context) => async (dispatch) => {
  try {
    const {
      accountAddress,
      chainId,
      network,
      getWeb3,
    } = context;
    const {p2p} = network.contractAddresses;
    if (!p2p) return dispatch({
      type: actionTypes.DAPP_UPDATE_P2P_AVAILABLE_TRADE,
      payload: {
        fiatAddress,
        available: null,
      },
    });
    
    const poolContract = new (getWeb3().eth.Contract)(
      require('src/index/constants/ABI/p2p/exchangerPool'),
      p2p.pool,
    );
    const data = await poolContract.methods.validatorLimit(accountAddress, fiatAddress).call();
    const payload = {
      fiatAddress,
      available: wei.from(data),
    };
    return dispatch({
      type: actionTypes.DAPP_UPDATE_P2P_AVAILABLE_TRADE,
      payload,
    });
  } catch (error) {
    console.error('[updateP2PAvailableForTrade]', error);
  }
};
