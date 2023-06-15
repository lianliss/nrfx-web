import React from 'react';
import _ from 'lodash';

import { Row, Button } from 'ui';
import { AnswerPopup } from 'dapp';
import { BottomSheetSelect } from 'dapp/Select';
import { components } from 'react-select';
import { openModal, openStateModal } from 'src/actions';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import { setP2PCurrency, updateP2PAvailableForTrade } from 'src/actions/dapp/p2p';
import InputColumn from '../InputColumn/InputColumn';
import wei from 'utils/wei';

import { dappP2PCurrencySelector, dappP2PAvailableForTradeSelector } from 'src/selectors';
import { classNames as cn } from 'utils';

import styles from './Deposit.module.less';

const DepositRow = ({ children, adaptive }) => (
  <Row
    alignItems="center"
    justifyContent={adaptive ? 'flex-start' : 'flex-end'}
    className={styles.Deposit__row}
    gap={adaptive ? 12 : '5px 0'}
    wrap={adaptive}
  >
    {children}
  </Row>
);

const Deposit = ({ adaptive, offer, setLastUpdate }) => {
  const context = React.useContext(Web3Context);
  const {
    balance,
    offerAddress,
    limit,
    fiat,
    isBuy,
  } = offer;
  const {
    chainId,
    getFiatsArray,
    network,
    transaction,
    getBSCScanLink,
    getTransactionReceipt,
    getWeb3,
  } = context;
  const fiatsOptions = getFiatsArray()
    .map((fiat) =>
      BottomSheetSelect.option(fiat.symbol, fiat, fiat.logoURI)
  );
  const [_offerLimit, setOfferLimit] = React.useState(limit);
  const [isProcess, setIsProcess] = React.useState(false);
  const dispatch = useDispatch();
  const selectedFiat = useSelector(dappP2PCurrencySelector);
  const fiatAddress = _.get(selectedFiat, 'address', null);
  const availableForTrade = wei.from(useSelector(dappP2PAvailableForTradeSelector(fiatAddress)) || '0');
  const buttonSize = adaptive ? 'big' : 'extra_small';
  
  React.useEffect(() => {
    setOfferLimit(limit);
  }, [limit]);
  const isLimitChanged = _offerLimit !== limit;
  
  const selectCurrency = currency => dispatch(setP2PCurrency(currency));
  
  React.useEffect(() => {
    if (!selectedFiat || selectedFiat.chainId !== chainId) {
      selectCurrency(fiatsOptions[0].value);
    }
  }, [chainId]);
  
  React.useEffect(() => {
    if (fiatAddress) {
      dispatch(updateP2PAvailableForTrade(fiatAddress, context));
    }
  }, [fiatAddress]);

  const handleStake = () => {
    openStateModal('p2p_deposit', {fiat, offerAddress, balance, modal: 'stake', setLastUpdate});
  };
  const handleUnstake = () => {
    openStateModal('p2p_withdraw', {fiat, offerAddress, balance, setLastUpdate});
  };
  const handleUpdate = async () => {
    const {p2p} = network.contractAddresses;
    if (!p2p) return;
  
    try {
      setIsProcess(true);
      const contract = new (getWeb3().eth.Contract)(
        require('src/index/constants/ABI/p2p/sell'),
        offerAddress,
      );
      const tx = await transaction(contract, 'setLimit', [wei.to(_offerLimit, fiat.decimals)]);
      console.log('transaction hash', tx, getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('transaction receipt', receipt);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('[onSave]', error);
    }
    setIsProcess(false);
  };

  const stakeButton = (
    <Button
      size={buttonSize}
      type="lightBlue"
      onClick={handleStake}
      className={styles.Deposit__button}
    >
      Deposit
    </Button>
  );

  const unstakeButton = (
    <Button
      size={buttonSize}
      type="secondary-light--light-blue"
      className={styles.Deposit__button}
      onClick={handleUnstake}
      disabled={availableForTrade <= 0}
    >
      <span>Withdraw</span>
    </Button>
  );
  
  const updateButton = (
    <Button
      size={buttonSize}
      type="secondary-light--light-blue"
      className={styles.Deposit__button}
      onClick={handleUpdate}
      disabled={!isLimitChanged}
    >
      <span>Update</span>
    </Button>
  );

  return (
    <div className={styles.Deposit}>
      <DepositRow adaptive={adaptive}>
        <div className={styles.Deposit__title}>
          <span>Currency</span>
        </div>
        <div className={cn(styles.Deposit__amount, styles.Select__wrapper)}>
          {fiat.symbol}
        </div>
        {(!adaptive && isBuy) && stakeButton}
      </DepositRow>
      <DepositRow adaptive={adaptive}>
        <div className={styles.Deposit__title}>
          <Row alignItems="center">
            <span>{isBuy ? 'Trade balance' : 'Trade limit'}</span>
            <AnswerPopup>
              <p>
                N-Fiat amount available for this contract
              </p>
            </AnswerPopup>
          </Row>
        </div>
        <div className={styles.Deposit__amount}>
          {isBuy
            ? `${balance.toFixed(2)} ${_.get(fiat, 'symbol', '')}`
            : <InputColumn
              placeholder={limit}
              indicator={_.get(fiat, 'symbol', '')}
              value={_offerLimit}
              onChange={setOfferLimit}
            />}
        </div>
        {(!adaptive && isBuy) && unstakeButton}
        {(!adaptive && !isBuy) && updateButton}
      </DepositRow>
      {(adaptive) && (
        <div className={styles.Deposit__buttons}>
          {isBuy && stakeButton}
          {isBuy && unstakeButton}
          {!isBuy && updateButton}
        </div>
      )}
    </div>
  );
};

export default Deposit;
