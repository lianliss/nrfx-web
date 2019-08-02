import './LoadingStatus.less';

import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../ui';

export default function LoadingStatus({ status, onRetry, inline }) {

  let cont;
  switch (status) {
    case 'loading':
      cont = <div className="LoadingStatus__spinner" />;
      break;
    default:
      cont = (
        <div className="LoadingStatus__failed">
          <div className="LoadingStatus__failed__icon" />
          <div className="LoadingStatus__failed__message">Unknown Error.</div>
          <UI.Button onClick={onRetry}>Try Again</UI.Button>
        </div>
      );
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

  let result = (
    <div className="LoadingStatus">
      {cont}
    </div>
  );

  if (inline) {
    return (
      <div className="LoadingStatus__wrap">
        {result}
      </div>
    )
  } else {
    return result;
  }
}

LoadingStatus.propTypes = {
  status: PropTypes.oneOf(['loading', 'failed']).isRequired,
  onRetry: PropTypes.func,
  inline: PropTypes.bool
};
