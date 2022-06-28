import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Web3Context } from 'services/web3Provider';

// Components
import * as UI from 'src/ui';

// Utils
import { steps } from '../../constants/steps';
import wei from 'utils/wei';

// Styles
import './WhiteListed.less';

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

function WhiteListed(props) {

  const context = React.useContext(Web3Context);
  const [isProcess, setIsProcess] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const {poolAddress, loadPoolData, isWhitelisted} = props;

  const onBuy = async () => {
    const {transaction, getTransactionReceipt, getContract} = context;
    if (isProcess) return;
    setIsProcess(true);
    try {
      const contract = getContract(
        require('src/index/constants/ABI/salePool'),
        poolAddress,
      );
      const txHash = await transaction(contract, 'buyNRFX', []);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[onBuy]', txHash, receipt);
      setErrorText('');
      await loadPoolData();
    } catch (error) {
      console.error('[onBuy]', error);
      setErrorText(processError(error));
    }
    setIsProcess(false);
  };

  return (
    <div className="PrivatePools__container">
      <div className="PrivatePools__WhiteListed">
        <div className="PrivatePools__table">
          <div className="row">
            <span>Pool whitelisted:</span>
            <span>{isWhitelisted ? 'Yes' : 'No'}</span>
          </div>
          <div className="row">
            <div className="col">
              <span>1 NRFX = 0.4 BUSD</span>
            </div>
          </div>
          {!!errorText.length && <div className="row error">
            {errorText}
          </div>}
        </div>
        <UI.Button type="lightBlue"
                   disabled={!isWhitelisted}
                   state={isProcess ? 'loading' : ''}
                   onClick={onBuy}>
          Buy NRFX
        </UI.Button>
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

WhiteListed.propTypes = {
  setStep: PropTypes.func,
};

WhiteListed.defaultProps = {
  setStep: () => {},
};

export default WhiteListed;
