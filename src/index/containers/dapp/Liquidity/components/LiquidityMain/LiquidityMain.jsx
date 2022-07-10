import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router5";

// Components
import { Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import LiquidityList from '../LiquidityList/LiquidityList';

// Constants
import { FARMING } from 'src/index/constants/pages';

// Styles
import './LiquidityMain.less';

// Main
function LiquidityMain({ items, onAddClick, onRemoveClick, onImportClick, poolsList }) {
  return (
    <>
      <div className="Liquidity__header">
        <div className="Liquidity__title">Liquidity</div>
        <p className="default-text">Add liquidity to receive LP tokens</p>
        <Button type="lightBlue" size="extra_large" onClick={() => onAddClick()}>
          Add Liquidity <span>+</span>
        </Button>
      </div>
      <div className="Liquidity__body">
        <div className="Liquidity__subtitle">
          <span>Your Liquidity</span>
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </div>
        <LiquidityList
          items={items}
          onAddClick={onAddClick}
          onRemoveClick={onRemoveClick}
          poolsList={poolsList}
        />
      </div>
      <div className="Liquidity__footer">
        <p className="default-text">
          Don't see a pool you joined? <a onClick={() => onImportClick()}>Import it.</a>
        </p>
        <p className="default-text">
          Or, if you staked your LP tokens in a farm, unstake them to see
          them&nbsp;
          <Link routeName={FARMING}>here.</Link>
        </p>
      </div>
    </>
  );
}

LiquidityMain.propTypes = {
  items: PropTypes.array,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

LiquidityMain.defaultProps = {
  items: [],
  onAddClick: () => {},
  onRemoveClick: () => {},
};

export default LiquidityMain;
