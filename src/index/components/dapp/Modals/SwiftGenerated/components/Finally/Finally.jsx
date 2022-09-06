import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './Finally.less';

function Finally() {
  return (
    <div className="SwiftGenerated__finally">
      <SVG src={require('src/asset/icons/transaction/great.svg')} />
      <h3>Great!</h3>
      <p className="SwiftGenerated__finally__subtitle">
        The application is closed.
      </p>
    </div>
  );
}

export default Finally;
