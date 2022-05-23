import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import Select from 'react-select';
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
import { options } from './constants/header_crypto';
import Notifications from '../Notifications/Notifications';
import { Badge, ActionSheet, Switch } from 'src/ui';
import { currentLangSelector } from 'src/selectors';

function Header(props) {
  // Current crypto in select.
  const [currentCrypto, setCurrentCrypto] = React.useState('solana');
  const [visibleNotifications, setVisibleNotifications] = React.useState(false);
  const currentLang = useSelector(currentLangSelector);
  const lang =
    props.langList.find((l) => l.value === currentLang) ||
    props.langList[0] ||
    {};

  // Get value object of current crypto str.
  const getValue = () => {
    return currentCrypto ? options.find((c) => c.value === currentCrypto) : '';
  };

  // Set current crypto
  const handleCryptoChange = (newValue) => {
    setCurrentCrypto(newValue.value);
  };

  return (
    <div className="CabinetHeader">
      <div className="CabinetHeader__container">
        <div
          className="CabinetHeader__logo"
          onClick={() => router.navigate(MAIN)}
        >
          {props.adaptive ? (
            <SVG src={require('src/asset/logo/narfex-icon.svg')} />
          ) : (
            <SVG src={require('src/asset/logo/narfex-blue.svg')} />
          )}
        </div>
        <div className="CabinetHeader__menu">
          <Select
            isSearchable={false}
            options={options}
            value={getValue()}
            onChange={handleCryptoChange}
            components={{
              DropdownIndicator,
              IndicatorSeparator: null,
            }}
            className="CabinetSelect"
            classNamePrefix="CabinetSelect"
          />
          <div className="dynamic-shadow wallet-connect__button">
            <Button type="lightBlue" size="small">
              <SVG
                src={require('src/asset/icons/cabinet/connect-wallet.svg')}
              />
              {!props.adaptive && <span>{getLang('cabinet_manage')}</span>}
            </Button>
          </div>
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
