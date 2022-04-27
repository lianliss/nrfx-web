import React from 'react';
import PropTypes from 'prop-types';
import { classNames as cn } from 'src/utils/index';

import SVG from 'utils/svg-wrap';

import './WalletsListItem.less';

function WalletsListItem({
  icon,
  startTexts,
  endTexts,
  controls,
  border,
  onClick,
  type,
  total,
}) {
  const className = cn({ WalletsListItem: true, border });

  return (
    <li className={className} onClick={onClick}>
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
            <p className="WalletsListItem__text-large">
              {(type === 'up' || type === 'down') && (
                <span className={'WalletsListItem__total ' + type}>
                  <span className='WalletsListItem__total-container'>
                    <SVG
                      src={require('src/asset/icons/total-arrow.svg')}
                    />
                    {total}%
                  </span>
                </span>
              )}
              {endTexts[1]}
            </p>
          </>
        )}
      </div>
    </li>
  );
}

WalletsListItem.propTypes = {
  startTexts: PropTypes.array,
  endTexts: PropTypes.array,
  onClick: PropTypes.func,
  border: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'up', 'down']),
  total: PropTypes.number,
};

WalletsListItem.defaultProps = {
  icon: null,
  controls: null,
  border: false,
  startTexts: ['', ''],
  endTexts: ['', ''],
  onClick: () => {},
  type: 'default',
  total: null,
};

export default WalletsListItem;
