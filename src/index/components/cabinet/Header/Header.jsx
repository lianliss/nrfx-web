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
import { Web3Context } from '../../../contexts';

import './Header.less';
import { Button } from 'src/ui';
import { cryptoOptions } from './constants/options';
import { ActionSheet, NumberFormat } from 'src/ui';
import AdaptiveSidebar from '../AdaptiveSidebar/AdaptiveSidebar';

function Header(props) {
  const narfexRate = 455.55;
  const cx = React.useContext(Web3Context);

  console.log(cx)

  // States
  // Current selected crypto.
  const [currentCrypto, setCurrentCrypto] = React.useState('bsc');
  const [isLogin, setIsLogin] = React.useState(false);

  // Adaptive sidebar is open
  const [isSidebar, setIsSidebar] = React.useState(false);
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
                <div className="CabinetHeader__wallet">
                  <SVG
                    src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                  />
                  <p>{addressCut('5812387123871238712323')}</p>
                </div>
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
  title: PropTypes.string,
  theme: PropTypes.string,
  translator: PropTypes.bool,
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
    title: state.default.title,
    theme: state.default.theme,
    translator: state.settings.translator,
  }),
  {
    // loadNotifications: notificationsActions.loadNotifications,
  }
)(Header);
