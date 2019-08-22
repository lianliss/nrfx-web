import './WithdrawalModal.less';

import React from 'react';
import UI from '../../../ui';

import * as actions from '../../../actions';

class WithdrawalModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDepositType: 'static'
    };
  }

  render() {
    if (!this.props.hasOwnProperty('currency')) {
      return '';
    }
    const currency = this.props.currency.toUpperCase();
    const currencyInfo = actions.getCurrencyInfo(currency);
    return (
      <UI.Modal noSpacing isOpen={true} onClose={() => (this.props.close())}>
        <UI.ModalHeader>
          Withdraw Income
        </UI.ModalHeader>
        <div className="WithdrawalModal">
          <div className="WithdrawalModal__info_row">
            <div className="WithdrawalModal__info_row__title">Be aware!</div>
            <div className="WithdrawalModal__info_row__caption">Your each withdrawal request will reduce the percentage of your investments. Yet it will not affect your old investments.</div>
          </div>
          <div className="WithdrawalModal__info_row">
            <div className="WithdrawalModal__info_row__title">Attention!</div>
            <div className="WithdrawalModal__info_row__caption">You can’t withdraw more than 10BTC (or any other cryptocurrency equivalent to 10BTC) in a day.</div>
          </div>
          <div className="WithdrawalModal__row WithdrawalModal__row_amount">
            <div className="WithdrawalModal__row_amount__input">
              <UI.Input
                placeholder="Amount"
                indicator={currency}
              />
              <p className="Form__helper__text">Available: 120 {currency}</p>
            </div>
            <UI.Button type="outline" smallPadding>Max</UI.Button>
          </div>
          <div className="WithdrawalModal__row">
            <UI.Input
              placeholder="Google Authenticator Code"
              indicator={<div className="OpenDepositModal__ga_icon" /> }
            />
          </div>
          <div className="WithdrawalModal__button_wrap">
            <UI.Button style={{ width: '208px' }}>Withdraw</UI.Button>
          </div>
          <div className="WithdrawalModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
        </div>
      </UI.Modal>
    )
  }
}


export default WithdrawalModal;