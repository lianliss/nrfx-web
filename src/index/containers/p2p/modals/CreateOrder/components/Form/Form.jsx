import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { p2pMode } from 'src/index/constants/dapp/types';

// Components
import { Row, Button, NumberFormat } from 'ui';
import { DappInput, CustomButton } from 'dapp';
import { TermsAndConditions, PaymentItems } from '..';

// Utils
import { openStateModal } from 'src/actions';
import router from 'src/router';
import { P2P_ORDER } from 'src/index/constants/pages';
import getFinePrice from 'utils/get-fine-price';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import wait from 'utils/wait';
import { toastPush } from 'src/actions/toasts';

const CurrencyIndicator = ({ currency }) => (
  <span className="moderate-fz medium-fw dark-black-color">{currency}</span>
);

const Label = ({ text }) => (
  <p className="cool-gray-color modal__label">{text}</p>
);

const SetPaymentButton = ({ adaptive, buttonSize, onClick }) => {
  return (
    <div className="modal-buttons-set-payment">
      {!adaptive && <Label text="Payment Method" />}
      <Button type="secondary-light" size={buttonSize} onClick={onClick}>
        <span className="light-blue-gradient-color">Set my payment method</span>
      </Button>
    </div>
  );
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

function Form({ mode, adaptive, selectedPayment, onCancel, banks, banksList, offer, initialAmount = 0, initialFiatAmount = 0 }) {
  const dispatch = useDispatch();
  const {
    address,
    commission,
    currency,
    isKYCRequired,
    maxTrade,
    minTrade,
    name,
    owner,
    schedule,
    settings,
    side,
    fiat,
    terms,
  } = offer;
  const context = React.useContext(Web3Context);
  const {
    isConnected,
    accountAddress,
    chainId,
    getFiatsArray,
    getWeb3,
    network,
    getBSCScanLink,
    getTransactionReceipt,
    transaction,
    backendRequest,
    getTokenContract,
    getDH,
  } = context;
  const buttonSize = adaptive ? 'big' : 'moderate';
  
  const [amount, setAmount] = React.useState(initialAmount);
  const [fiatAmount, setFiatAmount] = React.useState(initialFiatAmount);
  const [isApproving, setIsApproving] = React.useState(false);
  const [isProcess, setIsProcess] = React.useState(false);
  const [allowance, setAllowance] = React.useState(0);
  const [errorText, setErrorText] = React.useState();
  
  const onSetFiatAmount = value => {
    setFiatAmount(value);
    setAmount(value * (1 - commission));
  };
  
  const getAllowance = async () => {
    try {
      const contract = getTokenContract(fiat);
      setAllowance(await contract.getAllowance(offer.address));
    } catch (error) {
      console.error('[getAllowance]', error);
    }
  };
  
  const onSetAmount = value => {
    setAmount(value);
    setFiatAmount(value * (1 + commission));
  };
  
  const onApprove = async () => {
    if (isApproving) return;
    setIsApproving(true);
    const contract = getTokenContract(fiat);
    try {
      await contract.approve(offer.address, fiatAmount);
      await getAllowance();
      setErrorText('');
    } catch (error) {
      contract.stopWaiting();
      console.error('[onApprove]', error);
      setErrorText(processError(error));
    }
    setIsApproving(false);
  };
  const isApproved = allowance >= fiatAmount;

  const handleConfirm = async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
  
    setErrorText(null);
    setIsProcess(true);
    try {
      const isBuy = mode !== 'sell';
      const contract = isBuy
        ? new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/buy'),
          offer.address,
        )
        : new (getWeb3().eth.Contract)(
          require('src/index/constants/ABI/p2p/sell'),
          offer.address,
        );
      let params;
      if (isBuy) {
        params = [
          wei.to(fiatAmount, fiat.decimals),
          selectedPayment.index
        ];
      } else {
        const dh = await getDH();
        const otherKey = (await contract.methods.ownerPublicKey().call()).slice(0,10);
        dh.otherPublicKey  = getWeb3().utils.hexToNumber(otherKey).toFixed(0);
        dh.computeSharedKey();
        const encrypted = dh.encrypt(JSON.stringify(selectedPayment));
        params = [
          wei.to(fiatAmount, fiat.decimals),
          encrypted,
          getWeb3().utils.numberToHex(Number(dh.publicKey)),
        ];
      }
      const tx = await transaction(contract, 'createTrade', params);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      dispatch(toastPush(
        `Trade created`));
      await wait(2000);
      router.navigate(P2P_ORDER, {
        offerAddress: offer.address,
        clientAddress: accountAddress,
      });
      onCancel();
    } catch (error) {
      console.error('[handleConfirm]', error);
      setErrorText(processError(error));
    }
    setIsProcess(false);
  };

  return (
    <div className="p2p-modal-create-order-form">
      <div>
        <Label
          text={mode === p2pMode.buy ? 'I want to pay' : 'I want to sell'}
        />
        <DappInput
          placeholder="0.00"
          inputMode="decimal"
          type="number"
          value={fiatAmount}
          indicator={
            <Row alignItems="center" gap={8}>
              {mode === p2pMode.sell && <CustomButton>
                <span className="light-blue-gradient-color">ALL</span>
              </CustomButton>}
              <CurrencyIndicator currency={`Fiat ${fiat.symbol}`} />
            </Row>
          }
          className="moderate-fz medium-fw"
          onChange={onSetFiatAmount}
        />
        {(mode === p2pMode.sell && !adaptive) && (
          <p className="cool-gray-color moderate-fz normal-fw modal-balance">
            Balance: <NumberFormat number={0.0} currency={fiat.symbol} />
          </p>
        )}
      </div>
      <div>
        <Label text="I will receive" />
        <DappInput
          value={amount}
          placeholder={`${getFinePrice(minTrade)} - ${getFinePrice(maxTrade)}`}
          indicator={<CurrencyIndicator currency={fiat.symbol} />}
          className="moderate-fz medium-fw"
          inputMode="decimal"
          type="number"
          onChange={onSetAmount}
        />
      </div>
      <Row
        className="modal-buttons"
        gap={adaptive ? '15px 6px' : '30px 6px'}
        wrap
      >
        {!selectedPayment && (
          <SetPaymentButton
            onClick={() => openStateModal('p2p_set_payment_method', { mode, offer, banks, banksList, amount, fiatAmount })}
          />
        )}
        {!adaptive && (
          <Button type="secondary-light" size="moderate" onClick={onCancel}>
            <span className="light-blue-gradient-color">Cancel</span>
          </Button>
        )}
        {mode === p2pMode.buy ? (
          <Button type="lightBlue" state={isProcess ? "loading" : ''}
                  disabled={isProcess || !selectedPayment} size={buttonSize} onClick={handleConfirm}>
            Buy {fiat.symbol}
          </Button>
        ) : (isApproved ? <Button type="orange" state={isProcess ? "loading" : ''}
                                  disabled={isProcess || !selectedPayment} size={buttonSize} onClick={handleConfirm}>
          Sell {fiat.symbol}
        </Button> : <Button type="orange" state={isProcess ? "loading" : ''}
                            disabled={isApproving || !selectedPayment} size={buttonSize} onClick={onApprove}>
          Approve {fiat.symbol}
        </Button>)}
        {!!errorText && <span>{errorText}</span>}
      </Row>
      {adaptive && (
        <PaymentItems
          mode={mode}
          selected={selectedPayment}
          adaptive={adaptive}
          banks={banks}
        />
      )}
      {adaptive && <TermsAndConditions terms={terms} />}
    </div>
  );
}

export default Form;
