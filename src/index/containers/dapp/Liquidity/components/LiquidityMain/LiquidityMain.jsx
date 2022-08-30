import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router5';
import { Web3Context } from 'services/web3Provider';
import { getLang } from 'src/utils';

// Components
import { Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import LiquidityList from '../LiquidityList/LiquidityList';

// Constants
import { FARMING } from 'src/index/constants/pages';

// Styles
import './LiquidityMain.less';

// Main
function LiquidityMain({
  onAddClick,
  onRemoveClick,
  onImportClick,
  poolsList,
}) {
  const context = React.useContext(Web3Context);
  const { isConnected, connectWallet } = context;

  return (
    <>
      {!!isConnected ? (
        <>
          <div className="Liquidity__header">
            <div className="Liquidity__title">
              {getLang('dapp_liquidity_main_title')}
            </div>
            <p className="default-text">
              {getLang('dapp_liquidity_main_subtitle')}
            </p>
            <Button
              type="lightBlue"
              size="extra_large"
              onClick={() => onAddClick()}
            >
              {getLang('dapp_liquidity_main_add_liquidity_button')}&nbsp;
              <span>+</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="Liquidity__header">
          <div className="Liquidity__title">
            {getLang('dapp_liquidity_main_title')}
          </div>
          <Button
            type="lightBlue"
            size="extra_large"
            onClick={() => connectWallet()}
          >
            {getLang('dapp_global_connect_wallet')}
          </Button>
        </div>
      )}
      <div className="Liquidity__body">
        <div className="Liquidity__subtitle">
          <span>{getLang('dapp_liquidity_your_liquidity')}</span>
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </div>
        <LiquidityList
          onAddClick={onAddClick}
          onRemoveClick={onRemoveClick}
          poolsList={poolsList}
          emptyText={
            isConnected
              ? 'dapp_liquidity_list_no_liquidity'
              : 'dapp_liquidity_list_no_connect'
          }
        />
      </div>
      <div className="Liquidity__footer">
        <p className="default-text">
          {getLang('dapp_liquidity_main_import_description')}&nbsp;
          <a onClick={() => onImportClick()}>
            {getLang('dapp_global_import_it')}.
          </a>
        </p>
        <p className="default-text">
          {getLang('dapp_liquidity_main_farming_description')}&nbsp;
          <Link routeName={FARMING}>{getLang('dapp_global_link_here').toLowerCase()}.</Link>
        </p>
      </div>
    </>
  );
}

LiquidityMain.propTypes = {
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

LiquidityMain.defaultProps = {
  onAddClick: () => {},
  onRemoveClick: () => {},
};

export default LiquidityMain;
