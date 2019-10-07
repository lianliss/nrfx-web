import './ChooseMarketModal.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../ui';
import * as exchange from  '../../../actions/cabinet/exchange'
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as actions from '../../../actions';
import * as utils from '../../../utils/';
import ChartSimple from '../Chart/ChartSimple';


class ChooseMarketModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: {
        btc: false,
        eth: false,
        ltc: false,
        bch: false,
        usdt: false
      },
      search: ""
    }
  }

  componentDidMount() {
    exchange.getMarkets();
  }

  handleToggleCurrency(currency) {
    this.setState({
      currencies: {
        ...this.state.currencies,
        [currency]:  !this.state.currencies[currency]
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.markets !== nextProps.markets || (JSON.stringify(this.state) !== JSON.stringify(nextState));
  }

  __handleChooseMarket (market) {
    this.props.chooseMarket(market);
    this.props.onClose();
  }

  render () {
    console.log(3, "RENDER ChooseMarketModal", this.props);
    const { markets } = this.props;
    const currentCurrencies = Object.keys(this.state.currencies).filter(key => this.state.currencies[key]);
    return (
      <UI.Modal className="ChooseMarketModal__wrapper" noSpacing isOpen={true} onClose={this.props.onClose}>
        <div className="ChooseMarketModal">
          <div className="ChooseMarketModal__filters">
            <UI.ModalHeader>Choose Pair</UI.ModalHeader>
            <div className="ChooseMarketModal__filters__form">
              <UI.Input
                value={this.state.search}
                onTextChange={ value => this.setState({ search: value }) }
                placeholder="Search Pairs"
                indicatorWidth={28}
                indicator={<SVG src={require('../../../asset/24px/search.svg')} />}
              />
              {Object.keys(this.state.currencies).map(key => (
                <UI.Button
                  onClick={() => this.handleToggleCurrency(key)}
                  type={!this.state.currencies[key] ? "secondary": null}>{key.toUpperCase()}</UI.Button>
              ))}
            </div>
          </div>
          <div className="ChooseMarketModal__market_list">
            <UI.Table header={false} inline >
              {markets.map(({ market, ticker, chart }, key) => {
                const [primary, secondary] = market.name.split('/').map(actions.getCurrencyInfo);

                if (
                  (this.state.search && ![
                    primary.abbr,
                    secondary.abbr,
                    secondary.name.toLowerCase()
                  ].includes((this.state.search || "").toLowerCase())) ||
                  (
                    currentCurrencies.length &&
                    !currentCurrencies.includes(primary.abbr) &&
                    !currentCurrencies.includes(secondary.abbr)
                  )
                ) {
                  return null;
                }

                //
                // for (let i = 0; i < 50; i++) {
                //   chart.push([1567641600000 + (100000000 * i), 0.221 + i / 100]); // TODO: TEMP
                // }

                const series = {
                  color: primary.color,
                  shadow: {
                    color: primary.color,
                  },
                  data: chart.map(([x, y]) => ({ x, y })),
                }

                const numberClassName = ticker && utils.classNames(
                  "ChooseMarketModal__value",
                  ticker.percent >= 0 ? "positive" : "negative"
                );

                return (
                  <UI.TableCell key={key} onClick={() => this.__handleChooseMarket(market.name)}>
                    <UI.TableColumn>
                      <div className="ChooseMarketModal__icons">
                        <div style={{backgroundImage: `url(${primary.icon})`}} className="ChooseMarketModal__icon" />
                        <div style={{backgroundImage: `url(${secondary.icon})`}} className="ChooseMarketModal__icon" />
                      </div>
                    </UI.TableColumn>
                    <UI.TableColumn align="left">
                      <div className="ChooseMarketModal__market">
                        <span className="ChooseMarketModal__market_primary">{primary.abbr.toUpperCase()}</span>
                        <span className="ChooseMarketModal__market_secondary"> / {secondary.abbr.toUpperCase()}</span>
                      </div>
                    </UI.TableColumn>
                    <UI.TableColumn className="ChooseMarketModal__chart">
                      <ChartSimple
                        marker={false}
                        series={[series]}
                      />
                    </UI.TableColumn>
                    <UI.TableColumn>
                      { ticker && <span className={numberClassName}>{utils.formatDouble(ticker.price, 2)}</span> }
                    </UI.TableColumn>
                    <UI.TableColumn>
                      { ticker && "$" + utils.formatDouble(ticker.usd_price, 2) }
                    </UI.TableColumn>
                    <UI.TableColumn>
                      { ticker && <span className={numberClassName}>{utils.formatDouble(ticker.percent, 2)}%</span> }
                    </UI.TableColumn>
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
