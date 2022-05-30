import React from 'react';
import PropTypes from 'prop-types';

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

function FarmingTableItem({
  dark,
  id,
  indicator,
  currencies,
  apy,
  arp,
  liquidity,
  aviable,
  staked,
  earned,
}) {
  // States
  const [isActive, setIsActive] = React.useState(false);
  const [type, setType] = React.useState('connect');

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

  // Set current options way
  // const types = ["connect", "stake", "staked"]
  // @param oneOf(types) nextType - Options Type
  const handleTypeChange = (nextType) => {
    setType(nextType);
  };

  const handleRoiOpen = (e) => {
    e.stopPropagation();

    openModal('farming_roi');
  };

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
            first={currencies[0]}
            second={currencies.length === 2 ? currencies[1] : ''}
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
          $<NumberFormat number={liquidity} />
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
          aviable={aviable}
          staked={staked}
          earned={earned}
          type={type}
          currency={currencies[1] ? currencies[1] : currencies[0]}
          handleTypeChange={handleTypeChange}
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
  aviable: [0, 0],
  staked: [0, 0],
  earned: [0, 0],
};

FarmingTableItem.propTypes = {
  dark: PropTypes.bool,
  id: PropTypes.number,
  indicator: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  apy: PropTypes.number,
  arp: PropTypes.number,
  liquidity: PropTypes.number,
  aviable: PropTypes.arrayOf(PropTypes.number),
  staked: PropTypes.arrayOf(PropTypes.number),
  earned: PropTypes.arrayOf(PropTypes.number),
};

export default FarmingTableItem;
