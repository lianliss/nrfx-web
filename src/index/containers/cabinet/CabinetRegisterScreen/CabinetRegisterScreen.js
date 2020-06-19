import "./CabinetRegisterScreen.less";
//
import React from "react";
import { connect } from "react-redux";

// import ReactPhoneInput from 'react-phone-input-2';
// import moment from 'moment';

import * as UI from "../../../../ui";
import { withRouter } from "react-router5";
import { GetParamsContext } from "../../../contexts";
import apiSchema from "../../../../services/apiSchema";
import * as api from "../../../../services/api";
import * as utils from "../../../../utils";
import * as pages from "../../../constants/pages";
// import SVG from 'react-inlinesvg';
import * as toastsActions from "../../../../actions/toasts";
import * as actions from "../../../../actions";
import { Helmet } from "react-helmet";
import COMPANY from "../../../constants/company";

class CabinetRegister extends React.PureComponent {
  state = {
    sendSmsTime: false,
    sendSmsStatus: null,
    timer: null,
    codeForm: false,
    pending: false,
    touched: false
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
      this.props.toastPush(utils.getLang("global_passwordMustBe"), "error");
      return false;
    }

    if (
      state.password &&
      state.passwordConfirm &&
      state.password !== state.passwordConfirm
    ) {
      this.props.toastPush(
        utils.getLang("global_passwordsMustBeSame"),
        "error"
      );
      return false;
    }

    if (
      state.firstName &&
      state.lastName &&
      state.login &&
      state.password
      // state.phoneWithoutCode &&
      // state.smsCode
    ) {
      this.setState({ pending: true });
      api
        .call(apiSchema.Profile.FillAccountPut, {
          first_name: state.firstName,
          last_name: state.lastName,
          login: state.login,
          password: state.password,
          // phone_code: state.dialCode,
          // phone_number: state.phoneWithoutCode,
          // sms_code: state.smsCode,
          hash: params.hash
        })
        .then(({ access_token }) => {
          this.props.toastPush(
            utils.getLang("cabinet_registerScreen_success"),
            "success"
          );
          window.location.href = "/" + pages.DASHBOARD;
        })
        .catch(err => {
          this.props.toastPush(err.message, "error");
        })
        .finally(() => {
          this.setState({ pending: false });
        });
    }
  }

  // __handleSendSms() {
  //   const { params } = this.context;
  //   this.setState({ sendSmsStatus: 'loading' });
  //   api.call(apiSchema.Profile.FillAccountSendSmsPut, {
  //     phone_code: this.state.dialCode,
  //     phone_number: this.state.phoneWithoutCode,
  //     hash: params.hash
  //   }).then(() => {
  //     this.setState({ codeForm: true, smsCode: '' });
  //     var duration = moment.duration(60 * 1000, 'milliseconds');
  //     const timer = () => {
  //       duration = moment.duration(duration - 1000, 'milliseconds');
  //       this.setState({ timer: utils.dateFormat(duration.asMilliseconds(), 'm:ss')});
  //       if (duration.seconds() <= 0) {
  //         this.setState({ timer: null });
  //         clearInterval(interval);
  //       }
  //     }
  //     timer();
  //     const interval = setInterval(timer, 1000);
  //
  //   }).catch((err) => {
  //     this.props.toastPush(err.message, "error");
  //   }).finally(() => {
  //     this.setState({ sendSmsStatus: null });
  //   })
  // }

  __handleChange(name, value) {
    this.setState({ [name]: value });
  }

  // __handleChangePhone = (value, data) => {
  //   this.setState({
  //     phone: value,
  //     dialCode: data.dialCode,
  //     phoneWithoutCode: value.replace('+' + data.dialCode, '').replace(/[^\d;]/g, '')
  //   });
  // };

  static contextType = GetParamsContext;

  render() {
    if (!this.context.params.hash) {
      return false;
    }
    const { state } = this;

    const validFirstName =
      state.firstName && /^[a-zA-Z -]+$/i.test(state.firstName);
    const validLastName =
      state.lastName && /^[a-zA-Z -]+$/i.test(state.lastName);

    return (
      <div className="CabinetRegister">
        <Helmet>
          <title>
            {[
              COMPANY.name,
              utils.getLang("cabinet_registerScreen_complete")
            ].join(" - ")}
          </title>
        </Helmet>
        <UI.ContentBox className="CabinetRegister__content">
          <h3 className="CabinetRegister__content__title">
            {utils.getLang("cabinet_registerScreen_complete")}
          </h3>
          <UI.Input
            error={state.touched && !validFirstName}
            value={state.firstName}
            placeholder={utils.getLang("cabinet_registerScreen_firstName")}
            onTextChange={text => this.__handleChange("firstName", text)}
          />
          <UI.Input
            error={state.touched && !validLastName}
            value={state.lastName}
            placeholder={utils.getLang("cabinet_registerScreen_lastName")}
            onTextChange={text => this.__handleChange("lastName", text)}
          />
          <p
            className={utils.classNames("CabinetRegister__description", {
              error:
                state.touched &&
                (!(state.firstName && validFirstName) ||
                  !(state.lastName && validLastName))
            })}
          >
            {utils.getLang("registration_nameDescription")}
          </p>
          <UI.Input
            error={
              state.touched && !(state.login && utils.isLogin(state.login))
            }
            value={state.login}
            placeholder={utils.getLang("site__contactLogin")}
            onTextChange={text => this.__handleChange("login", text)}
          />

          {/*<h3 className="CabinetRegister__content__title">{utils.getLang('cabinet_registerScreen_phoneNumber')}</h3>*/}
          {/*{ !state.codeForm ? <div>*/}
          {/*  <div className={utils.classNames('CabinetRegister__PhoneInput', {error: state.touched && !state.email})}>*/}
          {/*    <ReactPhoneInput*/}
          {/*      defaultCountry={'ru'}*/}
          {/*      value={this.state.phone}*/}
          {/*      onChange={this.__handleChangePhone}*/}
          {/*      enableSearchField={true}*/}
          {/*      disableSearchIcon={true}*/}
          {/*      countryCodeEditable={false}*/}
          {/*      searchPlaceholder={utils.getLang('cabinet_registerScreen_countryOrCode')}*/}
          {/*      autoFocus={true}*/}
          {/*      searchClass={'CabinetRegister__PhoneInput_searchClass'}*/}
          {/*      dropdownClass={'CabinetRegister__PhoneInput_dropdownClass'}*/}
          {/*      buttonClass={'CabinetRegister__PhoneInput_buttonClass'}*/}
          {/*      inputClass={'CabinetRegister__PhoneInput_inputClass'}*/}
          {/*      preferredCountries={['ru', 'id']}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div className="CabinetRegister__content__send_code_button">*/}
          {/*    <UI.Button*/}
          {/*      state={state.sendSmsStatus}*/}
          {/*      disabled={state.timer || !this.state.phoneWithoutCode}*/}
          {/*      onClick={this.__handleSendSms.bind(this)}>*/}
          {/*      {utils.getLang('cabinet_registerScreen_sendCode')}*/}
          {/*    </UI.Button>*/}
          {/*    { state.timer && <div className="CabinetRegister__content__timer">{utils.getLang('cabinet_registerScreen_reSendCode') + ' ' + state.timer}</div> }*/}
          {/*  </div>*/}
          {/*</div> : <div>*/}
          {/*  <UI.Input*/}
          {/*    error={state.touched && !(state.smsCode && state.smsCode.length >= 4)}*/}
          {/*    value={state.smsCode}*/}
          {/*    pattern={/^[0-9]+$/}*/}
          {/*    maxLength={4}*/}
          {/*    indicator={(state.smsCode && state.smsCode.length >= 4) ? <SVG src={require("../../../../asset/24px/check-middle.svg")} /> : null}*/}
          {/*    placeholder={utils.getLang('cabinet_registerScreen_enterCode')}*/}
          {/*    onTextChange={text => this.__handleChange("smsCode", text)}*/}
          {/*  />*/}
          {/*  <div className="CabinetRegister__content__send_code_button">*/}
          {/*    <UI.Button type="secondary" onClick={() => this.setState({codeForm: false})}>*/}
          {/*      {utils.getLang('cabinet_registerScreen_back')}*/}
          {/*    </UI.Button>*/}
          {/*    { state.timer ?*/}
          {/*      <div className="CabinetRegister__content__timer">{utils.getLang('cabinet_registerScreen_reSendCode') + ' ' + state.timer}</div> :*/}
          {/*      <div onClick={this.__handleSendSms.bind(this)} className="CabinetRegister__content__resend_code_button">*/}
          {/*        {utils.getLang('cabinet_registerScreen_reSendCode')}*/}
          {/*      </div> }*/}
          {/*  </div>*/}
          {/*</div> }*/}

          <h3 className="CabinetRegister__content__title">
            {utils.getLang("cabinet_registerScreen_createPassword")}
          </h3>
          <UI.Input
            error={state.touched && !state.password}
            value={state.password}
            type="password"
            placeholder={utils.getLang("cabinet_registerScreen_password")}
            onTextChange={text => this.__handleChange("password", text)}
          />

          <UI.Input
            error={
              state.touched &&
              (!state.passwordConfirm ||
                state.passwordConfirm !== state.password)
            }
            value={state.passwordConfirm}
            type="password"
            placeholder={utils.getLang(
              "cabinet_registerScreen_reEnterPassword"
            )}
            onTextChange={text => this.__handleChange("passwordConfirm", text)}
          />

          <div className="CabinetRegister__content__submit_wrapper">
            <UI.Button
              state={this.state.pending && "loading"}
              onClick={this.__handleSubmit.bind(this)}
            >
              {utils.getLang("site__commerceRegistration")}
            </UI.Button>
          </div>
        </UI.ContentBox>
      </div>
    );
  }
}

export default connect(
  state => ({
    translator: state.settings.translator,
    currentLang: state.default.currentLang
  }),
  {
    toastPush: toastsActions.toastPush,
    setTitle: actions.setTitle
  }
)(withRouter(CabinetRegister));
