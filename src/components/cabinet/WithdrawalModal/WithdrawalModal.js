import './WithdrawalModal.less';

import React from 'react';
import UI from '../../../ui';

export default class WithdrawalModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDepositType: 'static'
    };
  }

  render() {
    return (
      <UI.Modal noSpacing isOpen={true} onClose={() => window.history.back()}>
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
          <div className="WithdrawalModal__row">
            <UI.Input
              placeholder="How much to withdraw?"
            />
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
        </div>
      </UI.Modal>
    )
  }

  toggle = (isOpen) => this.setState({ isOpen });
}
