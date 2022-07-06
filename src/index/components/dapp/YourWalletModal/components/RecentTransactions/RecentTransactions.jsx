import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

//Styles
import './RecentTransactions.less';

function RecentTransactions({ items }) {
  // Return null if items is empty.
  if (!items.length) {
    return null;
  }

  return (
    <div className="RecentTransactions">
      <div className="RecentTransactions__header">
        <span>Recent transactions</span>
        <span className="action-text">Clear All</span>
      </div>
      <div className="RecentTransactions__list">
        {items.map((item, index) => (
          <div className="RecentTransactions__item" key={index}>
            <p className="action-text">
              Swap 11.9 USDT for 21 NRFX
              <SVG src={require('src/asset/icons/export.svg')} />
            </p>
            <div>
              <SVG
                src={require('src/asset/icons/action/transaction-loading.svg')}
                className="loading"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RecentTransactions.propTypes = {
  items: PropTypes.array,
};

RecentTransactions.defaultProps = {
  items: [],
};

export default RecentTransactions;
