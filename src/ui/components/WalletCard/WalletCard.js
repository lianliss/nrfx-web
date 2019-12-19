import './WalletCard.less';
import React from 'react';


import NumberFormat from '../NumberFormat/NumberFormat';

export default props => {

  const getBackground = (currency) => {
    const { gradient } = currency;
    if (gradient) {
      return `linear-gradient(45deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`
    } else {
      return currency.color;
    }
  };

  return (
    <div className="WalletCard" style={{background: getBackground(props.currency), color: props.currency.color}} >
      {props.title && <div className="WalletCard__title">{props.title}</div>}
      {props.balance && <div className="WalletCard__balance">
        <NumberFormat number={props.balance} currency={props.currency.abbr} />
      </div>}
      {props.balanceUsd && <div className="WalletCard__balanceUsd">
        <NumberFormat number={props.balanceUsd} currency={'usd'} />
      </div>}
    </div>
  )
}
