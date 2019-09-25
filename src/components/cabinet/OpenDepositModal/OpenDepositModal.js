import './OpenDepositModal.less';

import React from 'react';
import UI from '../../../ui';
import SVG from 'react-inlinesvg';
import apiSchema from '../../../services/apiSchema';
import * as api from "../../../services/api";
import * as walletsActions from "../../../actions/cabinet/wallets";
import * as actions from "../../../actions";
import * as utils from "../../../utils";
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";
import * as modalGroupActions from "../../../actions/modalGroup";
import RateDetailsModal from "../RateDetailsModal/RateDetailsModal";

class OpenDepositModal extends React.Component {
  state = {
    walletCurrentOption: {},
    walletOptions: [],
    selectDepositType: 'static',
    planOptions: [],
    planCurrentOption: {},
    amountMax: 0,
    amountMin: 0,
    currency: 'btc',
    touched: false
  };

  componentDidMount() {
    this.__getWalets();
  }

  __getWalets() {
    walletsActions.getWallets().then((wallets) => {
      wallets = wallets.filter(w => w.status !== "pending");
      const walletOptions = wallets.map((item) => {
        const info = actions.getCurrencyInfo(item.currency);
        return {
          title: utils.ucfirst(info.name),
          note: `${utils.formatDouble(item.amount)} ${item.currency.toUpperCase()}`,
          value: item.id,
          currency: item.currency
        }
      });
      const currentCurrency = (this.props.router.route.params.currency || walletOptions[0].currency).toLowerCase();
      const walletCurrentOption =  walletOptions.find(w => w.currency === currentCurrency );
      this.setState({
        walletOptions,
        walletCurrentOption,
        currency: walletCurrentOption.currency,
        walletId: walletCurrentOption.value
      }, this.__getPlans);
    }).catch(() => {
      alert("Error");
    });
  }

  __handleClickMore(e) {
    e.preventDefault();
    modalGroupActions.openModalPage(null, {}, {
      children: RateDetailsModal,
      params: {
        currency: this.state.currency,
        plans: this.state.plans.map(p => p["static"])
      }
    })
  }

  __getPlans() {
    const { currency, amount, selectDepositType } = this.state;

    currency && selectDepositType &&
    api.call(apiSchema.Investment.PlansGet, {
      currency,
      amount: amount || 0,
      deposit_type: selectDepositType
    }, ).then(({plans}) => {

      const planOptions = plans.map(plan => {
        const p = plan[this.state.selectDepositType];
        return {
          value: p.id,
          title: p.description,
          note: `${p.percent}% ${p.days} ${utils.getLang('global_days')}`,
          max: p.max,
          min: p.min
        }
      });

      let planCurrentOption = planOptions.find(p => p.value === this.state.planId) || planOptions[0];

      this.setState({
        plans: plans,
        planOptions,
        planCurrentOption,
        planId: planCurrentOption.value,
        amountMax: planCurrentOption.max,
        amountMin: planCurrentOption.min,
      });
    }).catch((err) => {
      this.setState({error: err.message});
    });
  }

  handleSubmit() {
    !this.state.touched && this.setState({ touched: true });

    this.state.amount && api.call(apiSchema.Investment.DepositPut, {
      amount: this.state.amount,
      wallet_id: this.state.walletId,
      plan_id: this.state.planId,
      deposit_type: this.state.selectDepositType
    }).then(({plans}) => {
      this.props.toastPush(utils.getLang('cabinet_openNewDeposit_depositCreated'), "success");
      this.props.modalGroupSetActiveModal();
    }).catch((err) => {
      this.setState({error: err.message});
    });
  }

  __getPlansThrottle = utils.throttle(this.__getPlans, 1000);

  render() {
    let typeInfoRows;
    const currencyInfo = actions.getCurrencyInfo(this.state.currency);
    if (this.state.selectDepositType === 'static') {
      typeInfoRows = [
        {
          label: utils.getLang('cabinet_openNewDeposit_income'),
          icon: require('../../../asset/24px/bar-chart.svg')
        },
        {
          label: utils.getLang('cabinet_openNewDeposit_extra'),
          icon: require('../../../asset/24px/percent.svg')
        },
        {
          label: utils.getLang('cabinet_openNewDeposit_conclusion'),
          icon: require('../../../asset/24px/withdraw.svg')
        }
      ];
    } else {
      typeInfoRows = [
        {
          label: utils.getLang('cabinet_openNewDeposit_progressive'),
          icon: require('../../../asset/24px/bar-chart.svg')
        },
        {
          label: utils.getLang('cabinet_openNewDeposit_reduction'),
          icon: require('../../../asset/24px/withdraw.svg')
        }
      ];
    }

    return (
      <UI.Modal noSpacing className="OpenDepositModal__wrapper" isOpen={true} onClose={() => {this.props.close()}}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_openNewDeposit_name')}
        </UI.ModalHeader>
        <div className="OpenDepositModal">
          <div className="OpenDepositModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          <div className="OpenDepositModal__row">
            <UI.Dropdown
              placeholder={this.state.walletCurrentOption}
              options={this.state.walletOptions}
              onChange={item => {
                item && this.setState({
                  walletCurrentOption: item,
                  currency: item.currency,
                  walletId: item.value
                }, this.__getPlansThrottle)
              }}
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.Input
              type="number"
              error={
                !this.state.amount && this.state.touched ||
                this.state.amount > this.state.amountMax ||
                this.state.amount < this.state.amountMin
              }
              value={this.state.amount}
              onBlur={() => {
                const { amount, amountMax } = this.state;
                this.setState({ amount: (amount > amountMax ? amountMax : amount) }, this.__getPlansThrottle);
              }}
              placeholder={utils.getLang('cabinet_openNewDeposit_amount')}
              indicator={`${utils.getLang('cabinet_openNewDeposit_min')} ${this.state.amountMin} ${this.state.currency && this.state.currency.toUpperCase()}`}
              onTextChange={amount => {
                this.setState({ amount });
              }}
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.SwitchTabs
              currency={this.state.currency}
              selected={this.state.selectDepositType}
              onChange={(selectDepositType) => this.setState({ selectDepositType }, this.__getPlans)}
              tabs={[
                { value: 'static', label: 'Static' },
                { value: 'dynamic', label: 'Dynamic' }
              ]}
            />
            <div className="OpenDepositModal__type_info">
              {typeInfoRows.map((item, i) => {
                return (
                  <div className="OpenDepositModal__type_info__row" key={i}>
                    <SVG src={item.icon} />
                    {item.label}
                  </div>
                )
              })}
              <a href="#" onClick={this.__handleClickMore.bind(this)} className="OpenDepositModal__type_info__more">
                {utils.getLang('cabinet_openNewDeposit_more')}
              </a>
            </div>
          </div>
          <div className="OpenDepositModal__row">
            <UI.Dropdown
              placeholder={this.state.planCurrentOption}
              options={this.state.planOptions}
              onChange={item => {
                item && this.setState({
                  planId: item.value,
                  planCurrentOption: item,
                  amountMax: item.max,
                  amountMin: item.min
                }, this.__getPlansThrottle)
              }}
            />
          </div>
          { this.state.error && <div className="OpenDepositModal__error">{this.state.error}</div>}
          <div className="OpenDepositModal__btn_wrapper">
            <UI.Button currency={this.state.currency} onClick={this.handleSubmit.bind(this)}>
              {utils.getLang('cabinet_openNewDeposit_invest')}
            </UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.OPEN_DEPOSIT_MODAL,
  OpenDepositModal
);
