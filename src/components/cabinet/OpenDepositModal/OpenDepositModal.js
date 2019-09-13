import './OpenDepositModal.less';

import React from 'react';
import UI from '../../../ui';
import SVG from 'react-inlinesvg';
import apiSchema from '../../../services/apiSchema';
import * as api from "../../../services/api";
import * as walletsActions from "../../../actions/cabinet/wallets";
import * as actions from "../../../actions";
import * as utils from "../../../utils";
import { connect } from "react-redux";

class OpenDepositModal extends React.Component {
  state = {
    walletCurrentOption: {},
    walletOptions: [],
    selectDepositType: 'static',
    planOptions: [],
    planCurrentOption: {},
    amountMax: 0,
    amountMin: 0,
    currency: this.props.router.route.params.currency.toLowerCase(),
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
      const walletCurrentOption =  walletOptions.find(w => w.currency === this.state.currency );
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

  __getPlans() {
    const { currency, amount, selectDepositType } = this.state;

    currency && selectDepositType &&
    api.call(apiSchema.Investment.PlansGet, {
      currency,
      amount: amount || 0,
      deposit_type: selectDepositType
    }, ).then(({plans}) => {

      const planOptions = plans.map(p => ({
        value: p.id,
        title: p.description,
        note: `${p.percent}% ${p.days} Days`,
        max: p.max,
        min: p.min
      }));

      let planCurrentOption = planOptions.find(p => p.value === this.state.planId) || planOptions[0];

      this.setState({
        planOptions,
        planCurrentOption,
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
      this.setState({ plans }, () => {

      });
    }).catch((err) => {
      this.setState({error: err.message});
    });
  }

  __getPlansThrottle = utils.throttle(this.__getPlans, 1000);

  render() {
    let typeInfoRows;
    if (this.state.selectDepositType === 'static') {
      typeInfoRows = [
        {
          label: 'Доход — равный % ежедневно',
          icon: require('../../../asset/24px/bar-chart.svg')
        },
        {
          label: 'Дополнительный бонусный %',
          icon: require('../../../asset/24px/percent.svg')
        },
        {
          label: 'Вывод — после завершения',
          icon: require('../../../asset/24px/withdraw.svg')
        }
      ];
    } else {
      typeInfoRows = [
        {
          label: 'Прогрессивный % дохода',
          icon: require('../../../asset/24px/bar-chart.svg')
        },
        {
          label: 'Снижение % дохода от частоты вывода',
          icon: require('../../../asset/24px/withdraw.svg')
        }
      ];
    }

    return (
      <UI.Modal noSpacing isOpen={true} onClose={() => {this.props.close()}}>
        <UI.ModalHeader>
          Open New Deposit
        </UI.ModalHeader>
        <div className="OpenDepositModal">
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
              error={
                !this.state.amount && this.state.touched ||
                this.state.amount > this.state.amountMax ||
                this.state.amount < this.state.amountMin
              }
              value={this.state.amount}
              placeholder="Amount"
              indicator={`min ${this.state.amountMin} ${this.state.currency.toUpperCase()}`}
              onTextChange={amount => {
                this.setState({amount: (amount || "").replace(/\D+/g,"")}, this.__getPlansThrottle);
              }}
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.SwitchTabs
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
              <a href="#" className="OpenDepositModal__type_info__more">More</a>
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
            <UI.Button onClick={this.handleSubmit.bind(this)}>Invest</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }
}

export default connect(state => ({
  router: state.router
}))(OpenDepositModal);