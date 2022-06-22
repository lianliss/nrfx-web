import React from 'react';
import PropTypes from 'prop-types';
import { classNames as cn } from 'src/utils/index';

import './WalletsListItem.less';

function WalletsListItem({
  icon,
  startTexts,
  endTexts,
  controls,
  border,
  onClick,
  type,
}) {
  const className = cn({ WalletsListItem: true, border, onClick });

  return (
    <div className={className} onClick={onClick}>
      {icon && (
        <div className="WalletsListItem__column">
          <div className="WalletsListItem__icon">{icon}</div>
        </div>
      )}
      <div className="WalletsListItem__column">
        {type === 'default' && (
          <>
            <p className="WalletsListItem__text-medium">{startTexts[0]}</p>
            <p className="WalletsListItem__text-large">{startTexts[1]}</p>
          </>
        )}
        {type === 'reverse' && (
          <>
            <p className="WalletsListItem__text-large">{startTexts[0]}</p>
            <p className="WalletsListItem__text-medium">{startTexts[1]}</p>
          </>
        )}
      </div>
      <div className="WalletsListItem__column">
        {controls ? (
          controls
        ) : (
          <>
            {type === 'default' && (
              <>
                <p className="WalletsListItem__text-medium">{endTexts[0]}</p>
                <p className="WalletsListItem__text-large">{endTexts[1]}</p>
              </>
            )}
            {type === 'reverse' && (
              <>
                <p className="WalletsListItem__text-large">{endTexts[0]}</p>
                <p className="WalletsListItem__text-medium">{endTexts[1]}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

WalletsListItem.propTypes = {
  startTexts: PropTypes.array,
  endTexts: PropTypes.array,
  onClick: PropTypes.func,
  border: PropTypes.bool,
  type: PropTypes.string,
};

WalletsListItem.defaultProps = {
  icon: null,
  controls: null,
  border: false,
  startTexts: ['', ''],
  endTexts: ['', ''],
  onClick: () => {},
  type: 'default',
};

export default WalletsListItem;
