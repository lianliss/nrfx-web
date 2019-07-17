import React, { useState } from 'react';

import UI from '../../../../ui';
import CurrencyData from '../../../../components/cabinet/CurrencyData/CurrencyData';

const options = [
  {
    value: 0,
    title: 'Bitcoin',
    note: 12,
  },
  {
    value: 1,
    title: 'Litecoin',
    note: 126.0,
  },
  {
    value: 2,
    title: 'Etherium',
    note: 2,
  },
]

function BuyCurrency({ cryptoList }) {
  const [buyCurrency, changeBuyCurrency] = useState();
  const [sellCurrency, changeSellCurrency] = useState();

  return (
    <div className="BuyCurrency Content_box">
      {/* TODO: get the list of currencies here */}
      <CurrencyData />

      <h3>Buy Currency</h3>
      <div className="BuyCurrency__content">
        <div className="BuyCurrency__content__row">
          <div className="BuyCurrency__input__wrapper">
            <UI.Input type="number" />
          </div>

          <div className="BuyCurrency__dropdown__wrapper">
            <UI.Dropdown options={options} value={buyCurrency} onChange={changeBuyCurrency} placeholder={{ title: 'Buy Currency', note: 'BTC' }} />
            <p className="Drpdown__helper__text">Helper text</p>
          </div>
        </div>

        <div className="BuyCurrency__content__row">
          <div className="BuyCurrency__input__wrapper">
            <UI.Input type="number" />
          </div>

          <div className="BuyCurrency__dropdown__wrapper">
            <UI.Dropdown options={options} value={sellCurrency} onChange={changeSellCurrency} placeholder={{ title: 'For Dollars', note: 'USD' }} />
            <p className="Drpdown__helper__text">Helper text</p>
          </div>
        </div>
      </div>

      <UI.Button forCabinet size="large">Buy</UI.Button>
    </div>
  )
}

export default BuyCurrency;