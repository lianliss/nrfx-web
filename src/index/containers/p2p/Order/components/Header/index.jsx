import React from 'react';

// Components
import { Timer, Row } from 'ui';
import { CabinetBlock, CustomButton } from 'dapp';
import Info from '../Info';
import SVG from 'utils/svg-wrap';

// Utils
import { orderProcesses as processes } from 'src/index/constants/dapp/types';
import getFinePrice from 'utils/get-fine-price';

import successIcon from 'src/asset/icons/status/check_circle_success.svg';

// Styles
import './index.less';

const timerEnabledProcesses = [
  processes.buy.payment,
  processes.buy.pending,
  processes.sell.pending,
  processes.sell.releasing,
];

const completedProcesses = [processes.buy.completed, processes.sell.completed];

const headerTitles = {
  [processes.buy.payment]: {
    title: 'Buy {to} from {from} Shop',
    subtitle: 'The order is created, please wait for system confirmation.',
  },
  [processes.buy.pending]: {
    title: 'Buy {to} from {from} Shop',
    subtitle: 'The order is created, please wait for system confirmation.',
  },
  [processes.buy.completed]: {
    title: 'Order Completed',
    subtitle: 'You have successfully purchased {toAmount}',
  },
  [processes.buy.cancelled]: {
    title: 'Order Cancelled',
    subtitle: 'You have cancelled the order.',
  },
  [processes.sell.pending]: {
    title: 'Sell {from} to {to} Shop',
    subtitle: 'Pending buyer`s payment. Time remaining',
  },
  [processes.sell.releasing]: {
    title: 'Sell {from} to {to} Shop',
    subtitle: 'The order is created, please wait for system confirmation.',
  },
  [processes.sell.completed]: {
    title: 'Order completed',
    subtitle: 'Successfully sold {fromAmount} {from}',
  },
};

const formatTitle = (title, values) => {
  let formattedTitle = title;

  Object.keys(values).forEach((key) => {
    if (!values[key]) return;
    formattedTitle = formattedTitle.replace(`{${key}}`, values[key]);
  });

  return formattedTitle;
};

function Header({ adaptive, order, from, to, fromAmount, toAmount }) {
  const isCompleted = !order.status;
  const isCancel = _.get(order, 'cache.isCancel', false);
  
  const ownerName = order.ownerName.length ? order.ownerName : order.ownerAddress;
  const clientName = order.clientName.length ? order.clientName : order.clientAddress;
  
  const {fiat, fiatAmount, moneyAmount} = order;
  const {symbol} = fiat;
  
  let title;
  let subtitle;
  if (order.status) {
    if (order.isBuy) {
      title = `Buy ${getFinePrice(moneyAmount)} ${symbol} from ${ownerName}`;
    } else {
      title = `Sell ${getFinePrice(fiatAmount)} ${symbol} to ${ownerName}`;
    }
    subtitle = 'The order is created, please wait for system confirmation.';
  } else {
    if (isCancel) {
      title = 'Order cancelled';
    } else {
      title = 'Order completed';
    }
  }

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
        <h3 className="p2p-order-header__title">
          <span>{title}</span>
          {isCompleted && (
            <SVG
              src={successIcon}
              style={{
                width: 24,
                height: 24,
                marginLeft: 5,
              }}
            />
          )}
        </h3>
        <Row alignItems="center" gap="12px 15px" wrap>
          <p>{subtitle}</p>
          {(
            <Timer
              type="light-blue"
              time={new Date(new Date(order.date).getTime() + 1 * 60 * 60 * 1000)}
              hideHours
            />
          )}
        </Row>
      </div>
      {adaptive ? chatButton : <Info order={order} />}
    </CabinetBlock>
  );
}

export default Header;
