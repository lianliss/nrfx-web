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

const CONTRACTS_COMMISSIONS = {
  nrfx: 0.02,
};

class CommissionsScreen extends React.PureComponent {

  render() {
    const component = this;
    const {commissions, web3SetData} = this.props;
    if (typeof commissions.default === 'undefined') {
      web3SetData({commissions: {
        default: 2,
        ...commissions,
      }})
    }

    const balances = _.get(this.props, 'balances[0].items', {});
    const rates = _.get(this.props, 'rates', {});

    const items = {default: 0, ...commissions};
    Object.keys(balances).map(token => {
      if (typeof items[token] === 'undefined') {
        items[token] = commissions.default;
      }
    });

    return <UI.ContentBox className="CommissionsScreen">
      <div className="Block__header">
        <div className="Block__title">
          Crypto Commissions
        </div>
        <UI.Button onClick={() => {
          web3Backend.updateCommissions(commissions);
        }}>Save</UI.Button>
      </div>
      <table>
        <thead>
          <th>Currency</th>
          <th>Rate</th>
          <th>Commission</th>
          <th>Contract</th>
          <th>Result</th>
        </thead>
        <tbody>
        {Object.keys(items).map(token => {
          const isDefault = typeof commissions[token] === 'undefined';

          const value = items[token];
          let numValue = 0;
          try {
            numValue = evaluate(value);
          } catch (error) {
            console.warn(`Can't evaluate ${value}`);
          }

          const rate = rates[token] || 1;
          let comm = numValue / 100;
          if (CONTRACTS_COMMISSIONS[token]) {
            comm += CONTRACTS_COMMISSIONS[token];
          }
          const result = rate + rate * comm;

          return <tr key={token}>
            <td>{token === 'default' ? token : token.toUpperCase()}</td>
            <td>
              ${getFinePrice(rate)}
              </td>
            <td>
              <UI.Input value={value}
                        indicator={'%'}
                        onChange={event => {
                          const newComms = {};
                          newComms[token] = event.target.value;
                          web3SetData({commissions: {
                            ...commissions,
                            ...newComms,
                          }});
                        }}
              />
              {(!isDefault && token !== 'default') && <UI.Button type="small"
                onClick={() => {
                const newComms = {};
                Object.keys(commissions).map(t => {
                  if (t !== token) newComms[t] = commissions[t];
                });
                web3SetData({
                  commissions: newComms,
                })
              }}>
                Use default
              </UI.Button>}
            </td>
            <td>
              {(CONTRACTS_COMMISSIONS[token] || 0) * 100}%
            </td>
            <td>
              ${getFinePrice(result)}
            </td>
          </tr>
        })}
        </tbody>
      </table>
      <UI.Button onClick={() => {
        web3Backend.updateCommissions(commissions);
      }}>Save</UI.Button>
    </UI.ContentBox>
  }
}


export default connect(state => ({
  balances: state.web3.balances,
  rates: state.web3.rates,
  commissions: state.web3.commissions,
}), dispatch => bindActionCreators({
  web3SetData,
}, dispatch), null, {pure: true})(CommissionsScreen);
