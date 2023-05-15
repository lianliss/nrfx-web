import React from 'react';
import _ from 'lodash';

import { Row, Button } from 'ui';
import { AnswerPopup } from 'dapp';
import { BottomSheetSelect } from 'dapp/Select';
import { components } from 'react-select';
import { openModal } from 'src/actions';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import { setP2PCurrency, updateP2PAvailableForTrade } from 'src/actions/dapp/p2p';
import wei from 'utils/wei';

import { dappP2PCurrencySelector, dappP2PAvailableForTradeSelector } from 'src/selectors';
import { classNames as cn } from 'utils';

import styles from './Staking.module.less';

const StakingRow = ({ children, adaptive }) => (
  <Row
    alignItems="center"
    justifyContent={adaptive ? 'flex-start' : 'flex-end'}
    className={styles.Staking__row}
    gap={adaptive ? 12 : '5px 0'}
    wrap={adaptive}
  >
    {children}
  </Row>
);

const Staking = ({ adaptive }) => {
  const context = React.useContext(Web3Context);
  const {
    chainId,
    getFiatsArray,
  } = context;
  const fiatsOptions = getFiatsArray()
    .map((fiat) =>
      BottomSheetSelect.option(fiat.symbol, fiat, fiat.logoURI)
  );
  const dispatch = useDispatch();
  const selectedFiat = useSelector(dappP2PCurrencySelector);
  const fiatAddress = _.get(selectedFiat, 'address', null);
  const availableForTrade = wei.from(useSelector(dappP2PAvailableForTradeSelector(fiatAddress)) || '0');
  const buttonSize = adaptive ? 'big' : 'extra_small';
  
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
    openModal('p2p_stake', {}, {fiat: selectedFiat, modal: 'stake'});
  };
  const handleUnstake = () => {
    openModal('p2p_unstake', {}, {fiat: selectedFiat});
  };

  const stakeButton = (
    <Button
      size={buttonSize}
      type="lightBlue"
      onClick={handleStake}
      className={styles.Staking__button}
    >
      Stake
    </Button>
  );

  const unstakeButton = (
    <Button
      size={buttonSize}
      type="secondary-light--light-blue"
      className={styles.Staking__button}
      onClick={handleUnstake}
      disabled={availableForTrade <= 0}
    >
      <span>Unstake</span>
    </Button>
  );

  return (
    <div className={styles.Staking}>
      <StakingRow adaptive={adaptive}>
        <div className={styles.Staking__title}>
          <span>Currency</span>
        </div>
        <div className={cn(styles.Staking__amount, styles.Select__wrapper)}>
          <BottomSheetSelect
            value={selectedFiat || fiatsOptions[0].value}
            onChange={selectCurrency}
            options={fiatsOptions}
            type="bold"
            showSelectedInMenu
            isModalForAdaptive
            components={{
              Control: ({ children, ...props }) => (
                <components.Control {...props}>
                  {children}
                </components.Control>
              ),
            }}
            classNames={{
              control: () => styles.Select__control,
              singleValue: () => styles.Select__singleValue,
              valueContainer: () => styles.Select__valueContainer,
              menu: () => styles.Select__menu,
              dropdownIndicator: () => styles.Select__dropdownIndicator,
            }}
            indicatorIcon={
              adaptive
                ? require('src/asset/icons/cabinet/swap/select-arrow.svg')
                : require('src/asset/icons/arrows/form-dropdown.svg')
            }
          />
        </div>
        {!adaptive && stakeButton}
      </StakingRow>
      <StakingRow adaptive={adaptive}>
        <div className={styles.Staking__title}>
          <Row alignItems="center">
            <span>Available for trade</span>
            <AnswerPopup>
              <p>
                N-Fiat amount available for trade = Staked amount * 0.80 (80%)
              </p>
            </AnswerPopup>
          </Row>
        </div>
        <div className={styles.Staking__amount}>{availableForTrade.toFixed(2)} {_.get(selectedFiat, 'symbol', '')}</div>
        {!adaptive && unstakeButton}
      </StakingRow>
      {adaptive && (
        <div className={styles.Staking__buttons}>
          {stakeButton}
          {unstakeButton}
        </div>
      )}
    </div>
  );
};

export default Staking;
