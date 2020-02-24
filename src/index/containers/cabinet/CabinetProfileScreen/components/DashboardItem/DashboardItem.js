import './DashboardItem.less';

import React from 'react';
import * as utils from '../../../../../../utils';
import * as UI from '../../../../../../ui';
import router from "../../../../../../router";

import { ReactComponent as UsersSvg } from '../../../../../../asset/24px/users.svg';
import { ReactComponent as InvestSvg } from '../../../../../../asset/24px/invest.svg';
import { ReactComponent as FiatPlusSvg } from '../../../../../../asset/24px/fiat-plus.svg';
import { ReactComponent as ShoppingCartSvg } from '../../../../../../asset/24px/shopping-cart.svg';

import { ReactComponent as TradeSvg } from '../../../../../../asset/120/trade.svg';
import { ReactComponent as Invest120Svg } from '../../../../../../asset/120/invest.svg';
import { ReactComponent as InviteSvg } from '../../../../../../asset/120/invite.svg';
import * as actions from '../../../../../../actions';
import { classNames as cn } from '../../../../../../utils';
import * as pages from '../../../../../constants/pages';

class DashboardItem extends React.Component {
  state = {
    invert: true,
  };

  render() {
    const { props } = this;

    switch (props.type) {
      case 'investments':
        this.show = false;
        this.icon = <UsersSvg />;
        this.content = {
          firstHeaderLeftContext: utils.getLang('cabinet_profileScreen_profit'),
          firstMainContext: utils.formatDouble(props.profit.btc),
          firstMainContextInvert: utils.formatDouble(props.profit.usd, 2),
          secondHeaderLeftContext: utils.getLang('cabinet_profileScreen_invested'),
          secondMainContext: (props.invested.btc > 0 ? '~ ' +  props.invested.btc.toFixed(8) : 0)  + ' BTC',
          secondMainContextInvert: (props.invested.btc * props.invested.usd).toFixed(2) + ' USD',
          emptyIcon: <Invest120Svg />,
          emptyDescription: utils.getLang('cabinet_profileScreen_actionCard_investText'),
        };
        this.button = {
          children: utils.getLang('cabinet_profileScreen_actionCard_invest'),
          onClick: () => {
            actions.openModal('open_deposit')
          }
        };
        if (props.profit.btc > 0) {
          this.show = true;
        }
        break;
      case 'partners':
        this.icon = <InvestSvg />;
        this.show = false;
        this.content = {
          firstHeaderLeftContext: utils.getLang('cabinet_profileScreen_income'),
          firstMainContext: utils.formatDouble(props.profit.btc),
          firstMainContextInvert: utils.formatDouble(props.profit.usd, 2),
          secondHeaderLeftContext: utils.getLang('cabinet_profileScreen_count'),
          secondMainContext: props.count,
          secondMainContextInvert: props.count,
          emptyIcon: <InviteSvg />,
          emptyDescription: utils.getLang('global_inviteDescription'),
        };
        this.button = {
          children: utils.getLang('global_invite'),
          onClick: () => router.navigate(pages.DASHBOARD, { section: 'partners' }),
        };
        if (props.count > 0) {
          this.show = true;
        }
        break;
      case 'exchange':
        this.show = false;
        this.icon = <ShoppingCartSvg />;
        this.content = {
          label: 'new',
          firstHeaderLeftContext: utils.getLang('cabinet_profileScreen_revenue'),
          firstMainContext: '0',
          firstMainContextInvert: '0',
          secondHeaderLeftContext: '',
          secondMainContext: '',
          secondMainContextInvert: '',
          emptyIcon: <TradeSvg />,
          emptyDescription: <span>
            {utils.getLang('cabinet_profileScreen_exchangeCard')}
          </span>,
        };
        this.button = {
          children: utils.getLang('global_trade'),
          onClick: () => router.navigate(pages.EXCHANGE),
        };
        break;
      case 'currency':
      default: break;
    }

    if (this.props.type === 'currency') {
      return (
        <UI.ContentBox className={cn("DashboardItem", this.props.type)}>
          <div className="DashboardItem__label new">New</div>
          <div className="DashboardItem__content_header">
            <div className="DashboardItem__icon"><FiatPlusSvg /></div>
            <div className="DashboardItem__headerText">
              {utils.getLang('cabinet_profileScreenCurrency')}
            </div>
          </div>
          <ol className="DashboardItem__list">
            <li>{utils.getLang('cabinet_profileScreenCurrencyText1')}</li>
            <li>{utils.getLang('cabinet_profileScreenCurrencyText2')}</li>
          </ol>
          <div className="DashboardItem__buttonAction">
            <UI.Button onClick={() => router.navigate(pages.CABINET_WALLET, { section: 'fiat' })} size="middle">{utils.getLang('global_buy')}</UI.Button>
          </div>
        </UI.ContentBox>
      )
    }

    return utils.switchMatch(this.show, {
      false: <UI.ContentBox className={cn("DashboardItem", this.props.type)}>
        {this.content.label && <div className={utils.classNames('DashboardItem__label', this.content.label)}>{this.content.label.toUpperCase()}</div>}
        <div className="DashboardItemAction__icon">
          <div className="DashboardItemAction__icon_content">
            {this.content.emptyIcon}
          </div>
          <div className="DashboardItemAction__description">
            {this.content.emptyDescription}
          </div>
          <div className="DashboardItem__buttonAction">
            <UI.Button size="middle" {...this.button} />
          </div>
        </div>
      </UI.ContentBox>,
      true: <UI.ContentBox className={cn("DashboardItem", this.props.type)}>
        {this.props.type === 'commerce' && <div className="disabled">
          <span>
            {utils.getLang('cabinet_profileScreen_comingSoon')}
          </span>
        </div>
        }
        <div className="DashboardItem__content_header">
          <div className="DashboardItem__icon">
            {this.icon}
          </div>
          <div className="DashboardItem__headerText">
            {{
              partners: utils.getLang('cabinet_partners'),
              // TODO ?
            }[this.props.type] || utils.ucfirst(this.props.type)}
          </div>
        </div>
        <div className="DashboardItem__content_item">
          <div className="DashboardItem__content_item_header">
            <div className="DashboardItem__content_item_header_left">
              {this.content.firstHeaderLeftContext}
            </div>
            <div className="DashboardItem__content_item_header_right" onClick={() => {this.setState({invert:!this.state.invert})}}>
              {this.state.invert ? 'BTC' : 'USD'}
            </div>
          </div>
          <div className="DashboardItem__content_item_context">
            {this.state.invert ? this.content.firstMainContextInvert + ' USD' : '~ ' + this.content.firstMainContext + ' BTC'}
          </div>
        </div>
        <div className="DashboardItem__content_item">
          <div className="DashboardItem__content_item_header">
            <div className="DashboardItem__content_item_header_left">
              {this.content.secondHeaderLeftContext}
            </div>
          </div>
          <div className="DashboardItem__content_item_context">
            {this.state.invert ? this.content.secondMainContextInvert : this.content.secondMainContext}
          </div>
        </div>
        <div className="DashboardItem__buttonAction">
          <UI.Button size="middle" {...this.button} />
        </div>
      </UI.ContentBox>
    });
  }
}

export default DashboardItem;
