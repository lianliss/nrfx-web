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
import * as investmentsActions from "../../../actions/cabinet/investments";
import * as toasts from '../../../actions/cabinet/toasts';

class OpenDepositModal extends React.Component {
  state = {
    walletCurrentOption: {},
    walletOptions: [],
    planOptions: [],
    planCurrentOption: {},
    amountMax: 0,
    amountMin: 0,
    currency: 'btc',
    touched: false,
    pending: false,
  };

  componentDidMount() {
    this.__getWallets();
  }

  __getWallets = () => {
    walletsActions.getWallets().then(wallets => {
      wallets = wallets.filter(w => w.status !== "pending");
      const walletOptions = wallets.map(item => {
        const info = actions.getCurrencyInfo(item.currency);
        return {
          title: utils.ucfirst(info.name),
          note: `${utils.formatDouble(item.amount)} ${item.currency.toUpperCase()}`,
          value: item.id,
          currency: item.currency
        }
      });
      const currentCurrency = (this.props.router.route.params.currency || this.props.thisState.currency || walletOptions[0].currency).toLowerCase();
      const walletCurrentOption =  walletOptions.find(w => w.currency === currentCurrency );
      this.__setState({
        walletOptions,
        walletCurrentOption,
        currency: walletCurrentOption.currency,
        walletId: walletCurrentOption.value
      }, null, this.__getPlans);
    }).catch(() => {
      console.log("Error");
    });
  };

  __handleClickMore(e) {
    e.preventDefault();
    actions.openModal('rate_details', {}, {
      currency: this.props.thisState.currency,
      plans: this.props.thisState.plans.map(p => p["static"])
    })
  }

  __getPlans = (value = {}) => {
    const {currency, amount, selectDepositType} = this.props.thisState;

    currency && selectDepositType &&
    api.call(apiSchema.Investment.PlansGet, {
      currency: value.currency || currency,
      amount: value.amount || amount || 0,
      deposit_type: value.selectDepositType || selectDepositType
    }, ).then(({plans}) => {

      const planOptions = plans.map(plan => {
        const p = plan[this.props.thisState.selectDepositType];
        return {
          value: p.id,
          title: p.description,
          note: `${p.percent}% ${p.days} ${utils.getLang('global_days')}`,
          max: p.max,
          min: p.min
        }
      });

      let planCurrentOption = planOptions.find(p => p.value === this.props.thisState.planId) || planOptions[0];

      this.__setState({
        plans: plans,
        planOptions,
        planCurrentOption,
        planId: planCurrentOption.value,
        amountMax: planCurrentOption.max,
        amountMin: planCurrentOption.min,
      });
    }).catch((err) => {
      this.__setState({error: err.message});
    });
  };

  handleSubmit() {
    !this.props.thisState.touched && this.__setState({ touched: true });

    if (this.props.thisState.amount) {
      this.setState({ pending: true });

      api.call(apiSchema.Investment.DepositPut, {
        amount: this.props.thisState.amount,
        wallet_id: this.props.thisState.walletId,
        plan_id: this.props.thisState.planId,
        deposit_type: this.props.thisState.selectDepositType
      }).then(({plans}) => {
        toasts.success(utils.getLang('cabinet_openNewDeposit_depositCreated'));
        this.props.modalGroupSetActiveModal();
      }).catch((err) => {
        this.__setState({error: err.message});
      }).finally(() => {
        this.setState({ pending: false });
      });
    }
  }

  __setState = (value, key = null, callback) => {
    investmentsActions.openDepositModalPropertySet(value);
    if (callback) callback();
  };

  render() {
    let typeInfoRows;

    const currencyInfo = actions.getCurrencyInfo(this.props.thisState.currency);
    if (this.props.thisState.selectDepositType === 'static') {
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
      <UI.Modal noSpacing className="OpenDepositModal__wrapper" isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_openNewDeposit_name')}
        </UI.ModalHeader>
        <div className="OpenDepositModal">
          <div className="OpenDepositModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          <div className="OpenDepositModal__row">
            <UI.Dropdown
              value={this.props.thisState.walletCurrentOption}
              options={this.props.thisState.walletOptions}
              onChange={item => {
                item && this.__setState({
                  walletCurrentOption: item,
                  currency: item.currency,
                  walletId: item.value
                }, null, this.__getPlans(item))
              }}
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.Input
              type="number"
              error={
                (!this.props.thisState.amount && this.props.thisState.touched) || (this.props.thisState.amount > this.props.thisState.amountMax) ||
                (this.props.thisState.amount < this.props.thisState.amountMin)
              }
              value={this.props.thisState.amount}
              onBlur={() => {
                const { amount, amountMax } = this.props.thisState;
                this.__setState({ amount: (amount > amountMax ? amountMax : amount) }, null, this.__getPlans);
              }}
              placeholder={utils.getLang('cabinet_openNewDeposit_amount')}
              indicator={`${utils.getLang('cabinet_openNewDeposit_min')} ${this.props.thisState.amountMin} ${this.props.thisState.currency && this.props.thisState.currency.toUpperCase()}`}
              onTextChange={amount => {
                this.__setState({ amount });
              }}
            />
          </div>
          <div className="OpenDepositModal__row">
            <UI.SwitchTabs
              currency={this.props.thisState.currency}
              selected={this.props.thisState.selectDepositType}
              onChange={(selectDepositType) => this.__setState({ selectDepositType }, null, this.__getPlans({ selectDepositType }))}
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
              value={this.props.thisState.planCurrentOption}
              options={this.props.thisState.planOptions}
              onChange={item => {
                item && this.__setState({
                  planId: item.value,
                  planCurrentOption: item,
                  amountMax: item.max,
                  amountMin: item.min
                })
              }}
            />
          </div>
          { this.props.thisState.error && <div className="OpenDepositModal__error">{this.props.thisState.error}</div>}
          <div className="OpenDepositModal__btn_wrapper">
            <UI.Button
              currency={this.props.thisState.currency}
              onClick={this.handleSubmit.bind(this)}
              disabled={this.state.pending}
            >
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
