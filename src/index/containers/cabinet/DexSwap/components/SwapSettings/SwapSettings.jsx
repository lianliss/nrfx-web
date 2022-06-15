import React from 'react';
import { useSelector } from 'react-redux';

// Components
import SVG from 'utils/svg-wrap';
import SectionBlock from '../SectionBlock/SectionBlock';
import { Button, Input, Modal, BottomSheetModal } from 'src/ui';

// Styles
import './SwapSettings.less';

const transactionSpeeds = [
  { id: 0, title: 'Standart', amount: 7 },
  { id: 2, title: 'Fast', amount: 3 },
  { id: 3, title: 'Istant', amount: 8 },
];

function SwapSettings(props) {
  const adaptive = useSelector((store) => store.default.adaptive);

  const [transactionSpeed, setTransactionSpeed] = React.useState(0);
  const [slippageValue, setSlippageValue] = React.useState(0.8);
  const [deadlineValue, setDeadlineValue] = React.useState(20);

  const Wrapper = adaptive ? BottomSheetModal : Modal;

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
          <Button type="secondary-blue" size="medium">
            0.1%
          </Button>
          <Button type="secondary-blue" size="medium">
            0.5%
          </Button>
          <Button type="secondary-blue" size="medium">
            1%
          </Button>
          <div className="Input__container">
            <Input
              type="number"
              value={slippageValue}
              onTextChange={(value) => setSlippageValue(value)}
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
              onTextChange={(value) => setDeadlineValue(value)}
            />
            <div className="Input__icon">minutes</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default SwapSettings;
