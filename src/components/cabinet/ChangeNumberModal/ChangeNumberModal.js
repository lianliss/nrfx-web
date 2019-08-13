import './ChangeNumberModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import {isValidPhoneNumber} from 'react-phone-number-input';

export default class ChangeNumberModal extends React.Component {
  state = {
    gaCode: '',
    phone: ''
  };

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={424}>
        <UI.ModalHeader>
          Change Number
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <div className="ChangeEmailModal__input_wrapper">
          <ReactPhoneInput
            defaultCountry={'ru'}
            value={this.state.phone}
            onChange={this.__handleOnChangePhone}
            enableSearchField={true}
            disableSearchIcon={true}
            countryCodeEditable={false}
            searchPlaceholder={'Сountry search or code'}

            // searchClass={{}}
            // dropdownClass={{}}
            // buttonClass={{}}
            // inputClass={{}}
            // containerClass={{}}

            preferredCountries={['ru', 'id']}
          />
        </div>
        <div className="ChangeEmailModal__input_wrapper">
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
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6 || !isValidPhoneNumber(this.state.phone)}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleOnChangePhone = (value) => {
    this.setState({ phone: value })
  };

  __handleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 6) {
      this.setState({gaCode: val});
    }
  };

  __handleSubmit = () => {
    console.log(isValidPhoneNumber(this.state.phone));
  }
}