import './BotForm.less';

import React from 'react';
import { connect } from 'react-redux';

import UI from '../../../../../../ui';

import * as traderActions from '../../../../../../actions/cabinet/trader';

const BotForm = props => {
  const { bot, exchanges, symbols, bot_types: types, time_frames: timeFrames } = props;

  const handleChangeProperty = (property) => (value) => {
    props.setBotProperty(property, value);
    if (property === 'type') {
      props.getOptions();
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.saveBot();
  }

  return (
    <div>
      <UI.ContentBox className="Bot__form">
        <form onSubmit={handleSubmit}>
          <div className="Bot__form__row">
            <div className="Bot__form__row__label">Exchange</div>
            <UI.Dropdown
              value={bot.exchange}
              size="small"
              onChangeValue={handleChangeProperty('exchange')}
              options={exchanges.map(e => ({
                title: e.name, value: e.id
              }))}
            />
          </div>

          <div className="Bot__form__row">
            <div className="Bot__form__row__label">Market</div>
            <UI.Dropdown
              value={bot.symbol}
              size="small"
              onChangeValue={handleChangeProperty('symbol')}
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
              onChangeValue={handleChangeProperty('type')}
              options={types.map(s => ({
                title: s.name, value: s.id
              }))}
            />
          </div>

          <div className="Bot__form__row">
            <div className="Bot__form__row__label">Trade Amount</div>
            <UI.Input value={bot.trade_amount} onTextChange={handleChangeProperty('trade_amount')} size="small" />
          </div>

          <div className="Bot__form__row">
            <div className="Bot__form__row__label">TimeFrame</div>
            <UI.Dropdown
              value={bot.time_frame}
              size="small"
              onChangeValue={handleChangeProperty('time_frame')}
              options={timeFrames.map(t => ({
                title: t.name, value: t.id
              }))}
            />
          </div>
          <UI.Button size="small">Save</UI.Button>
        </form>
      </UI.ContentBox>
    </div>
  )
}

export default connect(state => ({
  ...state.trader.bot,
}), {
  setBotProperty: traderActions.setBotProperty,
  getOptions: traderActions.getOptions,
  saveBot: traderActions.saveBot
})(BotForm);
