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
import SVG from 'utils/svg-wrap';

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
  onStake,
}) {
  // States
  const [isActive, setIsActive] = React.useState(false);
  const [type, setType] = React.useState('connect');

  // Components
  const Indicator = ({ type, text }) => (
    <div className={`FarmingTableItem__indicator ${type}`}>{text}</div>
  );

  const QuestionAPY = () => (
    <p>
      Налог — обязательный, индивидуально безвозмездный платёж, взимаемый с
      организаций и физических лиц в форме отчуждения принадлежащих им на праве
      собственности средств, в целях финансового обеспечения деятельности
      государства и муниципальных образований.
    </p>
  );

  // Handlers
  const handleActive = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleTypeChange = (nextType) => {
    setType(nextType);
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
            <Indicator
              type={indicator === 'hot' ? 'red' : 'green'}
              text={indicator === 'hot' ? 'Hot' : 'Latest'}
            />
          </span>
        </TableColumn>
        <TableColumn>
          <DoubleWallets
            first={currencies[0]}
            second={currencies.length === 2 && currencies[1]}
          />
        </TableColumn>
        <TableColumn>
          <NumberFormat number={apy} percent />
          <HoverPopup content={<QuestionAPY />}>
            <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
          </HoverPopup>
        </TableColumn>
        <TableColumn>
          <NumberFormat number={arp} percent />
          <span>
            <SVG src={require('src/asset/icons/cabinet/calculator-icon.svg')} />
          </span>
        </TableColumn>
        <TableColumn>
          $<NumberFormat number={liquidity} />
          <span>
            <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
          </span>
        </TableColumn>
        <TableColumn>—</TableColumn>
        <TableColumn>
          Pair info
          <span>
            <SVG src={require('src/asset/icons/export.svg')} />
          </span>
        </TableColumn>
        <TableColumn className="details">
          {isActive ? 'hide' : 'details'}
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
          onStake={onStake}
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
