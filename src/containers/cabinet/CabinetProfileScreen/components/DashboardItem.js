import React from 'react';
import SVG from 'react-inlinesvg';
import * as utils from '../../../../utils';
import UI from '../../../../ui';
import router from "../../../../router";

import { ReactComponent as UsersSvg } from '../../../../asset/24px/users.svg';
import { ReactComponent as InvestSvg } from '../../../../asset/24px/invest.svg';
import { ReactComponent as ShoppingCartSvg } from '../../../../asset/24px/shopping-cart.svg';

import { ReactComponent as TradeSvg } from '../../../../asset/120/trade.svg';
import { ReactComponent as Invest120Svg } from '../../../../asset/120/invest.svg';
import { ReactComponent as InviteSvg } from '../../../../asset/120/invite.svg';


class DashboardItem extends React.Component {
  constructor(props) {
    super(props);
    switch (props.type) {
      case 'investments':
        this.show = false;
        this.icon = <UsersSvg />;
        this.content = {
          firstHeaderLeftContext: utils.getLang('cabinet_profileScreen_profit'),
          firstMainContext: props.profit.btc > 0 ? props.profit.btc.toFixed(8) : 0,
          firstMainContextInvert: (props.profit.btc * props.profit.usd).toFixed(2),
          secondHeaderLeftContext: utils.getLang('cabinet_profileScreen_invested'),
          secondMainContext: (props.invested.btc > 0 ? '~ ' +  props.invested.btc.toFixed(8) : 0)  + ' BTC',
          secondMainContextInvert: (props.invested.btc * props.invested.usd).toFixed(2) + ' USD',
          emptyIcon: <Invest120Svg />,
          emptyDescription: utils.getLang('cabinet_profileScreen_actionCard_investText'),
        };
        this.button = {
          children: utils.getLang('cabinet_profileScreen_actionCard_invest'),
          onClick: () => {
            router.navigate('investments');
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
          firstMainContext: props.profit.btc > 0 ? props.profit.btc.toFixed(8) : 0,
          firstMainContextInvert: (props.profit.btc * props.profit.usd).toFixed(2),
          secondHeaderLeftContext: utils.getLang('cabinet_profileScreen_count'),
          secondMainContext: props.count,
          secondMainContextInvert: props.count,
          emptyIcon: <InviteSvg />,
          emptyDescription: utils.getLang('global_inviteDescription'),
        };
        if (props.count > 0) {
          this.show = true;
          this.button = {
            children: utils.getLang('global_invite'),
            disabled: true
          };
        } else {
          this.button = {
            children: utils.getLang('cabinet_profileScreen_actionCard_comingSoon'),
            disabled: true
          };
        }
        break;
      case 'commerce':
        this.show = false;
        this.icon = <ShoppingCartSvg />;
        this.content = {
          firstHeaderLeftContext: utils.getLang('cabinet_profileScreen_revenue'),
          firstMainContext: '0',
          firstMainContextInvert: '0',
          secondHeaderLeftContext: '',
          secondMainContext: '',
          secondMainContextInvert: '',
          emptyIcon: <TradeSvg />,
          emptyDescription: utils.getLang('cabinet_profileScreen_actionCard_tradeText'),
        };
        this.button = {
          children: utils.getLang('cabinet_profileScreen_actionCard_comingSoon'),
          disabled: true
        };
        break;
      default: break;
    }
  }

  state = {
    invert: true,
  };

  render() {
    return utils.switchMatch(this.show, {
      false: <div className="DashboardItem">
        <div className="DashboardItem__content Content_box">
          <div className="DashboardItemAction__icon">
            <div className="DashboardItemAction__icon_content">
              {this.content.emptyIcon}
            </div>
            <div className="DashboardItemAction__description">
              {this.content.emptyDescription}
            </div>
            <div className="DashboardItem__buttonAction">
              <UI.Button size="small" {...this.button} />
            </div>
          </div>
        </div>
      </div>,
      true: <div>
        <div className="DashboardItem">
          <div className="DashboardItem__content Content_box">
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
                {utils.ucfirst(this.props.type)}
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
              <UI.Button size="small" {...this.button} />
            </div>
          </div>
        </div>
      </div>
    });
  }
}

export default DashboardItem;