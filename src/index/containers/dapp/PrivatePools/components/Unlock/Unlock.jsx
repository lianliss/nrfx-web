import React from 'react';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';

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
  const {
    nextUnlock,
    userNrfxBalance, userNrfxInSale, userShare,
    poolNrfxLocked, poolNrfxWithdrawn,
    loadPoolData, poolAddress,
    availableToWithdraw, isSaleEnded,
  } = props;
  const secondsToUnlock = Number(nextUnlock) || 0;
  let seconds = secondsToUnlock - time;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  const isUnlockable = seconds <= 0 && poolNrfxLocked > 0;
  if (!isUnlockable) {
    days = Math.floor(seconds / DAY);
    seconds = seconds % DAY;
    hours = Math.floor(seconds / HOUR);
    seconds = seconds % HOUR;
    minutes = Math.floor(seconds / MINUTE);
    seconds = seconds % MINUTE;
  } else {
    seconds = 0;
  }

  const nrfxAvailable = Math.floor(userNrfxBalance);

  setTimeout(() => {
    if (seconds <= 0) {
      loadPoolData().then(() => {
        setTime(Math.floor(Date.now() / 1000));
      });
    } else {
      setTime(Math.floor(Date.now() / 1000));
    }
    //setTime(Math.floor(Date.now() / 1000));
  }, 1000);

  const onWithdraw = async () => {
    const {transaction, getTransactionReceipt, getContract} = context;
    if (isWithdraw) return;
    setIsWithdraw(true);
    try {
      const contract = getContract(
        require('src/index/constants/ABI/salePool'),
        poolAddress,
      );
      console.log("WITHDRAW", availableToWithdraw, wei.to(availableToWithdraw));
      const txHash = await transaction(contract, 'withdrawNRFX', [wei.to(availableToWithdraw)]);
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
              <span>{isSaleEnded ? 'Lockup' : 'Sale end'}:</span>
              <span>
                {days ? `${days} days ` : ''}
                {hours}
                :{minutes < 10 ? `0${minutes}` : minutes}
                :{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>}
            <div className="row">
              <span>Locked NRFX:</span>
              <span>
                <UI.NumberFormat number={(poolNrfxLocked - poolNrfxWithdrawn) * userShare} currency="NRFX" />
              </span>
            </div>
            <div className="row">
              <span>Available to withrawal:</span>
              <span>
                <UI.NumberFormat number={availableToWithdraw} currency="NRFX" />
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
          <UI.Button
            disabled={!availableToWithdraw}
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
