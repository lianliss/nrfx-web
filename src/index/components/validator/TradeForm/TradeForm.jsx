import React from 'react';
import _ from 'lodash';
import router from 'src/router';
import { VALIDATOR_ADMIN_PANEL } from 'src/index/constants/pages';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';

// Components
import { Form } from 'ui';
import MoreInformation from './components/MoreInformation/MoreInformation';
import SecurityOptions from './components/SecurityOptions/SecurityOptions';
import TradeType from './components/TradeType/TradeType';

// Styles
import './TradeForm.less';

const processError = (error) => {
  const { message } = error;
  try {
    if (message.indexOf('Internal JSON-RPC error.') >= 0) {
      const internal = JSON.parse(message.split('Internal JSON-RPC error.')[1]);
      return internal.message;
    } else {
      return message;
    }
  } catch (err) {
    console.log('ERRR', err);
    return message;
  }
};

function TradeForm({offerAddress}) {
  const context = React.useContext(Web3Context);
  const {
    accountAddress,
    chainId,
    getFiatsArray,
    getWeb3,
    network,
    getBSCScanLink,
    getTransactionReceipt,
    transaction,
    backendRequest,
  } = context;
  const [offer, setOffer] = React.useState();
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());
  
  React.useEffect(() => {(async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    if (!offerAddress) return;
    
    try {
      const contract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/buy'),
        offerAddress,
      );
      const data = await Promise.all([
        contract.methods.getOffer().call(),
        contract.methods.getSchedule().call(),
        contract.methods.isKYCRequired().call(),
        contract.methods.maxTradeAmount().call(),
        contract.methods.getBankAccounts().call(),
        backendRequest({}, null, 'offers/validator', 'get'),
      ]);
      const fiat = getFiatsArray().find(f => f.address === data[0][1]);
      if (!fiat) return;
      setOffer({
        fiat,
        offerAddress,
        owner: data[0][2],
        isBuy: data[0][3],
        isActive: data[0][4],
        commission: wei.from(data[0][5], 4),
        totalCommission: wei.from(data[0][6], 4),
        minTrade: wei.from(data[0][7], 18),
        maxTrade: wei.from(data[3], 18),
        schedule: data[1],
        isKYCRequired: data[2],
        bankAccounts: data[4],
        cache: data[5].find(o => o.address === offerAddress),
      });
    } catch (error) {
      console.error('[TradeForm]', error);
    }
  })()}, [chainId, offerAddress, accountAddress, lastUpdate]);
  
  console.log('OFFER', offer);
  
  return (
    <Form className="ValidatorTradeForm">
      {!offerAddress ? <TradeType />
        : !!offer ? <>
      <MoreInformation offer={offer} setLastUpdate={setLastUpdate} />
      <SecurityOptions offer={offer} setLastUpdate={setLastUpdate} />
        </> : 'Loading'}
    </Form>
  );
}

export default TradeForm;
