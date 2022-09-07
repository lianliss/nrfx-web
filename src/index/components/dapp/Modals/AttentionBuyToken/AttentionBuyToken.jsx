import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetModal from '../CabinetModal/CabinetModal';
import { Button } from 'src/ui';

// Utils
import { getLang, classNames as cn } from 'src/utils';

// Styles
import './AttentionBuyToken.less';

function AttentionBuyToken({ fromToken, toToken, text, type, ...props }) {
  return (
    <CabinetModal {...props} className="AttentionBuyToken" closeOfRef>
      <div className="AttentionBuyToken__container">
        <h3>{getLang('global_attention')}</h3>
        <p className={cn({ AttentionBuyToken__text: true, [type]: type })}>
          {getLang(text)}
        </p>
        <p>
          {getLang('global_buy')}&nbsp;
          {toToken.amount}&nbsp;
          {toToken.label}&nbsp;
          {getLang('dapp_global_for_fiat').toLowerCase()}&nbsp;
          {fromToken.amount}&nbsp;
          {fromToken.label}?
        </p>
        <Button type="lightBlue">{getLang('global_confirm')}</Button>
        <Button type="secondary-alice" shadow>
          {getLang('dapp_global_no_thanks')}
        </Button>
      </div>
    </CabinetModal>
  );
}

AttentionBuyToken.propTypes = {
  fromToken: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
    amount: PropTypes.number,
  }),
  toToken: PropTypes.shape({
    label: PropTypes.string,
    symbol: PropTypes.string,
    amount: PropTypes.number,
  }),
  text: PropTypes.string,
  type: PropTypes.oneOf('secondary-alice'),
};

AttentionBuyToken.defaultProps = {
  fromToken: {
    label: 'rubles',
    symbol: 'rub',
    amount: 0,
  },
  toToken: {
    label: 'BNB',
    symbol: 'bnb',
    amount: 0,
  },
  text: 'dapp_attention_buy_bnb_text',
  type: 'secondary-alice',
};

export default AttentionBuyToken;
