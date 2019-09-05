import './LoadingMore.less';

import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../ui';

export default function LoadingMore({ status, onClick }) {
  let cont;
  if (status === 'loading') {
    cont = <div className="LoadingStatus__spinner LoadingMore__loader" />;
  } else {
    cont = <UI.Button>{status === 'failed' ? 'Network Error. Retry' : 'More'}</UI.Button>;
  }

  return (
    <div className="LoadingMore" onClick={onClick||(() => {})}>
      {cont}
    </div>
  )
}

LoadingMore.propTypes = {
  status: PropTypes.oneOf(['loading', 'failed', '']),
  onClick: PropTypes.func
};
