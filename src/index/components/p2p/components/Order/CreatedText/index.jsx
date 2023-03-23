import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function CreatedText({ title, icon }) {
  return (
    <span className="p2p-order__created">
      <span>{title}</span>
      <SVG src={icon} flex />
    </span>
  );
}

export default CreatedText;
