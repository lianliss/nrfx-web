import './ChangeEmailModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';

export default class ChangeEmailModal extends React.Component {
  state = {
    gaCode: ''
  };

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={424}>
        <UI.ModalHeader>
          Change Email
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <div className="ChangeEmailModal__input_wrapper">
          <UI.Input placeholder={'Enter New Email'} />
          <UI.Input
            autoFocus
            type="number"
            autoComplete="off"
            value={this.state.gaCode}
            onChange={this.__handleChange}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={(e) => (e.key === 'Enter' && this.state.gaCode.length < 6) ? this.__handleSubmit() : null}
          />

          <img src={require('../../../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        <div className="ChangeEmailModal__submit_wrapper">
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 6) {
      this.setState({gaCode: val});
    }
  };

  __handleSubmit = () => {

  }
}