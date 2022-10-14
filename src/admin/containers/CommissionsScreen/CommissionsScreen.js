import "./CommissionsScreen.less";

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getFinePrice from 'utils/get-fine-price';
import web3Backend from "services/web3-backend";
import {
  WEI_ETHER,
} from 'src/index/constants/cabinet';
import {
  getLang,
} from 'utils';
import {
  web3SetData,
} from 'actions/cabinet/web3';
import _ from 'lodash';
import * as UI from 'ui';
import {evaluate} from 'mathjs';
import KNOWN_FIATS from 'src/index/constants/knownFiats';

const CONTRACTS_COMMISSIONS = {
  nrfx: 0.02,
};

const DEFAULT_COMM_NAME = 'default';
const BINANCE_COMM_NAME = 'BinanceDefault';
const FIAT_COMM_NAME = 'FiatDefault';
const RESERVED_NAMES = [
    DEFAULT_COMM_NAME,
    BINANCE_COMM_NAME,
    FIAT_COMM_NAME,
];

class CommissionsScreen extends React.PureComponent {

  render() {
    const component = this;
    let {commissions, web3SetData} = this.props;

    let processed = commissions;
    try {
      processed = JSON.parse(commissions);
    } catch (error) {
      processed = commissions;
    }

    if (typeof processed.default === 'undefined') {
      web3SetData({commissions: {
        default: 2,
        ...processed,
      }})
    }
  
    const balances = _.get(this.props, 'balances[0].items', {});
    const rates = _.get(this.props, 'rates', {});
    
    commissions = {};
    commissions[DEFAULT_COMM_NAME] = processed[DEFAULT_COMM_NAME];
    commissions[FIAT_COMM_NAME] = _.get(processed, FIAT_COMM_NAME, 0);
    commissions[BINANCE_COMM_NAME] = _.get(processed, BINANCE_COMM_NAME, commissions[DEFAULT_COMM_NAME]);
    
    let fiats = [];
    KNOWN_FIATS.map(fiat => {
      const symbol = fiat.symbol.toLowerCase();
      commissions[symbol] = _.get(processed, symbol, undefined);
      fiats.push(symbol);
    });
    fiats = fiats.sort();
  
    const binanceTokens = [
      'nrfx'
    ];
    Object.keys(rates)
      .filter(key => key.indexOf('USDT') >= 0)
      .sort()
      .map(symbol => {
        binanceTokens.push(symbol);
      });
    binanceTokens.map(symbol => {
      commissions[symbol] = _.get(processed, symbol, undefined);
    });
    
    return <UI.ContentBox className="CommissionsScreen">
      <div className="Block__header">
        <div className="Block__title">
          Crypto Commissions
        </div>
        <div className="CommissionsScreen__buttons">
          <UI.Button type="secondary" onClick={() => {
            web3Backend.getStats();
          }}>Stats</UI.Button>
          <UI.Button onClick={() => {
            web3Backend.updateCommissions(commissions);
          }}>Save</UI.Button>
        </div>
      </div>
      <table>
        <thead>
          <th>Currency</th>
          <th>Rate</th>
          <th>Commission</th>
          <th>Contract</th>
          <th>Result</th>
          <th>Fiat&Coin</th>
        </thead>
        <tbody>
        {this.renderRow({
          commissions,
          rates,
          symbol: DEFAULT_COMM_NAME,
          isHideResult: true,
          title: <>Default <small>deprecated</small></>
        })}
        {this.renderRow({commissions,
          rates,
          symbol: FIAT_COMM_NAME,
          secondValue: commissions[BINANCE_COMM_NAME],
          isHideResult: true,
          isBold: true,
          title: 'Fiat Default'})}
        {fiats.map(symbol => this.renderRow({
          commissions,
          rates,
          symbol,
          currency: symbol.toUpperCase(),
          defaultValue: commissions[FIAT_COMM_NAME],
          secondValue: commissions[BINANCE_COMM_NAME],
          placeholder: `${commissions[FIAT_COMM_NAME]}`,
        }))}
        {this.renderRow({
          commissions,
          rates,
          symbol: BINANCE_COMM_NAME,
          secondValue: commissions[FIAT_COMM_NAME],
          isHideResult: true,
          isBold: true,
          title: 'Binance Default'
        })}
        {binanceTokens.map(symbol => this.renderRow({
          commissions,
          rates,
          symbol,
          defaultValue: commissions[BINANCE_COMM_NAME],
          secondValue: commissions[FIAT_COMM_NAME],
          placeholder: `${commissions[BINANCE_COMM_NAME]}`,
        }))}
        </tbody>
      </table>
      <UI.Button onClick={() => {
        web3Backend.updateCommissions(commissions);
      }}>Save</UI.Button>
    </UI.ContentBox>
  }
  
  renderRow(params) {
    const {web3SetData} = this.props;
    const {
      commissions, rates, symbol, isBold, placeholder, currency, defaultValue, secondValue, isHideResult,
    } = params;
    const title = _.get(params, 'title', symbol.toUpperCase());
    const isDefault = typeof commissions[symbol] === 'undefined';
    const isReserved = _.includes(RESERVED_NAMES, symbol);
    
    let numDefaultValue = 0;
    try {
      numDefaultValue = evaluate(defaultValue);
    } catch (error) {}
  
    const value = commissions[symbol];
    let numValue = numDefaultValue;
    try {
      numValue = evaluate(value);
    } catch (error) {}
    
    let numSecondValue = 0;
    try {
      numSecondValue = evaluate(secondValue);
    } catch (error) {}
    
  
    const rate = rates[symbol];
    let comm = numValue / 100;
    if (CONTRACTS_COMMISSIONS[symbol]) {
      comm += CONTRACTS_COMMISSIONS[symbol];
    }
    const result = currency
      ? rate - rate * comm
      : rate + rate * comm;
    
    let total = result;
    if (numSecondValue) {
      total = currency
        ? rate - rate * (numSecondValue / 100)
        : rate + rate * (numSecondValue / 100);
    }
  
    return <tr key={symbol}>
      <td>{isBold ? <b>{title}</b> : title}</td>
      <td>
        {currency
          ? `${getFinePrice(1 / rate)} ${currency}`
          : `$${getFinePrice(rate)}`}
      </td>
      <td>
        <UI.Input value={value}
                  indicator={'%'}
                  placeholder={placeholder}
                  onChange={event => {
                    const newComms = {};
                    newComms[symbol] = event.target.value;
                    web3SetData({commissions: {
                      ...commissions,
                      ...newComms,
                    }});
                  }}
        />
        {(!isDefault && !isReserved && commissions[symbol] !== 'undefined')
        && <UI.Button type="small"
             onClick={() => {
               const newComms = {};
               newComms[symbol] = undefined;
               // Object.keys(commissions).map(t => {
               //   if (t !== token) newComms[t] = commissions[t];
               // });
               web3SetData({
                 commissions: {
                   ...commissions,
                   ...newComms
                 }
               })
             }}>
          Use default
        </UI.Button>}
      </td>
      <td>
        {!isHideResult && <>{(CONTRACTS_COMMISSIONS[symbol] || 0) * 100}%</>}
      </td>
      <td>
        {!isHideResult && (currency
          ? `${getFinePrice(1 / result)} ${currency}`
          : `$${getFinePrice(result)}`)}
      </td>
      <td>
        {!isHideResult && (currency
          ? `${getFinePrice(1 / total)} ${currency}`
          : `$${getFinePrice(total)}`)}
      </td>
    </tr>
  }
}


export default connect(state => ({
  balances: state.web3.balances,
  rates: state.web3.rates,
  commissions: state.web3.commissions,
}), dispatch => bindActionCreators({
  web3SetData,
}, dispatch), null, {pure: true})(CommissionsScreen);
