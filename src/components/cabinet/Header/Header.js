import './Header.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import Badge from '../Badge/Badge';

function Header() {
  // const handleNavigate = (route) => {
  //   router.navigate(route);
  // }

  return (
    <div className="CabinetHeader">
      <div className="CabinetHeader__content">
        <div className="CabinetHeader__logo" />
        <div className="CabinetHeader__links">

          <div className="CabinetHeader__link active">
            <SVG src={require('../../../asset/cabinet/wallet_icon.svg')} />
            Wallets
          </div>

          <div className="CabinetHeader__link">
            <SVG src={require('../../../asset/cabinet/investment_icon.svg')} />
            Investments
          </div>

          <div className="CabinetHeader__link">
            <SVG src={require('../../../asset/cabinet/bots_icon.svg')} />
            Bots
          </div>

          <div className="CabinetHeader__link">
            <SVG src={require('../../../asset/cabinet/exchange_icon.svg')} />
            Exchange
          </div>

          <div className="CabinetHeader__link">
            <SVG src={require('../../../asset/cabinet/commerce_icon.svg')} />
            Commerce
          </div>

        </div>
        <div className="CabinetHeader__icons">
          <div className="CabinetHeader__icon">
            <Badge count={4}>
              <SVG src={require('../../../asset/cabinet/notification.svg')} />
            </Badge>
          </div>
          <div className="CabinetHeader__icon">
            <SVG src={require('../../../asset/cabinet/social.svg')} />
          </div>
          <div className="CabinetHeader__icon">
            <SVG src={require('../../../asset/cabinet/settings.svg')} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header;