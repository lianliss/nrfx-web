import React from 'react';
import { useSelector } from 'react-redux';

// Components
import SVG from 'utils/svg-wrap';
import SectionBlock from '../SectionBlock/SectionBlock';
import { Button, Input, Modal, BottomSheetModal } from 'src/ui';

// Utils
import { openCabinetModal } from 'src/index/components/dapp/Modals/ConnectToWalletModal/hooks/openCabinetModal';

// Styles
import './SwapSettings.less';

const transactionSpeeds = [
  { id: 0, title: 'Standart', amount: 7 },
  { id: 2, title: 'Fast', amount: 3 },
  { id: 3, title: 'Istant', amount: 8 },
];

function SwapSettings({ setSlippage, slippageTolerance, setDeadline, deadline, ...props }) {
  const adaptive = useSelector((store) => store.default.adaptive);

  const [transactionSpeed, setTransactionSpeed] = React.useState(0);
  const [slippageValue, setSlippageValue] = React.useState(slippageTolerance);
  const [deadlineValue, setDeadlineValue] = React.useState(deadline);

  const Wrapper = adaptive ? BottomSheetModal : Modal;

  const handleSlippage = _value => {
    let value = Number(_value);
    if (value < 0.1) value = 0.1;
    if (value > 100) value = 100;
    setSlippageValue(_value);
    setSlippage(value);
  };

  const handleDeadline = _value => {
    let value = Number(_value);
    if (value < 1) value = 1;
    if (value > 60) value = 60;
    setDeadlineValue(_value);
    setDeadline(value);
  };

  openCabinetModal();

  return (
    <Wrapper
      className="SwapSettings__wrap"
      skipClose
      prefix="SwapSettings"
      {...props}
    >
      <div className="SwapSettings">
        <h2>
          <span>Settings</span>
          <span className="SwapSettings__close" onClick={props.onClose}>
            <SVG src={require('src/asset/24px/close-large.svg')} />
          </span>
        </h2>
        <SectionBlock
          title="Default Transaction Speed (GWEI)"
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
              <span>Slippage tolerance</span>
              <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
            </>
          }
          className="slippage"
        >
          <Button type="secondary-blue" onClick={() => handleSlippage(0.5)} size="medium">
            0.5%
          </Button>
          <Button type="secondary-blue" onClick={() => handleSlippage(1)} size="medium">
            1%
          </Button>
          <Button type="secondary-blue" onClick={() => handleSlippage(2)} size="medium">
            2%
          </Button>
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
            Transaction deadline
            <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
          </div>
          <div className="Input__container">
            <Input
              type="number"
              value={deadlineValue}
              onTextChange={(value) => handleDeadline(value)}
            />
            <div className="Input__icon">minutes</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SwapSettings;
