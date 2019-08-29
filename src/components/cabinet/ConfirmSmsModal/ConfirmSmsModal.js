import './ConfirmSmsModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';

export default class ConfirmSmsModal extends React.Component {
  state = {
    smsCode: ''
  };

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={424}>
        <UI.ModalHeader>
          Change Phone Number
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div className="ChangeNumberModal__input_padding">
        <div className="ChangeNumberModal__input_wrapper">
          <UI.Input
            autoFocus
            type="number"
            autoComplete="off"
            value={this.state.smsCode}
            onChange={this.__handleChange}
            placeholder={'Enter code from sms'}
            onKeyPress={(e) => (e.key === 'Enter' && this.state.smsCode.length < 6) ? this.__handleSubmit() : null}
          />
        </div>
        <div className="ChangeNumberModal__submit_wrapper">
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.smsCode.length < 6}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 6) {
      this.setState({smsCode: val});
    }
  };

  __handleSubmit = () => {

  }
}