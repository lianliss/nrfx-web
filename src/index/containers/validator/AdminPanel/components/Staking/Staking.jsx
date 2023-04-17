import React from 'react';

import { Row, Button } from 'ui';
import { AnswerPopup } from 'dapp';
import { BottomSheetSelect } from 'dapp/Select';
import { components } from 'react-select';
import KNOWN_FIATS from '../../../../../constants/knownFiats';

import styles from './Staking.module.less';

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
      <Row
        alignItems="center"
        justifyContent="flex-end"
        className={styles.Staking__row}
        gap="5px 0"
        wrap
      >
        <div className={styles.Staking__title}>
          <span>Staked</span>
        </div>
        <div className={styles.Staking__amount}>
          <BottomSheetSelect
            value={selectedFiat}
            onChange={setSelectedFiat}
            options={fiatsOptions}
            type="bold"
            showSelectedInMenu
            components={{
              Control: ({ children, ...props }) => (
                <components.Control {...props}>
                  200 {children}
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
            indicatorIcon={require('src/asset/icons/arrows/form-dropdown.svg')}
          />
        </div>
        {stakeButton}
      </Row>
      <Row
        alignItems="center"
        justifyContent="flex-end"
        className={styles.Staking__row}
        gap="5px 0"
        wrap
      >
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
        {unstakeButton}
      </Row>
    </div>
  );
};

export default Staking;
