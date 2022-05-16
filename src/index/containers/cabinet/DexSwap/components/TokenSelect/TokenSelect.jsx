import './TokenSelect.less';

import React from 'react';
import { connect } from "react-redux";
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import useAdaptive from "src/hooks/adaptive";
import SVG from 'utils/svg-wrap';
import ReactScrollableList from 'react-scrollable-list';
import Web3 from 'web3/dist/web3.min.js';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import { getLang } from "utils";

const web3 = new Web3();

class TokenSelect extends React.PureComponent {

  state = {
    search: '',
  };

  onSearchInput = event => {
    this.setState({
      search: event.target.value,
    })
  };

  componentDidMount() {
    this._mounted = true;
    this.props.loadAccountBalances();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const {
      onChange, onClose, isAdaptive, tokens,
      accountAddress,
      getTokenBalance,
      getTokenUSDPrice,
      getTokenBalanceKey,
      updateTokenBalance,
    } = this.props;
    const {search} = this.state;

    const filtered = tokens
      .filter(token => token.symbol.toUpperCase().indexOf(search.toUpperCase()) >= 0
        || token.name.toUpperCase().indexOf(search.toUpperCase()) >= 0)
      .sort((a, b) => (b.balance && b.balance !== '0') - (a.balance && a.balance !== '0'))
      .map(token => {

      const {symbol, name, logoURI, price, balance} = token;
      const key = getTokenBalanceKey(token, accountAddress);
      //const balance = _.get(this.props, key);
      const balanceNumber = balance
        ? Number(wei.from(balance, token.decimals))
        : null;

      return {
        id: key,
        content: <div className="TokenSelect__token" key={key} onClick={() => onChange(token)}>
          <div className="TokenSelect__token-left">
            <div className="TokenSelect__token-icon" style={{
              backgroundImage: `url('${logoURI}')`
            }} />
            <div className="TokenSelect__token-name">
                    <span>
                      {symbol}
                      </span>
              <span>
                      {name}
                    </span>
            </div>
          </div>
          <div className="TokenSelect__token-right">
            <div className="TokenSelect__token-price">
              {!!price && `$${getFinePrice(price * balanceNumber)}`}
            </div>
            <div className="TokenSelect__token-balance">
              {!!balanceNumber && getFinePrice(balanceNumber)}
            </div>
          </div>
        </div>
      }
    });

    return <div className="TokenSelect__wrap">
      <CabinetBlock>
        <div className="TokenSelect">
          <h2>
            <span>
              {getLang('dex_select_token')}
            </span>
            <span className="TokenSelect__close" onClick={onClose}>
              <SVG
                src={
                  isAdaptive
                    ? require("src/asset/24px/angle-left.svg")
                    : require("src/asset/24px/close-large.svg")
                }
              />
            </span>
          </h2>
          <div className="TokenSelect__search">
            <input type="text"
                   value={search}
                   placeholder={getLang('dex_tokens_search')}
                   onChange={this.onSearchInput.bind(this)}
            />
            <SVG src={require('src/asset/24px/search.svg')} />
          </div>
          <div className="TokenSelect__list">
            <h3>{getLang('dex_tokens_list')}</h3>
            <ReactScrollableList
              listItems={filtered}
              heightOfItem={54}
              maxItemsToRender={10}
            />
          </div>
        </div>
      </CabinetBlock>
    </div>
  }
}

export default connect(
  state => ({
    isAdaptive: state.default.adaptive,
  }),
)(TokenSelect);
