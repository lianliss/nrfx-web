import './ChangeNumberModal.less';

import React from 'react';
import UI from '../../../ui';

import ConfirmSmsModal from '../../../components/cabinet/ConfirmSmsModal/ConfirmSmsModal';

import * as utils from '../../../utils';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import {isValidPhoneNumber} from 'react-phone-number-input';
import * as settingsActions from '../../../actions/cabinet/settings';

export default class ChangeNumberModal extends React.Component {
  state = {
    gaCode: '',
    errorGaCode: false,
    phone: '',
    dialCode: '',
    phoneWithoutCode: ''
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
      <div className="ChangeNumberModal__input_padding">
        <div className="ChangeNumberModal__input_wrapper">
          <ReactPhoneInput
            defaultCountry={'ru'}
            value={this.state.phone}
            onChange={this.__handleOnChangePhone}
            enableSearchField={true}
            disableSearchIcon={true}
            countryCodeEditable={false}
            searchPlaceholder={'Сountry search or code'}

            searchClass={'ChangeNumberModal__PhoneInput_searchClass'}
            dropdownClass={'ChangeNumberModal__PhoneInput_dropdownClass'}
            buttonClass={'ChangeNumberModal__PhoneInput_buttonClass'}
            inputClass={'ChangeNumberModal__PhoneInput_inputClass'}
            //containerClass={'ChangeNumberModal__PhoneInput_containerClass'}

            preferredCountries={['ru', 'id']}
          />
        </div>
        <div className="ChangeNumberModal__input_wrapper">
          <UI.Input
            autoFocus
            type="number"
            autoComplete="off"
            value={this.state.gaCode}
            onChange={this.__handleChange}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={(e) => (e.key === 'Enter' && this.state.gaCode.length < 6) ? this.__handleSubmit() : null}
            error={this.state.errorGaCode}
          />

          <img src={require('../../../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        <div className="ChangeNumberModal__submit_wrapper">
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6 || !isValidPhoneNumber(this.state.phone)}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleOnChangePhone = (value, data) => {
    this.setState({
      phone: value,
      dialCode: data.dialCode,
      phoneWithoutCode: value.replace('+' + data.dialCode, '').replace(/[^\d;]/g, '')
    });
  };

  __handleChange = (e) => {
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
    if (isValidPhoneNumber(this.state.phone)) {
      settingsActions.sendSmsCode({
        phone_code: this.state.dialCode,
        phone_number: this.state.phoneWithoutCode,
        ga_code: this.state.gaCode
      }).then((data) => {
        this.props.openModalPage('confirmSms', {}, {
          children: ConfirmSmsModal,
          params: {
            dialCode: this.state.dialCode,
            phoneWithoutCode: this.state.phoneWithoutCode
          }
        });
      }).catch((info) => {
        switch (info.code) {
          case "ga_auth_code_incorrect":
            this.setState({
              errorGaCode: true
            }, () => {
              setTimeout(() => {
                this.setState({
                  errorGaCode: false
                });
              }, 1000)
            });
            break;
          default:
            alert(info.message);
            break;
        }
      });
    }
  }
}