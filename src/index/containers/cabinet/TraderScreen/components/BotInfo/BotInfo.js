import './BotInfo.less';

import React from 'react';
import { connect } from 'react-redux';

import * as UI from '../../../../../../ui';

import * as traderActions from '../../../../../../actions/cabinet/trader';
import * as utils from '../../../../../../utils';

const BotInfo = props => {
  const { bot } = props;
  const [primaryCurrency, secondaryCurrency] = bot.symbol.toLowerCase().split('/');
  const activated = bot.status === "activated";

  const handleToggleBot = () => {
    props.setStatusBot(props.bot.id, bot.status === 'activated' ? 'deactivated' : 'activated' );
  };

  return (
    <div>
      <UI.ContentBox className="Bot__info">
        <div className="Bot__info__column">
          <h2>{bot.name}</h2>
          <div className="Bot__info__balance">
            <UI.NumberFormat number={bot.balance} currency={primaryCurrency} />
          </div>

          <div className="Bot__info__uptime">
            <UI.Switch onChange={handleToggleBot} on={activated} />
            { activated ? <div>{ utils.dateFormat(bot.start_date, null).fromNow()}</div> : <div className="Bot__info__uptime__status">{bot.status}</div> }
          </div>
        </div>
        <div className="Bot__info__column">
          <UI.List items={[
            { label: 'ROE', value: <UI.NumberFormat number={bot.roe} color percent /> },
            { label: 'Кол-во контрактов', value: <div>{bot.trade_amount} </div> },
            { label: 'Интервал', value: bot.time_frame },
            { label: 'Позиция', value: bot.position },
            { label: 'Контрактов в позиции', value: <div>{bot.position_amount} /  {bot.max_trade_amount}</div>,},
            { label: 'Цена ликвидации', value: <UI.NumberFormat number={bot.liquidation_price} currency={secondaryCurrency} /> },
          ]} />
        </div>
      </UI.ContentBox>
    </div>
  )
}

export default connect(state => ({
  ...state.trader.bot,
}), {
  setStatusBot: traderActions.setStatusBot
})(BotInfo);
