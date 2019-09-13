import React from 'react';
import SVG from 'react-inlinesvg';
import * as utils from '../../../../utils';

class DashboardItem extends React.Component {
  constructor(props) {
    super(props);
    switch (props.type) {
      case 'investments':
        this.icon = <SVG src={require('../../../../asset/24px/users.svg')} />;
        this.content = {
          firstHeaderLeftContext: 'Profit',
          firstMainContext: props.profit.btc > 0 ? props.profit.btc.toFixed(6) : 0,
          firstMainContextInvert: (props.profit.btc * props.profit.usd).toFixed(2),
          secondHeaderLeftContext: 'Invested',
          secondMainContext: '~ ' + props.invested.btc + ' BTC',
          secondMainContextInvert: (props.invested.btc * props.invested.usd).toFixed(2) + ' USD'
        };

        break;
      case 'partners':
        this.icon = <SVG src={require('../../../../asset/24px/invest.svg')} />;
        this.content = {
          firstHeaderLeftContext: 'Income',
          firstMainContext: props.profit.btc > 0 ? props.profit.btc.toFixed(6) : 0,
          firstMainContextInvert: (props.profit.btc * props.profit.usd).toFixed(2),
          secondHeaderLeftContext: 'Count',
          secondMainContext: props.count,
          secondMainContextInvert: props.count
        };
        break;
      case 'commerce':
        this.icon = <SVG src={require('../../../../asset/24px/shopping-cart.svg')} />;
        this.content = {
          firstHeaderLeftContext: 'Revenue',
          firstMainContext: '0',
          firstMainContextInvert: '0',
          secondHeaderLeftContext: '',
          secondMainContext: '',
          secondMainContextInvert: '',
        };
        break;
      default: break;
    }
  }

  state = {
    invert: true,
  };

  render() {
    return (
      <div className="DashboardItem">
        <div className="DashboardItem__content Content_box">
          {
            this.props.type === 'commerce' && <div className="disabled">
              <span>
                Coming soon...
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
        </div>
      </div>
    )
  }
}

export default DashboardItem;