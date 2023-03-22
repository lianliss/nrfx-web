import React from 'react';

// Components
import { Timer, Row, CopyText } from 'ui';
import { CabinetBlock } from 'dapp';
import P2P from '../P2P';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function Order() {
  return (
    <P2P>
      <div className="p2p-order">
        <CabinetBlock className="p2p-order-header">
          <div>
            <h1>Buy USDT from WH Shop</h1>
            <Row alignItems="center" gap="12px 15px">
              <p>The order is created, please wait for system confirmation.</p>
              <Timer
                type="blue-light"
                time={new Date(new Date().getTime() + 1 * 60 * 60 * 1000)}
                hideHours
              />
            </Row>
          </div>
          <div>
            <Row className="p2p-order-header__info" alignItems="center">
              <span>Order number:</span>
              <CopyText text="44456667777788877655556677">
                <span>44456667777788877655556677</span>
                <SVG
                  src={require('src/asset/icons/action/copy-document.svg')}
                  style={{ marginLeft: 6 }}
                  flex
                />
              </CopyText>
            </Row>
            <Row
              className="p2p-order-header__info"
              alignItems="center"
              justifyContent="flex-end"
            >
              <span>Time created:</span>
              <Row alignItems="center">
                <span>2022-12-05</span>
                <SVG
                  src={require('src/asset/icons/cabinet/calendar.svg')}
                  style={{ marginLeft: 6 }}
                  flex
                />
              </Row>
              <Row alignItems="center">
                <span>20:45:50</span>
                <SVG
                  src={require('src/asset/icons/cabinet/clock.svg')}
                  style={{ marginLeft: 6 }}
                  flex
                />
              </Row>
            </Row>
          </div>
        </CabinetBlock>
        <div className="p2p-order-body">
          <div className="p2p-order-body__left">
            <div className="p2p-order-body__faq"></div>
          </div>
          <div className="p2p-order-body__right"></div>
        </div>
      </div>
    </P2P>
  );
}

export default Order;
