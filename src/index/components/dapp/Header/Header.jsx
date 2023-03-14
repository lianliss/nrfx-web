import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import router from 'src/router';

import { BottomSheetSelect } from '../Select';
import SVG from 'utils/svg-wrap';
import { classNames } from 'src/ui/utils';
import { getLang } from 'utils';
import { setLang } from '../../../../services/lang';
import { MAIN, PARTNERS, SETTINGS } from '../../../constants/pages';
import { Web3Context } from 'services/web3Provider';
import { WEI_ETHER } from 'src/index/constants/cabinet';

import { logout } from 'src/actions/auth';
import { openStateModal } from 'src/actions';
import * as steps from 'src/components/AuthModal/fixtures';
import * as connectors from 'src/services/multiwallets/connectors';

import './Header.less';
import { Button } from 'src/ui';
import { ActionSheet, NumberFormat } from 'src/ui';
import AdaptiveSidebar from '../AdaptiveSidebar/AdaptiveSidebar';
import wei from 'utils/wei';
import * as options from './constants/options';
import isTestnet from 'src/utils/isTestnet';
import { isMainnet } from 'src/services/multichain/chains';

function Header(props) {
  const context = React.useContext(Web3Context);
  const [nrfxBalance, setNrfxBalance] = React.useState(0);
  // const isLogined = !!props.profile.user;

  const {
    isConnected,
    accountAddress,
    getTokenBalance,
    tokens,
    chainId,
    switchToChain,
    connector,
    network,
  } = context;

  // Adaptive sidebar is open
  const [isSidebar, setIsSidebar] = React.useState(false);
  const getFraction = (number) => {
    if (number > 0) {
      const fractionIndex = String(number).indexOf('.');
      const result = String(number).slice(fractionIndex, String(number).length);
      return result;
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    const NRFX = tokens.find((t) => t.symbol === 'NRFX');
    if (!NRFX) return;
    if (!isConnected) return;
    if (NRFX.chainId !== chainId) return;
    getTokenBalance(NRFX.address)
      .then((data) => {
        if (!data) return setNrfxBalance(0);
        setNrfxBalance(wei.from(data).toFixed(2));
      })
      .catch((error) => {
        console.error('[Header][getTokenBalance]', error);
        setNrfxBalance(0);
      });
  }, [accountAddress, isConnected, chainId]);

  return (
    <>
      <div className="DappHeader">
        <div className="DappHeader__container">
          {props.adaptive && (
            <div
              className="DappHeader__burger-menu"
              onClick={() => setIsSidebar((prev) => !prev)}
            >
              <SVG src={require('src/asset/icons/burger-menu.svg')} />
            </div>
          )}
          <div
            className="DappHeader__logo"
            onClick={() => router.navigate(MAIN)}
          >
            {props.adaptive ? (
              !isConnected && (
                <SVG src={require('src/asset/logo/narfex-icon.svg')} />
              )
            ) : (
              <SVG src={require('src/asset/logo/narfex-blue.svg')} />
            )}
          </div>
          <div className="DappHeader__menu">
            <ChainSelect
              isConnected={isConnected}
              chainId={chainId}
              connector={connector}
              switchToChain={switchToChain}
              network={network}
            />
            {isConnected ? (
              <>
                <div className="DappHeader__wallet-rate">
                  <SVG src={require('src/asset/logo/narfex-icon.svg')} />
                  &nbsp;
                  <div>
                    <NumberFormat number={Math.floor(nrfxBalance)} />
                    {/* <span className="full-number">
                      {getFraction(nrfxBalance)}
                    </span> */}
                  </div>
                </div>
                <div
                  className="DappHeader__wallet"
                  onClick={() => openStateModal('your_wallet')}
                >
                  <SVG
                    src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                  />
                  <p>{addressCut(accountAddress)}</p>
                </div>
              </>
            ) : (
              <div className="dynamic-shadow wallet-connect__button">
                <Button
                  type="lightBlue"
                  size="small"
                  onClick={() => openStateModal('connect_to_wallet')}
                >
                  <SVG
                    src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                  />
                  {!props.adaptive && (
                    <span>{getLang('dapp_global_connect_wallet')}</span>
                  )}
                </Button>
              </div>
            )}
            <div className="DappHeader__settings">
              <ActionSheet
                position="left"
                type="drop"
                items={[
                  {
                    title: getLang('cabinet_header_language'),
                    onClick: () => {},
                    subContent: props.langList.map((item, index) => (
                      <span
                        className={`DappHeader__language${
                          item.value === props.currentLang ? ' active' : ''
                        }`}
                        onClick={() => setLang(item.value)}
                        key={index}
                      >
                        <img
                          src={
                            require(`../../../../asset/site/lang-flags/${item.value}.svg`)
                              .default
                          }
                        />
                      </span>
                    )),
                  },
                  {
                    title: getLang('cabinet_header_theme'),
                    onClick: () => {},
                    subContent: (
                      <span className="secondary-text">Coming soon</span>
                    ),
                  },
                  // {
                  //   title: isLogined ? 'Logout' : 'Login',
                  //   onClick: isLogined
                  //     ? logout
                  //     : () => openModal('auth', { type: steps.LOGIN }),
                  // },
                ]}
              >
                <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
              </ActionSheet>
            </div>
          </div>
        </div>
      </div>
      {props.adaptive && (
        <AdaptiveSidebar
          active={isSidebar}
          route={props.router.route.name}
          onClose={() => setIsSidebar(false)}
        />
      )}
    </>
  );
}

Header.propTypes = {
  profile: PropTypes.object,
  router: PropTypes.object,
  langList: PropTypes.array,
  currentLang: PropTypes.string,
  theme: PropTypes.string,
  adaptive: PropTypes.bool,
};

Header.defaultProps = {
  langList: [],
};

const addressCut = (address) => {
  if (!address) {
    return '';
  }

  const finallyAddress =
    address.length > 13 ? address.slice(0, 8) : address.slice(0, 5);
  const lastNumbers = address.slice(-4);

  return `${finallyAddress}...${lastNumbers}`;
};

const DropdownIndicator = (props) => {
  return (
    <SVG
      src={require('src/asset/icons/cabinet/select-arrow.svg')}
      className={classNames({
        dropdownIndicator: true,
        active: props.selectProps.menuIsOpen,
      })}
    />
  );
};

const ChainSelect = React.memo(
  ({ isConnected, chainId, connector, switchToChain, network }) => {
    // Set current crypto
    const handleCryptoChange = React.useCallback(
      (id) => {
        if (isConnected) {
          switchToChain(id);
          return;
        }
        network.setChain(id);
      },
      [isConnected]
    );

    const cryptoOptions = options.cryptoOptions.filter((option) =>
      isTestnet ? !isMainnet[option.value] : isMainnet[option.value]
    );

    const defaultValue =
      !isConnected || cryptoOptions.find((o) => o.value === chainId)
        ? null
        : options.defaultValue(chainId);

    const allOptions = defaultValue
      ? [defaultValue, ...cryptoOptions]
      : cryptoOptions;

    return (
      <BottomSheetSelect
        isSearchable={false}
        options={allOptions}
        value={isConnected ? chainId : network.chainId}
        defaultValue={defaultValue}
        onChange={handleCryptoChange}
        type="bold"
        showSelectedInMenu
      />
    );
  }
);

export default connect(
  (state) => ({
    profile: state.default.profile,
    router: state.router,
    currentLang: state.default.currentLang,
    langList: state.default.langList.filter((item) => item.display),
    theme: state.default.theme,
  }),
  {
    // loadNotifications: notificationsActions.loadNotifications,
  }
)(Header);
