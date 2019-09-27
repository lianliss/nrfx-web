import './CabinetRegisterScreen.less';
//
import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import moment from 'moment';
//
import UI from '../../../ui';
import {withRouter} from 'react-router5';
import {GetParamsContext} from '../../../contexts';
import apiSchema from '../../../services/apiSchema';
import * as api from '../../../services/api';
import * as storeUtils from '../../../storeUtils';
import * as utils from '../../../utils';
import * as CLASSES from '../../../constants/classes';
import * as pages from '../../../constants/pages';
import * as auth from '../../../services/auth';

class CabinetRegister extends React.PureComponent {
  state = {
    sendSmsTime: false,
    timer: null,
    codeForm: false,
  };

  componentDidMount() {
    this.props.setTitle(utils.getLang("cabinet_registerScreen_complete"));
    if (!this.context.params.hash) {
      this.props.router.navigate(pages.MAIN);
    }
  }

  __handleSubmit() {
    this.setState({ touched: true });
    const { params } = this.context;
    const { state } = this;

    if (state.password && state.password.length < 6) {
      this.props.toastPush(utils.getLang('global_passwordMustBe'), "error");
      return false;
    }

    if (
      state.password &&
      state.passwordConfirm &&
      state.password !== state.passwordConfirm
    ) {
      this.props.toastPush(utils.getLang('global_passwordsMustBeSame'), "error");
      return false;
    }

    if (
      state.firstName &&
      state.lastName &&
      state.login &&
      state.password &&
      state.phoneWithoutCode &&
      state.smsCode
    ) {
      api.call(apiSchema.Profile.FillAccountPut, {
        first_name: state.firstName,
        last_name: state.lastName,
        login: state.login,
        password: state.password,
        phone_code: state.dialCode,
        phone_number: state.phoneWithoutCode,
        sms_code: state.smsCode,
        hash: params.hash
      }).then(({ access_token }) => {
        this.props.toastPush(utils.getLang('cabinet_registerScreen_success'), "success");
        auth.login(access_token);
        this.props.router.navigate(pages.PROFILE);
      }).catch((err) => {
        this.props.toastPush(err.message, "error");
      })
    }
  }

  __handleSendSms() {
    const { params } = this.context;

    api.call(apiSchema.Profile.FillAccountSendSmsPut, {
      phone_code: this.state.dialCode,
      phone_number: this.state.phoneWithoutCode,
      hash: params.hash
    }).then(() => {
      this.setState({ codeForm: true });
      var duration = moment.duration(60 * 1000, 'milliseconds');
      const timer = () => {
        duration = moment.duration(duration - 1000, 'milliseconds');
        this.setState({ timer: moment(duration.asMilliseconds()).format('m:ss') });
        if (duration.seconds() <= 0) {
          this.setState({ timer: null });
          clearInterval(interval);
        }
      }
      timer();
      const interval = setInterval(timer, 1000);

    }).catch((err) => {
      this.props.toastPush(err.message, "error");
    })
  }

  __handleChange(name, value) {
    this.setState({[name]: value});
  }

  __handleChangePhone = (value, data) => {
    this.setState({
      phone: value,
      dialCode: data.dialCode,
      phoneWithoutCode: value.replace('+' + data.dialCode, '').replace(/[^\d;]/g, '')
    });
  };

  static contextType = GetParamsContext;

  render() {
    if (!this.context.params.hash) {
      return false;
    }
    const { state } = this;
    return (
      <div className="CabinetRegister">
        <div className="CabinetRegister__content Content_box">
          <h3 className="CabinetRegister__content__title">{utils.getLang('cabinet_registerScreen_complete')}</h3>
          <UI.Input
            error={state.touched && !state.firstName}
            value={state.firstName}
            placeholder={utils.getLang('cabinet_registerScreen_firstName')}
            onTextChange={text => this.__handleChange("firstName", text)}
          />
          <UI.Input
            error={state.touched && !state.lastName}
            value={state.lastName}
            placeholder={utils.getLang('cabinet_registerScreen_lastName')}
            onTextChange={text => this.__handleChange("lastName", text)}
          />
          <UI.Input
            error={state.touched && !state.login}
            value={state.login}
            placeholder={utils.getLang('site__contactLogin')}
            onTextChange={text => this.__handleChange("login", text)}
          />
          <h3 className="CabinetRegister__content__title">{utils.getLang('cabinet_registerScreen_phoneNumber')}</h3>
          { !state.codeForm ? <div>
            <div className="CabinetRegister__PhoneInput">
              <ReactPhoneInput
                defaultCountry={'ru'}
                value={this.state.phone}
                onChange={this.__handleChangePhone}
                enableSearchField={true}
                disableSearchIcon={true}
                countryCodeEditable={false}
                searchPlaceholder={utils.getLang('cabinet_registerScreen_countryOrCode')}
                autoFocus={true}
                searchClass={'CabinetRegister__PhoneInput_searchClass'}
                dropdownClass={'CabinetRegister__PhoneInput_dropdownClass'}
                buttonClass={'CabinetRegister__PhoneInput_buttonClass'}
                inputClass={'CabinetRegister__PhoneInput_inputClass'}
                preferredCountries={['ru', 'id']}
              />
            </div>
            <div className="CabinetRegister__content__send_code_button">
              <UI.Button
                disabled={state.timer || !this.state.phoneWithoutCode}
                onClick={this.__handleSendSms.bind(this)}>
                {utils.getLang('cabinet_registerScreen_sendCode')}
              </UI.Button>
              { state.timer && <div className="CabinetRegister__content__timer">{utils.getLang('cabinet_registerScreen_reSendCode') + ' ' + state.timer}</div> }
            </div>
          </div> : <div>
            <UI.Input
              error={state.touched && !state.smsCode}
              value={state.smsCode}
              placeholder={utils.getLang('cabinet_registerScreen_enterCode')}
              onTextChange={text => this.__handleChange("smsCode", text)}
            />
            <div className="CabinetRegister__content__send_code_button">
              <UI.Button type="secondary" onClick={() => this.setState({codeForm: false})}>
                {utils.getLang('cabinet_registerScreen_back')}
              </UI.Button>
              { state.timer ?
                <div className="CabinetRegister__content__timer">{utils.getLang('cabinet_registerScreen_reSendCode') + ' ' + state.timer}</div> :
                <div onClick={this.__handleSendSms.bind(this)} className="CabinetRegister__content__resend_code_button">
                  {utils.getLang('cabinet_registerScreen_reSendCode')}
                </div> }
            </div>
          </div> }


          <h3 className="CabinetRegister__content__title">
            {utils.getLang('cabinet_registerScreen_createPassword')}
          </h3>
          <UI.Input
            error={state.touched && !state.password}
            value={state.password}
            type="password"
            placeholder={utils.getLang('cabinet_registerScreen_password')}
            onTextChange={text => this.__handleChange("password", text)}
          />

          <UI.Input
            error={state.touched && (!state.passwordConfirm || state.passwordConfirm !== state.password)}
            value={state.passwordConfirm}
            type="password"
            placeholder={utils.getLang('cabinet_registerScreen_reEnterPassword')}
            onTextChange={text => this.__handleChange("passwordConfirm", text)}
          />

          <div className="CabinetRegister__content__submit_wrapper">
            <UI.Button onClick={this.__handleSubmit.bind(this)}>
              {utils.getLang('site__commerceRegistration')}
            </UI.Button>
          </div>
        </div>
      </div>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_REGISTER,
  withRouter(CabinetRegister)
);