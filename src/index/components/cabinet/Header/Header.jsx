import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import router from 'src/router';

import Select from '../Select/Select';
import SVG from 'utils/svg-wrap';
import { classNames } from 'src/ui/utils';
import { getLang } from 'utils';
import { setLang } from '../../../../services/lang';
import { MAIN } from '../../../constants/pages';
import { Web3Context } from 'services/web3Provider';
import { WEI_ETHER } from 'src/index/constants/cabinet';

import { logout } from 'src/actions/auth';
import { openModal } from 'src/actions';
import * as steps from 'src/components/AuthModal/fixtures';

import './Header.less';
import { Button } from 'src/ui';
import { cryptoOptions } from './constants/options';
import { ActionSheet, NumberFormat } from 'src/ui';
import AdaptiveSidebar from '../AdaptiveSidebar/AdaptiveSidebar';

function Header(props) {
  const context = React.useContext(Web3Context);
  const isLogined = !!props.profile.user;
  // States
  // Current selected crypto.
  const [currentCrypto, setCurrentCrypto] = React.useState('bsc');
  const [nrfxBalance, setNrfxBalance] = React.useState(0);
  const { isConnected, accountAddress } = context;

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

  // Set current crypto
  const handleCryptoChange = (newValue) => {
    setCurrentCrypto(newValue);
  };

  React.useEffect(() => {
    context
      .getTokenBalance('0x3764Be118a1e09257851A3BD636D48DFeab5CAFE')
      .then((data) => {
        if (data > 0) {
          setNrfxBalance((data / WEI_ETHER).toFixed(2));
        } else {
          setNrfxBalance(0);
        }
      });
  }, [accountAddress]);

  return (
    <>
      <div className="CabinetHeader">
        <div className="CabinetHeader__container">
          {props.adaptive && (
            <div
              className="CabinetHeader__burger-menu"
              onClick={() => setIsSidebar((prev) => !prev)}
            >
              <SVG src={require('src/asset/icons/burger-menu.svg')} />
            </div>
          )}
          <div
            className="CabinetHeader__logo"
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
          <div className="CabinetHeader__menu">
            <Select
              isSearchable={false}
              isDisabled
              options={cryptoOptions}
              value={currentCrypto}
              onChange={handleCryptoChange}
              components={{
                DropdownIndicator,
                IndicatorSeparator: null,
              }}
              className="CabinetSelect__network"
              classNamePrefix="CabinetSelect"
            />
            {isConnected ? (
              <>
                <div className="CabinetHeader__wallet-rate">
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
                  className="CabinetHeader__wallet"
                  onClick={() => openModal('your_wallet')}
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
                  onClick={() => openModal('connect_to_wallet')}
                >
                  <SVG
                    src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                  />
                  {!props.adaptive && <span>{getLang('cabinet_manage')}</span>}
                </Button>
              </div>
            )}
            <div className="CabinetHeader__settings">
              <ActionSheet
                position="left"
                type="drop"
                items={[
                  {
                    title: getLang('cabinet_header_language'),
                    onClick: () => {},
                    subContent: props.langList.map((item, index) => (
                      <span
                        className={`CabinetHeader__language${
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
                  {
                    title: isLogined ? 'Logout' : 'Login',
                    onClick: isLogined
                      ? logout
                      : () => openModal('auth', { type: steps.LOGIN }),
                  },
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

const addressCut = (address) => {
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
