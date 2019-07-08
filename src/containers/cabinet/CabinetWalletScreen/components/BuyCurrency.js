import React from 'react';

import UI from '../../../../ui';


function BuyCurrency({ cryptoList }) {
  return (
    <div className="BuyCurrency Content_box">
      <h3>Buy Currency</h3>
      <div className="BuyCurrency__content">
        <div className="BuyCurrency__content__row">
          <div className="BuyCurrency__input__wrapper">
            <UI.Input />
          </div>

          {/* TODO: Create a dropdown component */}
          <div className="BuyCurrency__dropdown__wrapper">
            <UI.Input />
            <p className="Drpdown__helper__text">Helper text</p>
          </div>
        </div>

        <div className="BuyCurrency__content__row">
          <div className="BuyCurrency__input__wrapper">
            <UI.Input />
          </div>

          {/* TODO: Create a dropdown component */}
          <div className="BuyCurrency__dropdown__wrapper">
            <UI.Input />
            <p className="Drpdown__helper__text">Helper text</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyCurrency;