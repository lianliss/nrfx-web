import "./SendCoinsModal.less";

import React from "react";
import { connect } from "react-redux";
import big from "big.js";

import * as UI from "../../../../ui";

import * as actions from "../../../../actions";
import * as toast from "../../../../actions/toasts";
import * as walletsActions from "../../../../actions/cabinet/wallets";
import LoadingStatus from "../../cabinet/LoadingStatus/LoadingStatus";
import * as utils from "../../../../utils";

class SendCoinsModal extends React.Component {
  state = {
    status: null,
    addressError: false
  };

  componentDidMount() {
    this.__load();
  }

  render() {
    return (
      <UI.Modal
        className="SendCoinsModal__wrapper"
        isOpen={true}
        onClose={this.props.onClose}
      >
        <UI.ModalHeader>
          {utils.getLang("cabinet_sendCoinsModal_name")}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    );
  }

  get currentWallet() {
    return this.props.wallets.find(w => w.id === this.props.walletId);
  }

  get currentFee() {
    console.log(this.props.limits, this.currentWallet.currency);
    return this.props.limits[this.currentWallet.currency].fee;
  }

  get currentMin() {
    return this.props.limits[this.currentWallet.currency].min;
  }

  __handleChange(property) {
    return value => {
      this.props.sendCoinModalSetValue(property, value);
      if (property === "address") {
        this.setState({ addressError: false });
      }
      if (property === "amount") {
        this.props.sendCoinModalSetValue(
          "amountUsd",
          utils.formatDouble(value * this.currentWallet.to_usd, 2)
        );
      }
      if (property === "walletId") {
        ["amount", "amountUsd"].forEach(property =>
          this.props.sendCoinModalSetValue(property, "")
        );
      }
      if (property === "amountUsd") {
        this.props.sendCoinModalSetValue(
          "amount",
          utils.formatDouble(value / this.currentWallet.to_usd)
        );
      }
    };
  }

  get maxAmount() {
    const currentWallet = this.currentWallet;
    if (this.props.type === "address") {
      return big(currentWallet.amount)
        .minus(this.currentFee)
        .toPrecision();
    } else {
      return currentWallet.amount;
    }
  }

  __maxDidPress = () => {
    const currentWallet = this.currentWallet;
    const amount = this.maxAmount;
    const amountUsd = amount * currentWallet.to_usd;
    this.props.sendCoinModalSetValue(
      "amount",
      utils.formatDouble(Math.max(amount, 0))
    );
    this.props.sendCoinModalSetValue(
      "amountUsd",
      utils.formatDouble(Math.max(amountUsd, 0), 2)
    );
  };

  __handleSubmit = () => {
    if (this.props.amount > this.maxAmount) {
      toast.error(
        <>
          {utils.getLang("cabinet_sendCoinsModal_maximumAmountText")} :{" "}
          {utils.formatDouble(this.maxAmount)}{" "}
          {this.currentWallet.currency.toUpperCase()}
        </>
      );
      return false;
    }
    if (this.props.amount >= this.currentMin) {
      if (this.props.type === "login") {
        this.setState({ status: "loading" });
        walletsActions
          .checkLogin(this.props.login)
          .then(response => {
            this.setState({ addressError: false });
            actions.openModal("send_confirm");
          })
          .catch(response => {
            this.setState({ addressError: true });
          })
          .finally(() => {
            this.setState({ status: null });
          });
      } else {
        actions.openModal("send_confirm");
      }
    } else {
      toast.error(
        utils.getLang("cabinet_sendCoinsModal_minimumAmountText") +
          ": " +
          utils.formatDouble(this.currentMin) +
          " " +
          this.currentWallet.currency.toUpperCase()
      );
    }
  };

  __renderContent() {
    const types = {
      address: {
        label: utils.getLang("cabinet_sendCoinsModal_viaBlockchain"),
        inputPlaceholder: utils.getLang(
          "cabinet_sendCoinsModal_viaBlockchainInputPlaceholder"
        )
      },
      login: {
        label: utils.getLang("cabinet_sendCoinsModal_insidePlatform"),
        inputPlaceholder: utils.getLang(
          "cabinet_sendCoinsModal_insidePlatformInputPlaceholder"
        )
      }
    };

    const { wallets, walletId } = this.props;

    if (this.props.loadingStatus || !this.props.limits) {
      return <LoadingStatus inline status={this.props.loadingStatus} />;
    } else {
      const currencyInfo = actions.getCurrencyInfo(this.currentWallet.currency);

      const options = wallets
        .map(w => {
          const { name, abbr, is_available } = actions.getCurrencyInfo(
            w.currency
          );
          if (is_available === false) {
            return false;
          }
          return {
            title: name,
            note: utils.formatDouble(w.amount) + " " + abbr.toUpperCase(),
            value: w.id
          };
        })
        .filter(Boolean);

      return (
        <div className="SendCoinsModal">
          <div className="SendCoinsModal__wallet">
            <UI.CircleIcon currency={currencyInfo} />
            {wallets.length > 0 && (
              <UI.Dropdown
                placeholder={""}
                value={walletId}
                options={options}
                onChangeValue={this.__handleChange("walletId")}
              />
            )}
          </div>
          <div className="SendCoinsModal__row">
            <UI.SwitchTabs
              currency={currencyInfo}
              selected={this.props.type}
              onChange={this.__handleChange("type")}
              tabs={Object.keys(types).map(type => ({
                value: type,
                label: types[type].label
              }))}
            />
          </div>
          <div className="SendCoinsModal__row">
            <UI.Input
              value={this.props[this.props.type]}
              placeholder={types[this.props.type].inputPlaceholder}
              onTextChange={this.__handleChange(this.props.type)}
              error={this.state.addressError}
            />
          </div>
          <div className="SendCoinsModal__row SendCoinsModal__amount">
            <UI.Input
              placeholder="0"
              indicator={currencyInfo.abbr.toUpperCase()}
              onTextChange={this.__handleChange("amount")}
              type="number"
              error={
                this.props.amount &&
                (this.props.amount < this.currentMin ||
                  this.props.amount > this.maxAmount)
              }
              value={this.props.amount}
              description={
                this.props.type === "address" ? (
                  <span style={{ color: currencyInfo.color }}>
                    {utils.getLang("global_fee")}:{" "}
                    <UI.NumberFormat
                      number={utils.formatDouble(this.currentFee)}
                      currency={currencyInfo.abbr}
                    />
                  </span>
                ) : (
                  <span style={{ opacity: 0 }}>-</span>
                )
              }
            />
            <UI.Tooltip
              title={utils.getLang("cabinet_sendCoinsModal_tooltipText")}
            >
              <UI.Input
                placeholder="0"
                indicator="USD"
                type="number"
                onTextChange={this.__handleChange("amountUsd")}
                value={this.props.amountUsd}
              />
            </UI.Tooltip>
            <UI.Button
              smallPadding
              type="outline"
              currency={currencyInfo}
              onClick={this.__maxDidPress}
            >
              {utils.getLang("cabinet_sendCoinsModal_max")}
            </UI.Button>
          </div>
          <div className="SendCoinsModal__submit_wrap">
            <UI.Button
              state={this.state.status}
              currency={currencyInfo}
              onClick={this.__handleSubmit}
              disabled={
                !(
                  this.props.amount &&
                  ((this.props.type === "address" && this.props.address) ||
                    (this.props.type === "login" && this.props.login))
                )
              }
            >
              {utils.getLang("global_send")}
            </UI.Button>
          </div>
        </div>
      );
    }
  }

  __load = () => {
    walletsActions.getWallets();
    this.props.getLimits();
  };
}

export default connect(
  state => ({
    loadingStatus:
      state.wallets.loadingStatus.limits || state.wallets.loadingStatus.default,
    wallets: state.wallets.wallets,
    limits: state.wallets.limits,
    ...state.wallets.sendCoinModal
  }),
  {
    sendCoinModalSetValue: walletsActions.sendCoinModalSetValue,
    getLimits: walletsActions.getLimits
  }
)(SendCoinsModal);
