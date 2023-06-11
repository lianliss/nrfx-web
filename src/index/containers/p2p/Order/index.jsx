import React from 'react';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { toastPush } from 'src/actions/toasts';
import wei from 'utils/wei';
import { routeParams } from 'src/selectors';

// Components
import P2P from '../P2P';
import Header from './components/Header';
import { FAQ, CabinetBlock } from 'dapp';
import { Chat, Feedback, Process, AppealHistory } from './components';
import LoadingStatus from "src/index/components/cabinet/LoadingStatus/LoadingStatus";

// Utils
import faq from '../constants/faq';
import { dappP2PModeSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';
import { getOrderProcess } from '../utils/order';
import { orderProcesses } from 'src/index/constants/dapp/types';
import { openStateModal } from 'src/actions';

// Styles
import './index.less';

const testOrder = {
  buy: {
    mode: p2pMode.buy,
    status: 'payment',
  },
  sell: { mode: p2pMode.sell, status: 'pending' },
};

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

let updateInterval;

function Order({ adaptive }) {
  const context = React.useContext(Web3Context);
  const dispatch = useDispatch();
  const {offerAddress, clientAddress} = useSelector(routeParams);
  
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
    getDH,
  } = context;
  
  const globalP2PMode = useSelector(dappP2PModeSelector);
  const [order, setOrder] = React.useState();
  const { mode } = 'buy';
  
  console.log('ORDER', order);
  
  const addressFormatted = !!accountAddress && getWeb3().utils.toChecksumAddress(accountAddress);
  const isClient = addressFormatted === _.get(order, 'clientAddress');
  const isOwner = addressFormatted === _.get(order, 'ownerAddress');
  const isLawyer = addressFormatted === _.get(order, 'lawyerAddress');
  
  const getOrder = async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
    
    try {
      const cache = await backendRequest({
        offer: offerAddress,
        client: clientAddress,
      }, ``, 'offers/trades', 'get');
      console.log('cache', cache);
      if (!cache.length) return;
      if (!!order) {
        setOrder({
          ...order,
          cache: cache[0],
        });
        return;
      }
      const isBuy = cache[0].side !== 'sell';
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offerAddress,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      const kycContract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/kyc'),
        p2p.kyc,
      );
      const promises = [
        contract.methods.getOffer().call(),
        contract.methods.getTrade(clientAddress).call(),
      ];
      if (isBuy) {
        promises.push(contract.methods.getBankAccounts().call());
      } else {
        promises.push(contract.methods.ownerPublicKey().call());
      }
      const data = await Promise.all(promises);
      const fiat = getFiatsArray().find(f => f.address === data[0][1]);
      
      const more = await Promise.all([
        backendRequest({
          currency: fiat.symbol,
        }, ``, 'offers/banks', 'get'),
        kycContract.methods.getData([data[0][2], clientAddress]).call()
      ]);
      let bank;
      if (isBuy) {
        bank = JSON.parse(data[2][data[1]['bankAccountId']]);
        bank.title = _.get(more[0].find(b => b.code === bank.code), 'title');
      } else {
        const ownerPublicKey = getWeb3().utils.hexToNumber(data[2].slice(0,10)).toFixed(0);
        const clientPublicKey = getWeb3().utils.hexToNumber(data[1].clientPublicKey.slice(0,10)).toFixed(0);
        const dh = await getDH();
        dh.otherPublicKey = dh.publicKey === ownerPublicKey ? clientPublicKey : ownerPublicKey;
        dh.computeSharedKey();
        const decrypted = dh.decrypt(data[1].bankAccount);
        try {
          bank = JSON.parse(decrypted);
          bank.title = _.get(more[0].find(b => b.code === bank.code), 'title');
        } catch (error) {
          console.error('[getOrder]', "Can't decrypt bank account", error, decrypted);
        }
      }
      setOrder({
        isBuy,
        cache: cache[0],
        bank,
        fiat,
        chatRoom: data[1]['chatRoom'],
        offerAddress,
        ownerAddress: data[0][2],
        ownerName: more[1][0],
        clientAddress: data[1]['client'],
        clientName: more[1][1],
        lawyerAddress: data[1]['lawyer'],
        date: data[1]['createDate'] * 1000,
        fiatAmount: wei.from(data[1]['fiatAmount'], fiat.decimals),
        moneyAmount: wei.from(data[1]['moneyAmount'], fiat.decimals),
        status: Number(data[1]['status']),
      });
    } catch (error) {
      console.error('[getOrder]', error);
    }
  };
  
  React.useEffect(() => {
    getOrder();
    clearInterval(updateInterval);
    setTimeout(() => {
      clearInterval(updateInterval);
      updateInterval = setInterval(getOrder, 4000);
    }, 4000);
  }, [chainId, accountAddress, offerAddress, clientAddress]);
  if (!order || !accountAddress) return <LoadingStatus inline status="loading" />;
  
  const {
    fiat,
    fiatAmount,
    moneyAmount,
  } = order;
  const symbol = _.get(fiat, 'symbol', '');

  const handleNotifySeller = () => {
    openStateModal('p2p_payment_confirmation', {
      mode,
      onConfirm: () => {
        // ...
        setOrder((prev) => ({ ...prev, status: 'pending' }));
      },
    });
  };

  const handlePaymentReceived = () => {
    console.log('handlePaymentReceived');
    openStateModal('p2p_payment_confirmation', {
      order,
      onConfirm: async () => {
        try {
          const contract = order.isBuy
            ? new (getWeb3().eth.Contract)(
              require('src/index/constants/ABI/p2p/buy'),
              offerAddress,
            )
            : new (getWeb3().eth.Contract)(
              require('src/index/constants/ABI/p2p/sell'),
              offerAddress,
            );
          const params = [
            order.clientAddress,
          ];
          const tx = await transaction(contract, 'confirmTrade', params);
          console.log('transaction hash', tx, getBSCScanLink(tx));
          const receipt = await getTransactionReceipt(tx);
          console.log('transaction receipt', receipt);
          dispatch(toastPush(
            `Trade confirmed`));
        } catch (error) {
          console.error('[handleCancel]', error);
        }
      },
    });
  };

  const handleCancel = async () => {
    try {
      const contract = order.isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offerAddress,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offerAddress,
        );
      const params = [
        order.clientAddress,
      ];
      const tx = await transaction(contract, 'cancelTrade', params);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      dispatch(toastPush(
        `Trade cancelled`));
    } catch (error) {
      console.error('[handleCancel]', error);
    }
  };

  return (
    <P2P>
      <div className="p2p-order">
        <Header
          adaptive={adaptive}
          order={order}
          from={symbol}
          to={symbol}
          fromAmount={moneyAmount}
          toAmount={fiatAmount}
        />
        <div className="p2p-order-body">
          <div className="p2p-order-body__left">
            <Process
              order={order}
              adaptive={adaptive}
              mode={mode}
              onNotifySeller={handleNotifySeller}
              onPaymentReceived={handlePaymentReceived}
              onCancel={handleCancel}
            />
            <AppealHistory />
            <Feedback adaptive={adaptive} />
            <CabinetBlock className="p2p-order-body__faq">
              <h3>FAQ</h3>
              <FAQ items={faq.order} doubleColumn={false} />
            </CabinetBlock>
          </div>
          {!adaptive && (
            <div className="p2p-order-body__right">
              <Chat order={order} />
            </div>
          )}
        </div>
      </div>
    </P2P>
  );
}

export default Order;
