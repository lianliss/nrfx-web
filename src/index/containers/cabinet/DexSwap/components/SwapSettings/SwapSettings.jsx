import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import SectionBlock from '../SectionBlock/SectionBlock';
import { Button } from 'src/ui';

// Styles
import './SwapSettings.less';

const transactionSpeeds = [
  { id: 0, title: 'Standart', amount: 7 },
  { id: 2, title: 'Fast', amount: 3 },
  { id: 3, title: 'Istant', amount: 8 },
];

function SwapSettings({ onClose, isAdaptive }) {
  const [transactionSpeed, setTransactionSpeed] = React.useState(0);

  return (
    <div className="SwapSettings__wrap">
      <div className="SwapSettings">
        <h2>
          <span>Settings</span>
          <span className="SwapSettings__close" onClick={onClose}>
            <SVG
              src={
                isAdaptive
                  ? require('src/asset/24px/angle-left.svg')
                  : require('src/asset/24px/close-large.svg')
              }
            />
          </span>
        </h2>
        <SectionBlock
          title="Default Transaction Speed (GWEI)"
          className="transaction-speed"
        >
          {transactionSpeeds.map((item) => {
            return (
              <Button
                type="secondary-blue"
                size="medium"
                className={item.id === transactionSpeed ? 'active' : ''}
                onClick={() => setTransactionSpeed(item.id)}
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
        </SectionBlock>
      </div>
    </div>
  );
}

export default SwapSettings;
