import React from 'react';

import { Row, Button } from 'ui';
import { AnswerPopup } from 'dapp';
import { BottomSheetSelect } from 'dapp/Select';
import { components } from 'react-select';

import KNOWN_FIATS from '../../../../../constants/knownFiats';
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
  const fiatsOptions = KNOWN_FIATS.map((fiat) =>
    BottomSheetSelect.option(fiat.symbol, fiat.address, fiat.logoURI)
  );
  const [selectedFiat, setSelectedFiat] = React.useState(fiatsOptions[0].value);
  const buttonSize = adaptive ? 'big' : 'extra_small';

  const handleStake = () => {};
  const handleUnstake = () => {};

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
      disabled
    >
      <span>Unstake</span>
    </Button>
  );

  return (
    <div className={styles.Staking}>
      <StakingRow adaptive={adaptive}>
        <div className={styles.Staking__title}>
          <span>Staked</span>
        </div>
        <div className={cn(styles.Staking__amount, styles.Select__wrapper)}>
          <BottomSheetSelect
            value={selectedFiat}
            onChange={setSelectedFiat}
            options={fiatsOptions}
            type="bold"
            showSelectedInMenu
            isModalForAdaptive
            components={{
              Control: ({ children, ...props }) => (
                <components.Control {...props}>
                  {!adaptive && (
                    <span className={styles.Staking__amountNumber}>200</span>
                  )}
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
          {adaptive && (
            <span className={styles.Staking__amountNumber}>200</span>
          )}
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
        <div className={styles.Staking__amount}>100.00 NUSD</div>
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
