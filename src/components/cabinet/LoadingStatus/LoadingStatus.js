import './LoadingStatus.less';

import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../ui';

export default function LoadingStatus({ status, onRetry }) {

  let cont;
  switch (status) {
    case 'loading':
      cont = <div className="LoadingStatus__spinner" />;
      break;
    case 'failed':
      cont = (
        <div className="LoadingStatus__failed">
          <div className="LoadingStatus__failed__icon" />
          <div className="LoadingStatus__failed__message">Connection Error.  Check Your Internet</div>
          <UI.Button onClick={onRetry}>Try Again</UI.Button>
        </div>
      );
      break;
  }

  return (
    <div className="LoadingStatus">
      {cont}
    </div>
  )
}

LoadingStatus.propTypes = {
  status: PropTypes.oneOf(['loading', 'failed']).isRequired,
  onRetry: PropTypes.func
};
