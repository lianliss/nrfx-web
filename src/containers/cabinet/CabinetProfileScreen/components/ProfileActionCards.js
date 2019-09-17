import React from 'react';
import ActionCardBox from './ActionCardBox';
import router from '../../../../router';
import * as utils from "../../../../utils";

function cards() {
  return [{
    icon: require('../../../../asset/120/invest.svg'),
    description: utils.getLang('cabinet_profileScreen_actionCard_investText'),
    actionTitle: utils.getLang('cabinet_profileScreen_actionCard_invest'),
    action: () => {
      router.navigate('investments');
    }
  }, {
    icon: require('../../../../asset/120/trade.svg'),
    description: utils.getLang('cabinet_profileScreen_actionCard_tradeText'),
    actionTitle: utils.getLang('cabinet_profileScreen_actionCard_comingSoon'),
    action: () => {
    }
  }, {
    icon: require('../../../../asset/120/bots.svg'),
    description: utils.getLang('cabinet_profileScreen_actionCard_botText'),
    actionTitle: utils.getLang('cabinet_profileScreen_actionCard_comingSoon'),
    action: () => {}
  }];
}

const defaultProps = {
  height: 320,
  buttonProps: {
    size: "large"
  }
};

export default () => <div className="CabinetStartProfileScreen__actionCards">
  {cards().map((card, i) => {
    return <ActionCardBox key={i} {...card} />
  })}
</div>