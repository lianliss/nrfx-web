import "./OpenDepositModal.less";

import React from "react";
import { connect } from "react-redux";
import * as UI from "../../../../ui";
import SVG from "react-inlinesvg";
import apiSchema from "../../../../services/apiSchema";
import * as api from "../../../../services/api";
import * as walletsActions from "../../../../actions/cabinet/wallets";
import * as actions from "../../../../actions";
import * as utils from "../../../../utils";
import * as investmentsActions from "../../../../actions/cabinet/investments";
import * as toasts from "../../../../actions/toasts";

class OpenDepositModal extends React.Component {
  state = {
    walletCurrentOption: {},
    walletOptions: [],
    planOptions: [],
    planCurrentOption: {},
    amountMax: 0,
    amountMin: 0,
    currency: "btc",
    touched: false,
    pending: false,
    acceptTerms: false,
    isPool:
      ["user (pool)", "admin"].includes(
        this.props.profile.role.toLowerCase()
      ) && this.props.profile.verification === "verified"
  };

  componentDidMount() {
    this.__getWallets();

    if (
      (this.props.router.route.params.currency || "").toLowerCase() !== "btc" &&
      this.props.thisState.selectDepositType === "pool"
    ) {
      this.__setState({
        selectDepositType: "static"
      });
    }
  }

  __getWallets = () => {
    walletsActions
      .getWallets()
      .then(wallets => {
        wallets = wallets.filter(w => w.status !== "pending");
        const walletOptions = wallets.map(item => {
          const info = actions.getCurrencyInfo(item.currency);
          return {
            title: utils.ucfirst(info.name),
            note: `${utils.formatDouble(
              item.amount
            )} ${item.currency.toUpperCase()}`,
            value: item.id,
            currency: item.currency
          };
        });
        const currentCurrency = (
          this.props.router.route.params.currency ||
          this.props.thisState.currency ||
          walletOptions[0].currency
        ).toLowerCase();
        const walletCurrentOption = walletOptions.find(
          w => w.currency === currentCurrency
        );
        this.__setState(
          {
            walletOptions,
            walletCurrentOption,
            currency: walletCurrentOption.currency,
            walletId: walletCurrentOption.value
          },
          null,
          this.__getPlans
        );
      })
      .catch(err => {
        console.log("Error");
      });
  };

  __handleClickMore(e) {
    e.preventDefault();
    actions.openModal(
      "rate_details",
      {},
      {
        currency: this.props.thisState.currency,
        plans: this.props.thisState.plans.map(p => p["static"])
      }
    );
  }

  __handleToggleTerms = value => {
    this.setState({ acceptTerms: !this.state.acceptTerms });
  };

  __getPlans = (value = {}) => {
    const { currency, amount, selectDepositType } = this.props.thisState;

    currency &&
      selectDepositType &&
      api
        .call(apiSchema.Investment.PlansGet, {
          currency: value.currency || currency,
          amount: value.amount || amount || 0,
          deposit_type: value.selectDepositType || selectDepositType
        })
        .then(({ plans }) => {
          const planOptions = plans.map(plan => {
            const p = plan[this.props.thisState.selectDepositType] || {};
            return {
              value: p.id,
              title: p.description,
              note: `${p.percent}% ${p.days} ${utils.getLang(
                "global_days",
                true
              )}`,
              max: p.max,
              min: p.min
            };
          });

          let planCurrentOption =
            planOptions.find(p => p.value === this.props.thisState.planId) ||
            planOptions[0];

          this.__setState({
            plans: plans,
            planOptions,
            planCurrentOption,
            planId: planCurrentOption.value,
            amountMax: planCurrentOption.max,
            amountMin: planCurrentOption.min
          });
        })
        .catch(err => {
          toasts.error(err.message);
          // this.__setState({error: err.message});
        });
  };

  handleSubmit() {
    // TODO: ВЫНЕСТИ ЭТУ ФУНКЦИЮ В ACTIONS!

    !this.props.thisState.touched && this.__setState({ touched: true });

    if (this.props.thisState.amount) {
      this.setState({ pending: true });

      const pool = this.props.thisState.selectDepositType === "pool";

      investmentsActions
        .createDeposit(pool, {
          amount: this.props.thisState.amount,
          wallet_id: this.props.thisState.walletId,
          plan_id: this.props.thisState.planId,
          deposit_type: this.props.thisState.selectDepositType
        })
        .then(() => {
          if (pool) {
            actions.openModal("deposit_pool_success");
          } else {
            toasts.success(
              utils.getLang("cabinet_openNewDeposit_depositCreated")
            );
            this.props.onClose();
          }
        })
        .finally(() => {
          this.setState({ pending: false });
        });
    }
  }

  __handleClickMax = () => {
    const { amount } = this.props.wallets.find(
      w => w.currency === this.props.thisState.currency
    );
    const { amountMax } = this.props.thisState;
    this.__setState({ amount: amount > amountMax ? amountMax : amount });
  };

  __setState = (value, key = null, callback) => {
    investmentsActions.openDepositModalPropertySet(value);
    if (callback) callback();
  };

  render() {
    const { selectDepositType } = this.props.thisState;
    const currencyInfo = actions.getCurrencyInfo(this.props.thisState.currency);
    const typeInfoRowsData = {
      static: [
        {
          label: utils.getLang("cabinet_openNewDeposit_income"),
          icon: require("../../../../asset/24px/bar-chart.svg")
        },
        {
          label: utils.getLang("cabinet_openNewDeposit_extra"),
          icon: require("../../../../asset/24px/percent.svg")
        },
        {
          label: utils.getLang("cabinet_openNewDeposit_conclusion"),
          icon: require("../../../../asset/24px/withdraw.svg")
        }
      ],
      dynamic: [
        {
          label: utils.getLang("cabinet_openNewDeposit_progressive"),
          icon: require("../../../../asset/24px/bar-chart.svg")
        },
        {
          label: utils.getLang("cabinet_openNewDeposit_reduction"),
          icon: require("../../../../asset/24px/withdraw.svg")
        }
      ],
      pool: [
        {
          label: utils.getLang("cabinet_openNewDeposit_pool_income"),
          icon: require("../../../../asset/24px/bar-chart.svg")
        },
        {
          label: utils.getLang("cabinet_openNewDeposit_special"),
          icon: require("../../../../asset/24px/star.svg")
        }
      ]
    };

    const typeInfoRows = typeInfoRowsData[selectDepositType];

    return (
      <UI.Modal
        noSpacing
        className="OpenDepositModal__wrapper"
        isOpen={true}
        onClose={this.props.onClose}
      >
        <UI.ModalHeader>
          {utils.getLang("cabinet_openNewDeposit_name")} {this.state.amount}
        </UI.ModalHeader>
        <div className="OpenDepositModal">
          <UI.CircleIcon
            className="OpenDepositModal__icon"
            currency={currencyInfo}
          />
          <div className="OpenDepositModal__row">
            <UI.Dropdown
              value={this.props.thisState.walletCurrentOption}
              options={this.props.thisState.walletOptions}
              disabled={selectDepositType === "pool"}
              onChange={item => {
                item &&
                  this.__setState(
                    {
                      walletCurrentOption: item,
                      currency: item.currency,
                      walletId: item.value
                    },
                    null,
                    this.__getPlans(item)
                  );
              }}
            />
          </div>
          <div className="OpenDepositModal__row OpenDepositModal__amount">
            <UI.Input
              type="number"
              error={
                this.props.thisState.touched &&
                (!this.props.thisState.amount ||
                  this.props.thisState.amount >
                    this.props.thisState.amountMax ||
                  this.props.thisState.amount < this.props.thisState.amountMin)
              }
              value={this.props.thisState.amount}
              onBlur={() => {
                const { amount, amountMax } = this.props.thisState;
                this.__setState(
                  { amount: amount > amountMax ? amountMax : amount },
                  null,
                  this.__getPlans
                );
              }}
              placeholder={utils.getLang("cabinet_openNewDeposit_amount")}
              indicator={`${utils.getLang(
                "cabinet_openNewDeposit_min",
                true
              )} ${this.props.thisState.amountMin} ${this.props.thisState
                .currency && this.props.thisState.currency.toUpperCase()}`}
              onTextChange={amount => {
                this.__setState({ amount });
              }}
            />
            <UI.Button
              onClick={this.__handleClickMax}
              type="outline"
              currency={currencyInfo}
            >
              {utils.getLang("cabinet_sendCoinsModal_max")}
            </UI.Button>
          </div>
          <div className="OpenDepositModal__row">
            <UI.SwitchTabs
              currency={currencyInfo}
              selected={this.props.thisState.selectDepositType}
              onChange={selectDepositType => {
                let state = {};
                if (selectDepositType === "pool") {
                  const item = this.props.thisState.walletOptions[0];
                  state = {
                    walletCurrentOption: item,
                    currency: item.currency,
                    walletId: item.value
                  };
                }

                this.__setState(
                  { selectDepositType, ...state },
                  null,
                  this.__getPlans({ selectDepositType })
                );
              }}
              tabs={[
                { value: "static", label: "Static" },
                { value: "dynamic", label: "Dynamic" },
                this.state.isPool && { value: "pool", label: "Pool" }
              ].filter(Boolean)}
            />
            <div className="OpenDepositModal__type_info">
              {typeInfoRows.map((item, i) => {
                return (
                  <div className="OpenDepositModal__type_info__row" key={i}>
                    <SVG src={item.icon} />
                    {item.label}
                  </div>
                );
              })}
              {selectDepositType !== "pool" && (
                <span
                  onClick={this.__handleClickMore.bind(this)}
                  className="OpenDepositModal__type_info__more link"
                >
                  {utils.getLang("cabinet_openNewDeposit_more")}
                </span>
              )}
            </div>
          </div>
          {selectDepositType !== "pool" && (
            <div className="OpenDepositModal__row">
              <UI.Dropdown
                value={this.props.thisState.planCurrentOption}
                options={this.props.thisState.planOptions}
                onChange={item => {
                  item &&
                    this.__setState({
                      planId: item.value,
                      planCurrentOption: item,
                      amountMax: item.max,
                      amountMin: item.min
                    });
                }}
              />
            </div>
          )}

          {this.props.thisState.error && (
            <div className="OpenDepositModal__error">
              {this.props.thisState.error}
            </div>
          )}

          {selectDepositType === "pool" && (
            <div className="OpenDepositModal__termsConditions">
              <UI.CheckBox
                checked={this.state.acceptTerms}
                onChange={this.__handleToggleTerms}
              />
              <span
                onClick={() =>
                  actions.openModal("static_content", { type: "pool_terms" })
                }
                className=""
              >
                {utils.getLang("cabinet_investmentAcceptTerms")}
              </span>
            </div>
          )}

          <div className="OpenDepositModal__btn_wrapper">
            <UI.Button
              currency={currencyInfo}
              onClick={this.handleSubmit.bind(this)}
              disabled={
                this.state.pending ||
                this.props.thisState.amount < this.props.thisState.amountMin ||
                (selectDepositType === "pool" && !this.state.acceptTerms)
              }
            >
              {utils.getLang("cabinet_openNewDeposit_invest")}
            </UI.Button>
          </div>
        </div>
      </UI.Modal>
    );
  }
}

export default connect(state => ({
  profile: state.default.profile,
  wallets: state.wallets.wallets,
  router: state.router,
  thisState: state.investments.openDepositModal
}))(OpenDepositModal);
