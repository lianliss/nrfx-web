import './GAConfirmModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';

export default class GAConfirmModal extends React.Component {

  state = {
    gaCode: '',
    errorGaCode: false
  };

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={384}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_ga_modal_name')}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <div className="GAConfirmModal__input_wrapper">
          <UI.Input
            autoFocus={true}
            type="number"
            autoComplete="off"
            value={this.state.gaCode}
            onChange={this.__handleChange}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={e => this.__onKeyPressHandler(e)}
            error={this.state.errorGaCode}
          />

          <img src={require('../../../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        <div className="GAConfirmModal__submit_wrapper">
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6}>
            {utils.getLang('cabinet_settingsSave')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __onKeyPressHandler = e => {
    if (e.key === 'Enter' && this.state.gaCode.length < 6) {
      this.__handleSubmit();
    } else if (isNaN(parseInt(e.key))) {
      e.preventDefault();
      return null;
    }
  };

  __handleChange = e => {
    const val = e.target.value;
    if (val.length < 6) {
      this.setState({gaCode: val});
    } else if (val.length === 6) {
      this.setState({gaCode: val}, () => {
        this.__handleSubmit();
      });
    }
  };

  __handleSubmit = () => {
    this.props.params.onChangeHandler(this.state, this);
  }
}

GAConfirmModal.defaultProps = {
  params: {
    onChangeHandler: () => {}
  }
};