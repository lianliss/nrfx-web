import './TokenSelect.less';

import React from 'react';
import { connect } from "react-redux";
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import useAdaptive from "src/hooks/adaptive";
import SVG from 'utils/svg-wrap';
import ReactScrollableList from 'react-scrollable-list';

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

  componentDidUnmount() {
    this._mounted = false;
  }

  render() {
    const {
      onChange, onClose, isAdaptive, tokens,
      accountAddress,
      getTokenBalance,
      getTokenUSDPrice,
      getTokenStateKey,
      updateTokenBalance,
    } = this.props;
    const {search} = this.state;

    const filtered = tokens.filter(token => token.symbol.indexOf(search.toUpperCase()) >= 0)
      .map(token => {
      const {symbol, name, logoURI, rate} = token;
      const key = getTokenStateKey(token, accountAddress);

      return {
        id: key,
        content: <div className="TokenSelect__token" key={key}>
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
              0
            </div>
            <div className="TokenSelect__token-balance">
              0
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
              Select a token
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
                   placeholder="Search"
                   onChange={this.onSearchInput.bind(this)}
            />
            <SVG src={require('src/asset/24px/search.svg')} />
          </div>
          <div className="TokenSelect__list">
            <h3>Tokens list</h3>
            <ReactScrollableList
              listItems={filtered}
              heightOfItem={30}
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
