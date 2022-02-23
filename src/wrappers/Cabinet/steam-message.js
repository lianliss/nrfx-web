import * as toast from 'actions/toasts';
import _ from 'lodash';

import {
  getLang,
} from 'utils';

const processBalances = (data, props) => {
  const {web3SetData, wallets} = props;
  const address = _.get(wallets, '[0].address');
  if (!address) {
    console.error('[processBalances]', 'No wallets');
  }

  console.log('[processBalances]', data);
  web3SetData({
    balances: [{
      address,
      items: data,
    }]
  })
};

const processBonus = (data, props) => {
  const {web3SetData, wallets} = props;

  console.log('[processBonus]', data);
  web3SetData({
    wallets: wallets.map(wallet => ({
      ...wallet,
      bonus: data,
    })),
  })
};

const processFiats = (data, props) => {
  const {walletUpdate, fiats} = props;
  console.log('[processFiats]', data, walletUpdate);
  if (data.map) {
    data.map(balance => walletUpdate({
      balance,
    }))
  } else {
    walletUpdate({
      balance: data,
    });
  }
};

const streamMessage = (message, props = {}) => {
  try {
    const object = JSON.parse(message);
    const {type, data} = object;
    console.log('[streamMessage]', object);

    switch (type) {
      case 'fiats':
      case 'fiat':
        processFiats(data, props);
        break;
      case 'bonus':
        processBonus(data, props);
        break;
      case 'balance':
      case 'balances':
        processBalances(data, props);
        break;
      case 'error':
        toast.error(getLang(data));
        break;
      case 'success':
        toast.success(getLang(data));
        break;
      case 'message':
      case 'text':
      default:
        toast.warning(getLang(data));
    }
  } catch (error) {
    console.log('[streamMessage]', message);
    toast.warning(getLang(message));
  }
};

export default streamMessage;
