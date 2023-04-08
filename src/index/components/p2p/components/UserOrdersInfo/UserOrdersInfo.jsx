import React from 'react';

// Components
import { Row, NumberFormat } from 'ui';
import SVG from 'utils/svg-wrap';

import avatarIcon from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';

// Styles
import './UserOrdersInfo.less';

function UserOrdersInfo({ name, ordersNumber, completion }) {
  return (
    <div className="p2p-user-orders-info__wrapper">
      <Row
        className="black-gunmetal-color p2p-user-orders-info"
        alignItems="center"
        gap="0 10px"
      >
        <SVG className="p2p-user-orders-info__icon" src={avatarIcon} flex />
        <Row alignItems="center" gap="4px 12px" wrap>
          <span className="p2p-user-orders-info__name">{name}</span>
          <div className="p2p-user-orders-info__numbers">
            <span>
              <NumberFormat number={ordersNumber} /> orders
            </span>
            <span>
              <NumberFormat number={completion} percent /> completion
            </span>
          </div>
        </Row>
      </Row>
    </div>
  );
}

export default UserOrdersInfo;
