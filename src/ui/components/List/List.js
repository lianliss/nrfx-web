import './List.less';
import React from 'react';

export default props => (
  <div className="List">
    {props.items && props.items.map(item => (
      <div className="List__item">
        <div className="List__item__label">{item.label}:</div>
        <div className="List__item__value">{item.value}</div>
      </div>
    ))}
  </div>
);