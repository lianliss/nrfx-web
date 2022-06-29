import './TokenSelect.less';

import React from 'react';
import { connect } from 'react-redux';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import useAdaptive from 'src/hooks/adaptive';
import SVG from 'utils/svg-wrap';
import ReactScrollableList from 'react-scrollable-list';
import Web3 from 'web3/dist/web3.min.js';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import { getLang } from 'utils';
import { SwitchTabs } from 'src/ui';
import SectionBlock from '../SectionBlock/SectionBlock';
import WalletIcon from 'src/index/components/dapp/WalletIcon/WalletIcon';

// Constants
import commonBases from './constants/commonBases';

const web3 = new Web3();

class TokenSelect extends React.PureComponent {
  state = {
    search: '',
    switchTabsSelected: 'tokens',
  };

  onSearchInput = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  componentDidMount() {
    this._mounted = true;
    this.props.loadAccountBalances();

    document.addEventListener('click', this.__handleOutClick);
  }

  componentWillUnmount() {
    this._mounted = false;

    document.removeEventListener('click', this.__handleOutClick);
  }

  // @param {object} Event
  // Close modal if click was been modal out.
  __handleOutClick = (e) => {
    if (!this.tokenSelectRef) return;

    if (!this.tokenSelectRef.contains(e.target)) {
      this.props.onClose();
    }
  };

  render() {
    const {
      onChange,
      onClose,
      isAdaptive,
      tokens,
      accountAddress,
      getTokenBalance,
      getTokenUSDPrice,
      getTokenBalanceKey,
      updateTokenBalance,
      selected,
    } = this.props;
    const { search, switchTabsSelected } = this.state;
    const isTokens = switchTabsSelected === 'tokens';
    const isList = switchTabsSelected === 'list';

    const filtered = tokens
      .filter(
        (token) =>
          token.symbol.toUpperCase().indexOf(search.toUpperCase()) >= 0 ||
          token.name.toUpperCase().indexOf(search.toUpperCase()) >= 0
      )
      .sort(
        (a, b) =>
          (b.balance && b.balance !== '0') - (a.balance && a.balance !== '0')
      )
      .map((token) => {
        const { symbol, name, logoURI, price, balance } = token;
        const key = getTokenBalanceKey(token, accountAddress);
        //const balance = _.get(this.props, key);
        const balanceNumber = balance
          ? Number(wei.from(balance, token.decimals))
          : null;

        return {
          id: key,
          content: (
            <div
              className="TokenSelect__token"
              key={key}
              onClick={() => onChange(token)}
            >
              <div className="TokenSelect__token-left">
                <div
                  className="TokenSelect__token-icon"
                  style={{
                    backgroundImage: `url('${logoURI}')`,
                  }}
                />
                <div className="TokenSelect__token-name">
                  <span>{symbol}</span>
                  <span>{name}</span>
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
          ),
        };
      });

    return (
      <div
        className="TokenSelect__wrap"
        ref={(element) => (this.tokenSelectRef = element)}
      >
        <CabinetBlock>
          <div className="TokenSelect">
            <h2>
              <span>{getLang('dex_select_token')}</span>
              <span className="TokenSelect__close" onClick={onClose}>
                <SVG
                  src={
                    isAdaptive
                      ? require('src/asset/24px/angle-left.svg')
                      : require('src/asset/24px/close-large.svg')
                  }
                />
              </span>
            </h2>
            <div className="TokenSelect__search">
              <input
                type="text"
                value={search}
                placeholder={getLang('dex_tokens_search')}
                onChange={this.onSearchInput.bind(this)}
              />
              <SVG src={require('src/asset/24px/search.svg')} />
            </div>
            <SwitchTabs
              selected={switchTabsSelected}
              onChange={(value) => this.setState({ switchTabsSelected: value })}
              tabs={[
                { value: 'list', label: 'List' },
                { value: 'tokens', label: 'Tokens' },
              ]}
              type="light-blue"
              size="medium"
            />
            <SectionBlock className="TokenSelect__fiat" title="Common bases">
              {tokens
                .filter((token) => {
                  const symbol = token.symbol.toUpperCase();

                  for (let i = 0; i < commonBases.length; i++) {
                    if (symbol === commonBases[i].toUpperCase()) {
                      return true;
                    }
                  }
                })
                .map((token, key) => {
                  const isActive = token.symbol === selected.symbol;
                  const styles = isActive
                    ? {
                        borderRadius: '11px',
                        padding: '5px 16px 5px 7px',
                        background: 'rgba(229, 235, 252, 1)',
                      }
                    : {};

                  return (
                    <div
                      key={key}
                      onClick={() => onChange(token)}
                      className={`TokenSelect__fiat__item`}
                      style={styles}
                    >
                      <WalletIcon
                        currency={token.symbol.toLowerCase()}
                        size={35}
                      />
                      {token.symbol.toUpperCase()}
                    </div>
                  );
                })}
            </SectionBlock>
            <div className="TokenSelect__list">
              <h3>
                {isTokens && getLang('dex_tokens_list')}
                {isList && 'List'}
                </h3>
              {isTokens && (
                <ReactScrollableList
                  listItems={filtered}
                  heightOfItem={54}
                  maxItemsToRender={10}
                />
              )}
            </div>
              {isList && 'Coming soon'}
          </div>
        </CabinetBlock>
      </div>
    );
  }
}

export default connect((state) => ({
  isAdaptive: state.default.adaptive,
}))(TokenSelect);