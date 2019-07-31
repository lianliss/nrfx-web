import './LoadingMore.less';

import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../ui';

export default function LoadingMore({ status }) {
  let cont;
  if (status === 'loading') {
    cont = <div className="LoadingStatus__spinner LoadingMore__loader" />;
  } else {
    cont = <UI.Button>{status === 'failed' ? 'Network Error. Retry' : 'More'}</UI.Button>;
  }

  return (
    <div className="LoadingMore">
      {cont}
    </div>
  )
}

LoadingMore.propTypes = {
  status: PropTypes.oneOf(['loading', 'failed', ''])
};
