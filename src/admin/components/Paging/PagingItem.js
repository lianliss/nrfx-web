import React from 'react';
import action from '../../../actions/admin';

export default props => ( <div className="Paging__item" onClick={() => {
  action(props.params.action);
}}>{props.text}</div> );