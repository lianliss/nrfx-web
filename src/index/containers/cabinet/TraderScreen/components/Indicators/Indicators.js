import './Indicators.less';

import React from 'react';
import { connect } from 'react-redux';

import UI from '../../../../../../ui';

import * as traderActions from '../../../../../../actions/cabinet/trader';

const Indicators = props => {

  const { indicators, bot } = props;

  const handleSubmit = e => {
    e.preventDefault();
    props.saveBot();
  };

  const setProperty = (indicator, property) => value => {
    props.setIndicatorProperty(indicator, property, value);
  }

  return (
    <div className="Bot__indicators">
      <UI.ContentBox className="Bot__form">
        <form onSubmit={handleSubmit}>
          <h2>Indicators</h2>
          {bot.indicators.map((bi, key) => {
            const indicator = indicators.find(i => i.id === bi.name);
            return (
              <div key={key}>
                <div className="Bot__indicators__row">
                  <div className="Bot__indicators__row__label">Indicator</div>
                  <UI.Dropdown
                    value={indicator.id}
                    size="small"
                    onChangeValue={console.log}
                    options={indicators.map(i => ({
                      title: i.name, value: i.id
                    }))}
                  />
                </div>
                {indicator.params.map(p => {
                  return (
                    <div className="Bot__indicators__row">
                      <div className="Bot__indicators__row__label">{p.name}</div>
                      <UI.Input type={p.format} onTextChange={setProperty(indicator.id, p.id)} size="small" value={bi.params[p.id]} />
                    </div>
                  )
                })}
              </div>
            )
          })}
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
  saveBot: traderActions.saveBot,
  setIndicatorProperty: traderActions.setIndicatorProperty
})(Indicators);
