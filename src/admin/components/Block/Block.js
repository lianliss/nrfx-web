import './Block.less';
import React from 'react';


export default props => {
  return (
    <div className="Block">
      <div className="Block__title">{props.title}</div>
      <div>{props.children}</div>
    </div>
  )
}