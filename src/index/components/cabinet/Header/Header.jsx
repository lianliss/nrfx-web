import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import router from 'src/router';

import Select from '../Select/Select';
import SVG from 'utils/svg-wrap';
import { classNames } from 'src/ui/utils';
import { getLang } from 'utils';
import { MAIN } from '../../../constants/pages';

import './Header.less';
import { Button } from 'src/ui';
import { cryptoOptions, walletsOptions } from './constants/options';
import { ActionSheet, NumberFormat } from 'src/ui';
import AdaptiveSidebar from '../AdaptiveSidebar/AdaptiveSidebar';

function Header(props) {
  // Current selected crypto.
  const [currentCrypto, setCurrentCrypto] = React.useState('solana');
  // 1 is option value
  const [currentWallet, setCurrentWallet] = React.useState(1);
  const [isLogin, setIsLogin] = React.useState(false);

  // Adaptive sidebar is open
  const [isSidebar, setIsSidebar] = React.useState(false);
  const narfexRate = 455.55;
  const getFraction = (number) => {
    const fractionIndex = String(number).indexOf('.');
    const result = String(number).slice(fractionIndex, String(number).length);
    return result;
  };

  // Set current crypto
  const handleCryptoChange = (newValue) => {
    setCurrentCrypto(newValue);
  };

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
              !isLogin && (
                <SVG src={require('src/asset/logo/narfex-icon.svg')} />
              )
            ) : (
              <SVG src={require('src/asset/logo/narfex-blue.svg')} />
            )}
          </div>
          <div className="CabinetHeader__menu">
            <Select
              isSearchable={false}
              options={cryptoOptions}
              value={currentCrypto}
              onChange={handleCryptoChange}
              components={{
                DropdownIndicator,
                IndicatorSeparator: null,
              }}
              className="CabinetSelect"
              classNamePrefix="CabinetSelect"
            />
            {isLogin ? (
              <>
                <div className="CabinetHeader__wallet-rate">
                  <SVG src={require('src/asset/logo/narfex-icon.svg')} />$
                  <div>
                    <NumberFormat number={Math.floor(narfexRate)} />
                    <span className="full-number">
                      {getFraction(narfexRate)}
                    </span>
                  </div>
                </div>
                <Select
                  isSearchable={false}
                  options={walletsOptions}
                  value={currentWallet}
                  onChange={(newValue) => setCurrentWallet(newValue)}
                  components={{
                    DropdownIndicator,
                    IndicatorSeparator: null,
                  }}
                  className="CabinetSelect__wallets"
                />
              </>
            ) : (
              <div className="dynamic-shadow wallet-connect__button">
                <Button
                  type="lightBlue"
                  size="small"
                  onClick={() => setIsLogin(true)}
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
                    title: 'Language',
                    onClick: () => {},
                    subContent: (
                      <>
                        <span className="CabinetHeader__language">
                          <img
                            src={
                              require(`../../../../asset/site/lang-flags/id.svg`)
                                .default
                            }
                          />
                        </span>
                        <span className="CabinetHeader__language active">
                          <img
                            src={
                              require(`../../../../asset/site/lang-flags/ru.svg`)
                                .default
                            }
                          />
                        </span>
                        <span className="CabinetHeader__language">
                          <img
                            src={
                              require(`../../../../asset/site/lang-flags/en.svg`)
                                .default
                            }
                          />
                        </span>
                      </>
                    ),
                  },
                  {
                    title: 'Theme',
                    onClick: () => {},
                    subContent: (
                      <span className="secondary-text">Coming soon</span>
                    ),
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
  title: PropTypes.string,
  theme: PropTypes.string,
  translator: PropTypes.bool,
  adaptive: PropTypes.bool,
};

export default connect(
  (state) => ({
    profile: state.default.profile,
    router: state.router,
    langList: state.default.langList,
    title: state.default.title,
    theme: state.default.theme,
    translator: state.settings.translator,
  }),
  {
    // loadNotifications: notificationsActions.loadNotifications,
  }
)(Header);
