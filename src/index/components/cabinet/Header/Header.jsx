import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import Select from '../Select/Select';
import SVG from 'utils/svg-wrap';
import { classNames } from 'src/ui/utils';
import { getLang } from 'utils';
import { openModal, toggleTheme } from 'src/actions';
import { logout } from 'src/actions/auth';
import router from 'src/router';
import { SETTINGS, PARTNERS, MAIN } from '../../../constants/pages';
import COMPANY from '../../../constants/company';

import './Header.less';
import { Button } from 'src/ui';
import { cryptoOptions, walletsOptions } from './constants/options';
import { ActionSheet, Switch, NumberFormat } from 'src/ui';
import { currentLangSelector } from 'src/selectors';

function Header(props) {
  // Current selected crypto.
  const [currentCrypto, setCurrentCrypto] = React.useState('solana');
  const [currentWallet, setCurrentWallet] = React.useState(1);
  const currentLang = useSelector(currentLangSelector);
  const lang =
    props.langList.find((l) => l.value === currentLang) ||
    props.langList[0] ||
    {};

  const [isLogin, setIsLogin] = React.useState(true);
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
    <div className="CabinetHeader">
      <div className="CabinetHeader__container">
        {props.adaptive && (
          <div className="CabinetHeader__burger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div
          className="CabinetHeader__logo"
          onClick={() => router.navigate(MAIN)}
        >
          {props.adaptive ? (
            !isLogin && <SVG src={require('src/asset/logo/narfex-icon.svg')} />
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
                  <span className="full-number">{getFraction(narfexRate)}</span>
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
              items={[
                {
                  title: getLang('cabinet_header_settings'),
                  onClick: () => router.navigate(SETTINGS),
                },
                {
                  title: getLang('cabinet_header_partners'),
                  onClick: () => router.navigate(PARTNERS),
                },
                {
                  title: 'FAQ',
                  onClick: () => window.open(COMPANY.faqUrl),
                },
                {
                  title: lang.title,
                  onClick: () => openModal('language'),
                  subContent: (
                    <SVG
                      src={require(`../../../../asset/site/lang-flags/${lang.value}.svg`)}
                    />
                  ),
                },
                {
                  title: getLang('global_darkMode'),
                  onClick: toggleTheme,
                  subContent: <Switch on={props.theme === 'dark'} />,
                },
                {
                  title: getLang('cabinet_header_exit'),
                  onClick: logout,
                },
              ]}
            >
              <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
            </ActionSheet>
          </div>
        </div>
      </div>
    </div>
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
