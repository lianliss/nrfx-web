import React from 'react';
import ActionCardBox from './ActionCardBox';
import router from '../../../../router';

const cards = [
  {
    icon: require('../../../../asset/120/invest.svg'),
    description: "Invest your financials to get more profit",
    actionTitle: "Invest",
    action: () => {
      router.navigate('investments');
    }
  },
  {
    icon: require('../../../../asset/120/trade.svg'),
    description: "Trade on our awesome exchange",
    actionTitle: "Coming Soon",
    action: () => {}
  },
  {
    icon: require('../../../../asset/120/bots.svg'),
    description: "Use our bots to get more profit",
    actionTitle: "Coming Soon",
    action: () => {}
  }
];

const defaultProps = {
  height: 320,
  buttonProps: {
    size: "large"
  }
};

export default () => <div className="CabinetStartProfileScreen__actionCards">
  {cards.map((card, i) => {
    return <ActionCardBox key={i} {...card} />
  })}
</div>