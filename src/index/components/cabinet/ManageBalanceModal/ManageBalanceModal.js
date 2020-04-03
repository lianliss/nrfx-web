import "./ManageBalanceModal.less";

import React from "react";
import { connect } from "react-redux";
import * as UI from "../../../../ui";

import * as utils from "../../../../utils";
import * as balanceActions from "../../../../actions/cabinet/balance";
import * as actions from "../../../../actions";
import ModalState from "../ModalState/ModalState";
import SVG from "react-inlinesvg";

class ManageBalanceModal extends React.Component {
  constructor(props) {
    super(props);

    this.isWithdrawalOnly = !!props.withdrawal;
    this.category = props.category || "exchange";

    this.state = {
      amount: "",
      gaCode: "",
      type: this.isWithdrawalOnly ? "withdraw" : "deposit",
      wallets: [],
      balances: [],
      selectedId: null,
      currency: null,
      loadingStatus: "loading",
      touched: false,
      isFormSending: false
    };
  }

  get currency() {
    return this.currentOption.currency;
  }

  componentDidMount() {
    this.__load();
  }

  __handleGAChange = gaCode => {
    this.setState({ gaCode });
  };

  __load() {
    this.setState({ loadingStatus: "loading" });
    balanceActions
      .getBalance(this.category)
      .then(res => {
        if (this.props.currency) {
          let items;
          if (this.state.type === "deposit") {
            items = res.wallets;
          } else {
            items = res.balances;
          }

          for (let item of items) {
            if (item.currency === this.props.currency) {
              this.setState({ selectedId: item.id, currency: item.currency });
              break;
            }
          }
        }

        this.setState({ loadingStatus: "", ...res });
      })
      .catch(err => this.setState({ loadingStatus: err.error_name }));
  }

  get options() {
    let items;
    if (this.state.type === "deposit") {
      items = this.state.wallets;
    } else {
      items = this.state.balances;
    }

    return items
      .map(item => {
        const currencyInfo = actions.getCurrencyInfo(item.currency);
        if (currencyInfo.is_available === false) {
          return false;
        }
        return {
          value: item.id,
          title: utils.ucfirst(currencyInfo.name),
          amount: item.amount,
          currency: item.currency,
          icon: currencyInfo.icon,
          note:
            utils.formatDouble(item.amount) + " " + item.currency.toUpperCase()
        };
      })
      .filter(Boolean);
  }

  __amountDidChange = amount => {
    if (isNaN(amount)) {
      return;
    }

    this.setState({ amount });
  };

  get currentOption() {
    return (
      this.options.find(option => option.currency === this.state.currency) ||
      this.options[0]
    );
  }

  __maxDidPress = () => {
    this.setState({
      amount: utils.formatDouble(this.currentOption.amount || 0)
    });
  };

  render() {
    if (this.state.loadingStatus) {
      return (
        <ModalState status={this.state.loadingStatus} onRetry={this.__load} />
      );
    }

    if (!this.state.wallets.length) {
      return (
        <ModalState
          icon={require("src/asset/120/wallet.svg")}
          status={utils.getLang("exchange_noWallets")}
          description={
            <UI.Button
              onClick={() => {
                actions.openModal("new_wallet");
              }}
              size={"small"}
            >
              {utils.getLang("global_create")}
            </UI.Button>
          }
        />
      );
    }

    const currencyInfo = actions.getCurrencyInfo(this.currency);

    return (
      <UI.Modal isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>
          {utils.getLang("cabinet_manageBalance_title")}
        </UI.ModalHeader>
        <div className="ManageBalanceModal">
          <div className="ManageBalanceModal__row">
            {!this.isWithdrawalOnly && (
              <UI.SwitchTabs
                currency={currencyInfo}
                selected={this.state.type}
                onChange={type => this.setState({ type })}
                tabs={[
                  {
                    value: "deposit",
                    label: utils.getLang("cabinet_manageBalance_add")
                  },
                  {
                    value: "withdraw",
                    label: utils.getLang("cabinet_manageBalance_withdraw")
                  }
                ]}
              />
            )}
          </div>
          <div className="ManageBalanceModal__row">
            <UI.CircleIcon
              className="ManageBalanceModal__icon"
              currency={currencyInfo}
            />
            <UI.Dropdown
              value={this.currentOption}
              placeholder=""
              options={this.options}
              onChange={item =>
                this.setState({
                  selectedId: item.value,
                  currency: item.currency
                })
              }
            />
          </div>
          <div className="ManageBalanceModal__row ManageBalanceModal__input_button">
            <UI.Input
              type="number"
              value={this.state.amount === null ? "" : this.state.amount}
              placeholder="0.00"
              onKeyPress={e =>
                utils.__doubleInputOnKeyPressHandler(e, this.state.amount)
              }
              onTextChange={this.__amountDidChange}
              error={
                this.state.touched &&
                (!this.state.amount || this.state.amount <= 0)
              }
            />
            <UI.Button
              smallPadding
              type="outline"
              currency={currencyInfo}
              onClick={this.__maxDidPress}
            >
              {utils.getLang("cabinet_sendCoinsModal_max")}
            </UI.Button>
          </div>
          {this.props.gaEnabled && (
            <div className="ManageBalanceModal__row">
              <UI.Input
                type="code"
                cell
                autoComplete="off"
                value={this.state.gaCode}
                onTextChange={this.__handleGAChange}
                mouseWheel={false}
                placeholder={utils.getLang("site__authModalGAPlaceholder")}
                error={this.state.touched && !this.state.gaCode}
                indicator={
                  <SVG src={require("../../../../asset/google_auth.svg")} />
                }
              />
            </div>
          )}
          <div className="ManageBalanceModal__submit_wrap">
            <UI.Button
              currency={currencyInfo}
              onClick={this.__handleSubmit}
              state={this.state.isFormSending ? "loading" : ""}
            >
              {this.state.type === "deposit"
                ? utils.getLang("cabinet_manageBalance_add_button")
                : utils.getLang("cabinet_manageBalance_withdraw_button")}
            </UI.Button>
          </div>
        </div>
      </UI.Modal>
    );
  }

  __handleSubmit = () => {
    this.setState({ touched: true });
    if (this.state.amount > 0 && (!this.props.gaEnabled || this.state.gaCode)) {
      this.setState({ isFormSending: true });
      balanceActions[this.state.type]({
        from: this.currentOption.value,
        amount: this.state.amount,
        currency: this.currency,
        gaCode: this.state.gaCode
      })
        .then(() => this.props.onClose())
        .catch(() => this.setState({ isFormSending: false }));
    }
  };
}

export default connect(state => ({
  gaEnabled: state.default.profile.ga_enabled
}))(ManageBalanceModal);
