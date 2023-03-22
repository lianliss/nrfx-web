import React from 'react';

// Components
import { Timer, Row } from 'ui';
import { CabinetBlock, CustomButton } from 'dapp';
import Info from '../Info';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function Header({ adaptive }) {
  const chatButton = (
    <CustomButton className="p2p-order-header__chat-icon">
      <Row alignItems="center">
        <SVG
          src={require('src/asset/icons/cabinet/calendar.svg')}
          style={{ fill: '#78a0ff', marginRight: 6 }}
          flex
        />
        Chat
      </Row>
    </CustomButton>
  );

  return (
    <CabinetBlock className="p2p-order-header">
      <div>
        <h3>Buy USDT from WH Shop</h3>
        <Row alignItems="center" gap="12px 15px" wrap>
          <p>The order is created, please wait for system confirmation.</p>
          <Timer
            type="light-blue"
            time={new Date(new Date().getTime() + 1 * 60 * 60 * 1000)}
            hideHours
          />
        </Row>
      </div>
      {adaptive ? chatButton : <Info />}
    </CabinetBlock>
  );
}

export default Header;
