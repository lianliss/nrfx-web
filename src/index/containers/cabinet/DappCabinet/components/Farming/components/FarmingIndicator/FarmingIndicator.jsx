import React from 'react';

// Styles
import './FarmingIndicator.less';

function FarmingIndicator({ type, text }) {
  return <div className={`FarmingIndicator ${type}`}>{text}</div>;
}

export default FarmingIndicator;
