import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';

// Components
import {
  TableCell,
  TableColumn,
  Button,
  NumberFormat,
  HoverPopup,
} from 'src/ui';
import DoubleWallets from 'src/index/components/cabinet/DoubleWallets/DoubleWallets';
import FarmingTableItemOptions from '../FarmingTableItemOptions/FarmingTableItemOptions';
import FarmingIndicator from '../FarmingIndicator/FarmingIndicator';
import SVG from 'utils/svg-wrap';

// Utils
import { openModal } from 'src/actions';

// Styles
import './FarmingTableItem.less';

const UNKNOWN_TOKEN = {
  name: "Unknown token",
  symbol: null,
  address: null,
  chainId: 97,
  decimals: 18,
};

function FarmingTableItem({
  dark,
  id,
  indicator,
  currencies,
  apy,
  arp,
  available,
  staked,
  earned,
  pool,
}) {
  const context = React.useContext(Web3Context);
  const {tokens} = context;
  // States
  const [isActive, setIsActive] = React.useState(false);

  const QuestionAPY = () => (
    <p>
      APY is based on your one-year income if Harvest and Compound are made once
      a 14 days. Provided APY calculations depend on current APR rates.
    </p>
  );

  // Handlers
  // Open/Close current item options.
  const handleActive = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleRoiOpen = (e) => {
    e.stopPropagation();

    openModal('farming_roi');
  };

  const token0 = tokens.find(t => t.address && t.address === pool.token0) || {...UNKNOWN_TOKEN, address: pool.token0};
  const token1 = tokens.find(t => t.address && t.address === pool.token1) || {...UNKNOWN_TOKEN, address: pool.token1};
  const poolSize = wei.from(pool.size);

  return (
    <>
      <TableCell
        className="FarmingTableItem"
        dark={dark}
        onClick={handleActive}
      >
        <TableColumn style={{ minWidth: 122 }}>
          <span>
            <FarmingIndicator
              type={indicator === 'hot' ? 'red' : 'green'}
              text={indicator === 'hot' ? 'Hot' : 'Latest'}
            />
          </span>
        </TableColumn>
        <TableColumn>
          <DoubleWallets
            first={token0}
            second={token1}
          />
        </TableColumn>
        <TableColumn>
          <NumberFormat number={apy} percent />
          <HoverPopup content={<QuestionAPY />}>
            <SVG
              src={require('src/asset/icons/cabinet/question-icon.svg')}
              className="FarmingTableItem__action_icon"
            />
          </HoverPopup>
        </TableColumn>
        <TableColumn>
          <NumberFormat number={arp} percent />
          <span onClick={handleRoiOpen}>
            <SVG
              src={require('src/asset/icons/cabinet/calculator-icon.svg')}
              className="FarmingTableItem__action_icon"
            />
          </span>
        </TableColumn>
        <TableColumn>
          <NumberFormat number={poolSize} /> LP
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </TableColumn>
        <TableColumn>—</TableColumn>
        <TableColumn className={'details' + (isActive ? ' active' : '')}>
          <span>Details</span>
          <SVG src={require('src/asset/icons/cabinet/select-arrow.svg')} />
        </TableColumn>
        <TableColumn>
          <HoverPopup
            content={
              <span>
                View contract
                <SVG
                  src={require('src/asset/icons/export.svg')}
                  style={{ marginLeft: 12 }}
                />
              </span>
            }
            className="small-popup"
            type="top"
            size="small"
            windowRight={52}
          >
            <SVG src={require('src/asset/icons/warning-blue.svg')} />
          </HoverPopup>
        </TableColumn>
      </TableCell>
      {isActive && (
        <FarmingTableItemOptions
          id={id}
          available={pool.balance}
          staked={pool.userPool}
          earned={earned}
          pool={pool}
        />
      )}
    </>
  );
}

FarmingTableItem.defaultProps = {
  dark: false,
  indicator: 'latest',
  currencies: ['', ''],
  apy: 0,
  arp: 0,
  liquidity: 0,
  available: [0, 0],
  staked: [0, 0],
  earned: [0, 0],
};

FarmingTableItem.propTypes = {
  dark: PropTypes.bool,
  id: PropTypes.any,
  indicator: PropTypes.any,
  currencies: PropTypes.any,
  apy: PropTypes.any,
  arp: PropTypes.any,
  liquidity: PropTypes.any,
  available: PropTypes.any,
  staked: PropTypes.any,
  earned: PropTypes.any,
};

export default FarmingTableItem;
