import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';
import SectionBlock from '../../../containers/dapp/DexSwap/components/SectionBlock/SectionBlock';
import { Button, Input } from 'src/ui';

// Utils
import { getLang } from 'utils';

// Styles
import './SwapSettings.less';

function SwapSettings({
  setSlippage,
  slippageTolerance,
  slippageNumbers,
  setDeadline,
  deadline,
  showTitle,
  onClose,
}) {
  const transactionSpeeds = [
    { id: 0, title: getLang('dapp_swap_settings_speed_standart'), amount: 7 },
    { id: 2, title: getLang('dapp_swap_settings_speed_fast'), amount: 3 },
    { id: 3, title: getLang('dapp_swap_settings_speed_istant'), amount: 8 },
  ];

  const [transactionSpeed, setTransactionSpeed] = React.useState(0);
  const [slippageValue, setSlippageValue] = React.useState(slippageTolerance);
  const [deadlineValue, setDeadlineValue] = React.useState(deadline);

  const handleSlippage = (_value) => {
    let value = Number(_value);
    if (value < 0.1) value = 0.1;
    if (value > 100) value = 100;
    setSlippageValue(_value);
    setSlippage(value);
    window.localStorage.setItem('nrfx-slippage', value);
  };

  const handleDeadline = (_value) => {
    let value = Number(_value);
    if (value < 1) value = 1;
    if (value > 60) value = 60;
    setDeadlineValue(_value);
    setDeadline(value);
  };

  return (
    <div className="SwapSettings">
      {showTitle && (
        <h2>
          <span>{getLang('dapp_swap_settings_title')}</span>
          <span className="SwapSettings__close" onClick={onClose}>
            <SVG src={require('src/asset/24px/close-large.svg')} />
          </span>
        </h2>
      )}
      <SectionBlock
        title={getLang('dapp_swap_settings_speed_title')}
        // title="Default Transaction Speed (GWEI)"
        className="transaction-speed"
      >
        {transactionSpeeds.map((item, index) => {
          return (
            <Button
              type="secondary-blue"
              size="medium"
              className={item.id === transactionSpeed ? 'active' : ''}
              onClick={() => setTransactionSpeed(item.id)}
              key={index}
            >
              {item.title} ({item.amount})
            </Button>
          );
        })}
      </SectionBlock>
      <SectionBlock
        title={
          <>
            <span>{getLang('dapp_swap_settings_slippage_title')}</span>
            <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
          </>
        }
        className="slippage"
      >
        {slippageNumbers.map((number, key) => (
          <Button
            type="secondary-blue"
            onClick={() => handleSlippage(number)}
            size="medium"
            key={key}
          >
            {number}%
          </Button>
        ))}
        <div className="Input__container">
          <Input
            type="number"
            value={slippageValue}
            onTextChange={(value) => handleSlippage(value)}
          />
          <div className="Input__icon">%</div>
        </div>
      </SectionBlock>
      <div className="deadline">
        <div className="deadline__title">
          {getLang('dapp_swap_settings_deadline_title')}
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </div>
        <div className="Input__container">
          <Input
            type="number"
            value={deadlineValue}
            onTextChange={(value) => handleDeadline(value)}
          />
          <div className="Input__icon">
            {getLang('dapp_global_minutes').toLowerCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

SwapSettings.propTypes = {
  setSlippage: PropTypes.func,
  slippageTolerance: PropTypes.number,
  slippageNumbers: PropTypes.arrayOf(PropTypes.number),
  setDeadline: PropTypes.func,
  deadline: PropTypes.number,
  showTitle: PropTypes.bool,
  onClose: PropTypes.func,
};

SwapSettings.defaultProps = {
  setSlippage: () => {},
  slippageTolerance: 0,
  slippageNumbers: [0.5],
  setDeadline: () => {},
  deadline: 0,
  showTitle: false,
  onClose: () => {},
};

export default SwapSettings;
