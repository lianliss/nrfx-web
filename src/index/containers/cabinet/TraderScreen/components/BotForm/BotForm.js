import './BotForm.less';

import React from 'react';
import { connect } from 'react-redux';

import UI from '../../../../../../ui';

import * as traderActions from '../../../../../../actions/cabinet/trader';
import * as utils from '../../../../../../utils';

const BotForm = props => {
  const { bot, exchanges, symbols, bot_types: types, time_frames: timeFrames } = props;

  return (
    <div>
      <UI.ContentBox className="Bot__form">
        <div className="Bot__form__row">
          <div className="Bot__form__row__label">Exchange</div>
          <UI.Dropdown
            value={bot.exchange}
            size="small"
            onChange={console.log}
            options={exchanges.map(e => ({
              title: e.name, value: e.id
            }))}
          />
        </div>

        {/*15m 30m 1h*/}

        <div className="Bot__form__row">
          <div className="Bot__form__row__label">Market</div>
          <UI.Dropdown
            value={bot.symbol}
            size="small"
            onChange={console.log}
            options={symbols.map(s => ({
              title: s.name, value: s.id
            }))}
          />
        </div>

        <div className="Bot__form__row">
          <div className="Bot__form__row__label">Type</div>
          <UI.Dropdown
            value={bot.type}
            size="small"
            onChange={console.log}
            options={types.map(s => ({
              title: s.name, value: s.id
            }))}
          />
        </div>

        <div className="Bot__form__row">
          <div className="Bot__form__row__label">Trade Amount</div>
          <UI.Input value={bot.trade_amount} onTextChange={console.log} size="small" />
        </div>

        <div className="Bot__form__row">
          <div className="Bot__form__row__label">TimeFrame</div>
          <UI.Dropdown
            value={bot.time_frame}
            size="small"
            onChange={console.log}
            options={timeFrames.map(t => ({
              title: t.name, value: t.id
            }))}
          />
        </div>

        <UI.Button>Save</UI.Button>
      </UI.ContentBox>
    </div>
  )
}

export default connect(state => ({
  ...state.trader.bot,
}), {
  setStatusBot: traderActions.setStatusBot
})(BotForm);
