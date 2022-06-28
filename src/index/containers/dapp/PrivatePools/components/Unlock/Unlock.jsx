import React from 'react';
import { Web3Context } from 'services/web3Provider';

// Components
import * as UI from 'src/ui';

// Styles
import './Unlock.less';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const processError = error => {
  const {message} = error;
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

function Unlock(props) {
  const context = React.useContext(Web3Context);
  const [amount, setAmount] = React.useState('0');
  const [isUnlock, setIsUnlock] = React.useState(false);
  const [isWithdraw, setIsWithdraw] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [time, setTime] = React.useState(Math.floor(Date.now() / 1000));
  const {nextUnlock, userNrfxBalance, userNrfxInSale, loadPoolData, poolAddress} = props;
  const secondsToUnlock = Number(nextUnlock) || 0;
  let seconds = secondsToUnlock - time;
  let days = Math.floor(seconds / DAY);
  seconds = seconds % DAY;
  let hours = Math.floor(seconds / HOUR);
  seconds = seconds % HOUR;
  let minutes = Math.floor(seconds / MINUTE);
  seconds = seconds % MINUTE;

  const nrfxAvailable = userNrfxBalance - userNrfxInSale;

  setTimeout(() => {
    if (seconds <= 0) {
      loadPoolData().then(() => {
        setTime(Math.floor(Date.now() / 1000));
      });
    } else {
      setTime(Math.floor(Date.now() / 1000));
    }
  }, 1000);

  const onUnlock = async () => {
    const {transaction, getTransactionReceipt, getContract} = context;
    if (isUnlock) return;
    setIsUnlock(true);
    try {
      const contract = getContract(
        require('src/index/constants/ABI/salePool'),
        poolAddress,
      );
      const txHash = await transaction(contract, 'unlockNRFX', []);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[onUnlock]', txHash, receipt);
      setErrorText('');
      await loadPoolData();
    } catch (error) {
      console.error('[onUnlock]', error);
      setErrorText(processError(error));
      await loadPoolData();
    }
    setIsUnlock(false);
  };

  const onWithdraw = async () => {
    const {transaction, getTransactionReceipt, getContract} = context;
    if (isWithdraw) return;
    setIsWithdraw(true);
    try {
      const contract = getContract(
        require('src/index/constants/ABI/salePool'),
        poolAddress,
      );
      const txHash = await transaction(contract, 'withdrawNRFX', [wei.to(nrfxAvailable)]);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[onWithdraw]', txHash, receipt);
      setErrorText('');
      await loadPoolData();
    } catch (error) {
      console.error('[onWithdraw]', error);
      setErrorText(processError(error));
      await loadPoolData();
    }
    setIsWithdraw(false);
  };

  return (
    <div className="PrivatePools__container">
      <div className="PrivetaPools__Unlock">
        <div className="row">
          <div className="PrivatePools__table">
            {!!secondsToUnlock && <div className="row">
              <span>Lock-up:</span>
              <span>
                {days ? `${days} days ` : ''}
                {hours}
                :{minutes < 10 ? `0${minutes}` : minutes}
                :{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>}
            <div className="row">
              <span>Available to unlock:</span>
              <span>
                <UI.NumberFormat number={userNrfxInSale} currency="NRFX" />
              </span>
            </div>
            <div className="row">
              <span>Available to withrawal:</span>
              <span>
                <UI.NumberFormat number={nrfxAvailable} currency="NRFX" />
              </span>
            </div>
          </div>
        </div>
        {/*<div className="row">*/}
          {/*<label>*/}
            {/*<span>Amount NRFX</span>*/}
            {/*<UI.Input*/}
              {/*type="number"*/}
              {/*placeholder="Amount"*/}
              {/*value={amount}*/}
              {/*onTextChange={(value) => setAmount(value)}*/}
            {/*/>*/}
          {/*</label>*/}
        {/*</div>*/}
        {!!errorText.length && <div className="row error">
          {errorText}
        </div>}
        <div className="row">
          <UI.Button disabled={!userNrfxInSale}
                     state={isUnlock ? 'loading' : ''}
                     onClick={onUnlock}
                     type="lightBlue">
            Unlock
          </UI.Button>
          <UI.Button
            disabled={!nrfxAvailable}
            state={isWithdraw ? 'loading' : ''}
            onClick={onWithdraw}
            type="lightBlue">Withdrawal</UI.Button>
        </div>
        <div className="row"></div>
      </div>
      <div className="PrivatePools__footer">
        <div className="row">
          <span>Pool address</span>
          <UI.CopyText
            className="PrivatePools__address"
            text={poolAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default Unlock;
