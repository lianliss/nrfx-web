import * as toast from 'actions/toasts';
import _ from 'lodash';
import getFinePrice from 'utils/get-fine-price';

import {
  getLang,
} from 'utils';

const processBalances = (data, props) => {
  const {web3SetData, wallets} = props;
  const address = _.get(wallets, '[0].address');
  if (!address) {
    console.error('[processBalances]', 'No wallets');
  }

  console.log('[processBalances]', data, address, wallets);
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
  console.log('[processFiats]', data);
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

const processReferBonus = (data, props) => {
  const {walletUpdate, fiats} = props;
  console.log('[processReferBonus]', data);
  toast.success(`${getLang('message_referBonus')} ${getFinePrice(data.amount)} ${data.currency.toUpperCase()}`);
};

const streamMessage = (message, props = {}) => {
  try {
    const object = JSON.parse(message);
    const {type, data} = object;
    console.log('[streamMessage]', object);

    switch (type) {
      case 'referBonus':
        processReferBonus(data, props);
        break;
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
