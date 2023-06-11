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
    getTokenContract,
    backendRequest,
  } = context;
  const [offer, setOffer] = React.useState();
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());
  
  React.useEffect(() => {(async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p || !accountAddress) return;
    if (!offerAddress) return;
    
    try {
      let contract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/buy'),
        offerAddress,
      );
      const offer = await contract.methods.getOffer().call();
      const isBuy = offer[3];
      const isActive = offer[4];
      const owner = offer[2];
      const commission = wei.from(offer[5], 4);
      const totalCommission = wei.from(offer[6], 4);
      const fiat = getFiatsArray().find(f => f.address === offer[1]);
      if (!fiat) return;
      
      if (!isBuy) {
        contract = new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      }
      const fiatContract = getTokenContract(fiat);
      const data = await Promise.all([
        isBuy
          ? fiatContract.getBalance(offerAddress)
          : contract.methods.offerLimit().call(),
        contract.methods.getSchedule().call(),
        contract.methods.isKYCRequired().call(),
        contract.methods.maxTradeAmount().call(),
        isBuy
          ? contract.methods.getBankAccounts().call()
          : backendRequest({offerAddress}, null, 'offers/single/banks', 'get'),
        backendRequest({offerAddress}, null, 'offers/single', 'get'),
      ]);
      const minTrade = wei.from(offer[7], fiat.decimals);
      setOffer({
        fiat,
        offerAddress,
        owner,
        isBuy,
        isActive,
        commission,
        totalCommission,
        minTrade,
        balance: isBuy ? data[0] : 0,
        limit: isBuy ? 0 : wei.from(data[0], fiat.decimals),
        maxTrade: wei.from(data[3], fiat.decimals),
        schedule: data[1],
        isKYCRequired: data[2],
        bankAccounts: data[4].length ? data[4] : [],
        cache: data[5],
      });
    } catch (error) {
      console.error('[TradeForm]', error);
    }
  })()}, [chainId, offerAddress, accountAddress, lastUpdate]);
  
  console.log('OFFER', offer);
  if (!accountAddress) return <></>;
  
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
