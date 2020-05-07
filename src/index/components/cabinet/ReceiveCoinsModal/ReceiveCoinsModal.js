import "./ReceiveCoinsModal.less";

import React from "react";
import * as UI from "../../../../ui";
import QRCode from "qrcode.react";

import * as actions from "../../../../actions";
import * as walletsActions from "../../../../actions/cabinet/wallets";
import LoadingStatus from "../../cabinet/LoadingStatus/LoadingStatus";
import * as utils from "../../../../utils";
import Clipboard from "../Clipboard/Clipboard";

export default class ReceiveCoinsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: "btc",
      loadingStatus: "loading",
      wallets: [],
      dropDownCurrentItem: {}
    };
  }

  componentDidMount() {
    this.__load();
  }

  get wallet() {
    let wallet = null;
    for (let i = 0; i < this.state.wallets.length; i++) {
      if (this.state.wallets[i].currency === this.state.currency) {
        wallet = this.state.wallets[i];
      }
    }
    return wallet;
  }

  render() {
    const currencyInfo = this.state.currency
      ? actions.getCurrencyInfo(this.state.currency)
      : {};
    return (
      <UI.Modal isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>
          {utils.getLang("cabinet_receiveCoinsModal_name")}{" "}
          {utils.ucfirst(currencyInfo.name)}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    );
  }

  __renderContent() {
    if (this.state.loadingStatus) {
      return <LoadingStatus inline status={this.state.loadingStatus} />;
    } else {
      const currencyInfo = actions.getCurrencyInfo(this.state.currency);
      let options = this.state.wallets.filter(w => w.status !== "pending");
      options = options
        .map(item => {
          const info = actions.getCurrencyInfo(item.currency);
          if (info.is_available === false) {
            return false;
          }
          return {
            title: utils.ucfirst(info.name),
            note: `${utils.formatDouble(
              item.amount
            )} ${item.currency.toUpperCase()}`,
            value: item.currency
          };
        })
        .filter(Boolean);

      if (!(options.length > 0)) {
        return (
          <div style={{ textAlign: "center" }}>
            {utils.getLang("cabinet_sendCoinsModal_available")}
          </div>
        );
      }

      let wallet = this.wallet;
      let placeholder = options[0];
      if (Object.keys(this.state.dropDownCurrentItem).length > 0) {
        placeholder = this.state.dropDownCurrentItem;
      } else {
        let preset = null;
        if (this.props.hasOwnProperty("preset")) {
          preset = options.filter(opt => opt.title === this.props.preset)[0];
          setTimeout(() => {
            this.setState({
              currency: preset.value,
              dropDownCurrentItem: preset
            });
          }, 0);
        }
      }

      return (
        <div className="ReceiveCoinsModal">
          <div className="SendCoinsModal__wallet">
            <UI.CircleIcon currency={currencyInfo} />
            {options.length > 0 && (
              <UI.Dropdown
                value={placeholder}
                options={options}
                onChange={item => {
                  this.setState({
                    currency: item.value,
                    dropDownCurrentItem: item
                  });
                }}
              />
            )}
          </div>
          <div className="ReceiveCoinsModal__body">
            <div className="SendCoinsModal__row ReceiveCoinsModal__qrcode">
              <QRCode value={wallet.address} size={192} />
            </div>
            <div className="ReceiveCoinsModal__content">
              <Clipboard text={wallet.address} />
              <UI.Message
                title={utils.getLang("global_attention")}
                type="error"
              >
                {utils.getLang("cabinet_receiveCoinsModal_onlySend")}{" "}
                {utils.ucfirst(currencyInfo.name)}{" "}
                {this.state.currency.toUpperCase()}{" "}
                {utils.getLang("cabinet_receiveCoinsModal_toThisAddress")}
              </UI.Message>
            </div>
          </div>
        </div>
      );
    }
  }

  __load = () => {
    this.setState({ loadingStatus: "loading" });
    walletsActions
      .getWallets()
      .then(wallets => {
        this.setState({ loadingStatus: "", wallets });
      })
      .catch(() => {
        this.setState({ loadingStatus: "failed" });
      });
  };
}
