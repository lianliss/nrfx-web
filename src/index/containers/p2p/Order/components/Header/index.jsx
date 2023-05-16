import React from 'react';

// Components
import { Timer, Row } from 'ui';
import { CabinetBlock, CustomButton } from 'dapp';
import Info from '../Info';
import SVG from 'utils/svg-wrap';

// Utils
import { orderProcesses as processes } from 'src/index/constants/dapp/types';

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
  [processes.buy.appeal]: {
    title: 'Buy {to} from {from} Shop',
    subtitle: 'The order is created, please wait for system confirmation.',
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
  [processes.sell.appeal]: {
    title: 'Sell {from} to {to} Shop',
    subtitle: 'The order is created, please wait for system confirmation.',
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

function Header({ adaptive, process, from, to, fromAmount, toAmount }) {
  const isCompleted = completedProcesses.includes(process);
  const title = formatTitle(headerTitles[process].title, {
    from,
    to,
  });
  const subtitle = formatTitle(headerTitles[process].subtitle, {
    from,
    to,
    fromAmount,
    toAmount,
  });

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
          {timerEnabledProcesses.includes(process) && (
            <Timer
              type="light-blue"
              time={new Date(new Date().getTime() + 1 * 60 * 60 * 1000)}
              hideHours
            />
          )}
        </Row>
      </div>
      {adaptive ? chatButton : <Info />}
    </CabinetBlock>
  );
}

export default Header;
