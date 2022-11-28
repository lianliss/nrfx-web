import React from 'react';

// Components
import { Button } from 'ui';
import SVG from 'utils/svg-wrap';
import SwapSettings from '../../../../SwapSettings/SwapSettings';

// Utils
import { classNames as cn, getLang } from 'utils';

// Styles
import './ExchangerSettings.less';

function ExchangerSettings() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="ExchangerModal__Settings">
      <Button
        type="secondary-alice"
        size="extra_large"
        className={cn({ 'settings-toggler': true, isActive })}
        onClick={() => setIsActive((prevState) => !prevState)}
      >
        <SVG
          src={require('src/asset/icons/cabinet/settings.svg')}
          className="settings-icon"
        />
        {isActive ? getLang('global_close') : getLang('global_open')}
        &nbsp;
        {getLang('dapp_swap_settings_title').toLowerCase()}
        <SVG
          src={require('src/asset/icons/arrows/form-dropdown.svg')}
          className="dropdown-icon"
        />
      </Button>
      <div
        className={cn({ ExchangerModal__Settings__container: true, isActive })}
      >
        <SwapSettings />
      </div>
    </div>
  );
}

export default ExchangerSettings;
