import React from 'react';

// Components
import { ContentBox, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { openModal } from 'src/actions';
import { REGISTRATION } from 'src/components/AuthModal/fixtures.js';
import { getLang } from 'src/utils';

// Styles
import './Instruction.less';

function Instruction() {
  const SVGContainer = ({ icon }) => {
    return (
      <div className={`${icon} Exchanger__Instruction__bg-icon`}>
        <SVG src={require(`../../asset/${icon}.svg`)} />
      </div>
    );
  };

  return (
    <ContentBox className="Exchanger__Instruction">
      <SVGContainer icon="wallets-bg" />
      <SVGContainer icon="usd-coin" />
      <SVGContainer icon="usd-coin" />
      <div className="Exchanger__Instruction__content">
        <div className="row">
          <div className="col">
            <div className="title">
              1. {getLang('dapp_exchanger_instruction_1_title')}
            </div>
            <div className="description">
              {getLang('dapp_exchanger_instruction_1_description')}
            </div>
          </div>
          <div className="col">
            <div className="title">
              2. {getLang('dapp_exchanger_instruction_2_title')}
            </div>
            <div className="description">
              {getLang('dapp_exchanger_instruction_2_description')}
            </div>
          </div>
          <div className="col">
            <a
              href="https://narfex.gitbook.io/wiki/Start/buy_crypto/exchanger"
              target="_blank"
            >
              <Button type="lightBlue">Learn more how it works</Button>
            </a>
          </div>
        </div>
      </div>
    </ContentBox>
  );
}

export default Instruction;
