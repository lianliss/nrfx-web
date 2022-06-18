import React from 'react';
import PropTypes from 'prop-types';

import './WalletsListItem.less';

function WalletsListItem({ icon, startTexts, endTexts, controls }) {
  return (
    <li className="WalletsListItem">
      {icon && <div className="WalletsListItem__column">{icon}</div>}
      <div className="WalletsListItem__column">
        <p className="WalletsListItem__text-medium">{startTexts[0]}</p>
        <p className="WalletsListItem__text-large">
          {startTexts[1].toUpperCase()}
        </p>
      </div>
      <div className="WalletsListItem__column">
        {controls ? (
          controls
        ) : (
          <>
            <p className="WalletsListItem__text-medium">{endTexts[0]}</p>
            <p className="WalletsListItem__text-large">{endTexts[1]}</p>
          </>
        )}
      </div>
    </li>
  );
}

WalletsListItem.propTypes = {
  startTexts: PropTypes.array,
  endTexts: PropTypes.array,
};

WalletsListItem.defaultProps = {
  icon: null,
  controls: null,
  startTexts: ['', ''],
  endTexts: ['', ''],
};

export default WalletsListItem;
