import './LoadingStatus.less';

import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../ui';
import * as utils from "../../../utils";

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
          <div className="LoadingStatus__failed__message">{utils.getLang('cabinet_loadingStatus_unknownError')}</div>
          {!!onRetry && <UI.Button onClick={onRetry}>{utils.getLang('cabinet_loadingStatus_tryAgain')}</UI.Button> }
        </div>
      );
      break;
    case 'failed_connection':
      cont = (
        <div className="LoadingStatus__failed">
          <div className="LoadingStatus__failed__icon_connection" />
          <div className="LoadingStatus__failed__message">{utils.getLang('cabinet_loadingStatus_connectionError')}</div>
          {!!onRetry && <UI.Button onClick={onRetry}>{utils.getLang('cabinet_loadingStatus_tryAgain')}</UI.Button> }
        </div>
      );
      break;
    case 'failed':
      cont = (
        <div className="LoadingStatus__failed">
          <div className="LoadingStatus__failed__icon" />
          <div className="LoadingStatus__failed__message">{utils.getLang('cabinet_loadingStatus_isSeemsText')}</div>
          {onRetry && <UI.Button onClick={onRetry}>{utils.getLang('cabinet_loadingStatus_refresh')}</UI.Button> }
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
  status: PropTypes.oneOf(['loading', 'failed', 'failed_connection']).isRequired,
  onRetry: PropTypes.func,
  inline: PropTypes.bool
};
