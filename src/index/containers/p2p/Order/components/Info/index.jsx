import React from 'react';

// Components
import { Row, Col, CopyText } from 'ui';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function Info() {
  return (
    <div className="p2p-order-info">
      <Col alignItems="flex-end">
        <Row
          className="p2p-order-info__item"
          alignItems="center"
          justifyContent="flex-end"
        >
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
          className="p2p-order-info__item"
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
      </Col>
    </div>
  );
}

export default Info;
