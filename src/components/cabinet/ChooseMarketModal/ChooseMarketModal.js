import './ChooseMarketModal.less';

import React from 'react';
import UI from '../../../ui';
import * as exchange from  '../../../actions/cabinet/exchange'
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as actions from '../../../actions';

class ChooseMarketModal extends React.Component{
  componentDidMount() {
    exchange.getMarkets();
  }

  render () {
    const { markets } = this.props;
    return (
      <UI.Modal noSpacing isOpen={true} onClose={this.props.onClose}>
        <div className="ChooseMarketModal">
          <div className="ChooseMarketModal__filters">
            <UI.ModalHeader>Choose Pair</UI.ModalHeader>
            <div className="ChooseMarketModal__filters__form">
              <UI.Input
                placeholder="Search Pairs"
              />
              <UI.Button>BTC</UI.Button>
              <UI.Button type="secondary">LTC</UI.Button>
            </div>
          </div>
          <div className="ChooseMarketModal__market_list">
            <UI.Table inline >
              {markets.map(({ market }) => {
                const [primary, secondary] = market.name.split('/').map(actions.getCurrencyInfo);
                return (
                  <UI.TableCell onClick={() => this.props.chooseMarket(market.name)}>
                    <UI.TableColumn>
                      <div className="ChooseMarketModal__icons">
                        <div style={{backgroundImage: `url(${primary.icon})`}} className="ChooseMarketModal__icon" />
                        <div style={{backgroundImage: `url(${secondary.icon})`}} className="ChooseMarketModal__icon" />
                      </div>
                    </UI.TableColumn>
                    <UI.TableColumn lign="left">
                      <div className="ChooseMarketModal__market">
                        <span className="ChooseMarketModal__market_primary">{primary.abbr.toUpperCase()}</span>
                        <span className="ChooseMarketModal__market_secondary"> / {secondary.abbr.toUpperCase()}</span>
                      </div>
                    </UI.TableColumn>
                    <UI.TableColumn>{market.max_amount}</UI.TableColumn>
                    <UI.TableColumn>{market.min_amount}</UI.TableColumn>
                  </UI.TableCell>
                )
              })}
            </UI.Table>
          </div>
        </div>
      </UI.Modal>
    )
  }
}


export default storeUtils.getWithState(
  CLASSES.EXCHANGE_CHOSE_MARKET_MODAL,
  ChooseMarketModal
);
