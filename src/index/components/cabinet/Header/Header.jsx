import React from 'react';

import Select from 'react-select';
import SVG from 'utils/svg-wrap';
import { classNames } from 'src/ui/utils';
import { getLang } from 'utils';

import './Header.less';
import { Button } from 'src/ui';
import { options } from './constants/header_crypto';

function Header(props) {
  // Current crypto in select.
  const [currentCrypto, setCurrentCrypto] = React.useState('solana');

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
        <div className="CabinetHeader__logo">
          <SVG src={require('src/asset/logo/narfex-blue.svg')} />
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
            classNamePrefix="CabinetSelect"
          />
          <div className="dynamic-shadow">
            <Button type="lightBlue" size="small">
              <SVG
                src={require('src/asset/icons/cabinet/connect-wallet.svg')}
              />
              <span>{getLang('cabinet_manage')}</span>
            </Button>
          </div>
          <div className="CabinetHeader__notifications">
            <SVG src={require('src/asset/icons/cabinet/notification.svg')} />
            <div className="CabinetHeader__notifications-counter">
              <div>
                <span>13</span>
              </div>
            </div>
          </div>
          <div className="CabinetHeader__settings">
            <SVG src={require('src/asset/icons/cabinet/settings.svg')} />
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

export default Header;
