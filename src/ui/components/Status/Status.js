import './Status.less';

import React from 'react';
import { classNames as cn } from '../../utils';
import { ucfirst } from '../../../utils';

export default props => (
  <span className={cn('Status', props.status)}>
    {props.indicator && <div className="Status__indicator" />}
    {props.label || ucfirst(props.status)}
  </span>
);
