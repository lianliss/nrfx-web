import './CabinetResetPasswordScreen.less';
import React from 'react';
import UI from '../../../ui';
import { withRouter } from 'react-router5';
import { GetParamsContext } from '../../../contexts';
import apiSchema from '../../../services/apiSchema';
import * as api from "../../../services/api";
import * as storeUtils from "../../../storeUtils";
import * as utils from "../../../utils";
import * as CLASSES from "../../../constants/classes";

class CabinetRegister extends React.PureComponent {
  state = {
    success: false
  };

  static contextType = GetParamsContext;

  __handleChange(name, value) {
    this.setState({[name]: value});
  }

  __handleSubmit() {
    const { params } = this.context;
    const { state } = this;

    this.setState({ touched: true });

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

    if ( state.password ) {
      api.call(apiSchema.Profile.ResetPasswordPut, {
        password: state.password,
        hash: params.hash
      }).then(({ access_token }) => {
        this.setState({ success: true });
      }).catch((err) => {
        this.props.toastPush(err.message, "error");
      })
    }
  }

  render() {
    if (!this.context.params.hash) {
      return false;
    }
    const { state } = this;
    return (
      <div className="CabinetResetPassword">
        <div className="CabinetResetPassword__content Content_box">
          { this.state.success ?
            <div>
              <div
                className="CabinetResetPassword__content__icon"
                style={{backgroundImage: `url(${require('../../../asset/120/success.svg')})`}} />
              <p>{utils.getLang("cabinet_resetPasswordSuccess")}</p>
            </div> :
            <div>
              <h3 className="CabinetResetPassword__content__title">{utils.getLang('cabinet_resetPassword_title')}</h3>
              <UI.Input
                type="password"
                error={state.touched && !state.password}
                value={state.password}
                placeholder={utils.getLang('cabinet_registerScreen_password')}
                onTextChange={text => this.__handleChange("password", text)}
              />
              <UI.Input
                type="password"
                error={state.touched && !state.passwordConfirm}
                value={state.passwordConfirm}
                placeholder={utils.getLang('cabinet_registerScreen_reEnterPassword')}
                onTextChange={text => this.__handleChange("passwordConfirm", text)}
              />
              <div className="CabinetResetPassword__content__submit_wrapper">
                <UI.Button onClick={this.__handleSubmit.bind(this)}>
                  {utils.getLang('cabinet_resetPassword_title')}
                </UI.Button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_RESET_PASSWORD,
  withRouter(CabinetRegister)
);