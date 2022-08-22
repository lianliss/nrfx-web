import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Components
import SVG from 'utils/svg-wrap';
import getFinePrice from 'src/utils/get-fine-price';

//Styles
import './RecentTransactions.less';

function RecentTransactions({ items, onClear }) {
  // Return null if items is empty.
  if (!items.length) {
    return null;
  }

  return (
    <div className="RecentTransactions">
      <div className="RecentTransactions__header">
        <span>Recent transactions</span>
        <span className="action-text" onClick={onClear}>Clear All</span>
      </div>
      <div className="RecentTransactions__list">
        {_.chunk(items, 5)[0].map((item, index) => {
          const {amount0, amount1, token0, token1, txHash} = item;
          return <a target="_blank"
                    href={`https://bscscan.com/tx/${txHash}`}
                    className="RecentTransactions__item" key={index}>
            <p className="action-text">
              Swap {getFinePrice(amount0)} {token0} for {getFinePrice(amount1)} {token1}
              <SVG src={require('src/asset/icons/export.svg')} />
            </p>
            {/*<div>*/}
              {/*<SVG*/}
                {/*src={require('src/asset/icons/action/transaction-loading.svg')}*/}
                {/*className="loading"*/}
              {/*/>*/}
            {/*</div>*/}
          </a>
        })}
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
