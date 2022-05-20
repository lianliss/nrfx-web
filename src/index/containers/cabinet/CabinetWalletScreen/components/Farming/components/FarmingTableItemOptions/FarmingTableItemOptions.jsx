import React from 'react';
import PropTypes from 'prop-types';

// Components
import { TableCell, TableColumn, Button, NumberFormat } from 'src/ui';
import { classNames as cn } from 'src/utils/index';
import SVG from 'utils/svg-wrap';

// Styles
import './FarmingTableItemOptions.less';

function FarmingTableItemOptions({
  id,
  type,
  handleTypeChange,
  currency,
  aviable,
  staked,
  earned,
  onStake,
}) {
  // States
  const [isVisible, setIsVisible] = React.useState(false);

  // Actions
  React.useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    });
  }, []);

  // Components
  const DoubleText = ({ title, currency, first, second }) => (
    <div className="FarmingTableItem__doubleText">
      <span>
        {title} {currency.toUpperCase()}
      </span>
      <p>
        <span>
          <NumberFormat number={first} currency={currency} />
        </span>
        &nbsp;/&nbsp;
        <span>
          $<NumberFormat number={second} />
        </span>
      </p>
    </div>
  );

  // Handlers
  const handleOnStake = () => {
    // onStake from FarmingTable whitch open modal.
    onStake(id, currency);
  };

  return (
    <>
      <TableCell className={cn('FarmingTableItem', 'options', { isVisible })}>
        <TableColumn>
          <Button type="light">
            <SVG src={require('src/asset/icons/cabinet/add-icon.svg')} />
            Get LP
          </Button>
        </TableColumn>
        <TableColumn>
          <DoubleText
            first={aviable[0]}
            second={aviable[1]}
            currency={currency}
            title="Aviable"
          />
        </TableColumn>
        <TableColumn colspan={2}>
          {type === 'connect' && (
            <>
              <Button
                type="lightBlue"
                onClick={() => handleTypeChange('stake')}
                style={{ width: '100%' }}
              >
                Connect Wallet
              </Button>
            </>
          )}
          {type === 'stake' && (
            <>
              <Button
                type="lightBlue"
                onClick={handleOnStake}
                style={{ width: '100%' }}
              >
                Stake
              </Button>
            </>
          )}
          {type === 'staked' && (
            <>
              <Button type="lightBlue" className="stake">
                Stake
              </Button>
              <Button
                type="dark"
                onClick={() => handleTypeChange('connect')}
                className="unstake"
              >
                Unstake
              </Button>
            </>
          )}
        </TableColumn>
        <TableColumn>
          <DoubleText
            first={staked[0]}
            second={staked[1]}
            currency={currency}
            title="Staked"
          />
        </TableColumn>
        <TableColumn style={{ maxWidth: 110 }}>
          <Button type="green-light" disabled={type !== 'staked'}>
            Harvest
          </Button>
        </TableColumn>
        <TableColumn colspan={2}>
          <DoubleText
            first={earned[0]}
            second={earned[1]}
            currency={currency}
            title="Earned"
          />
        </TableColumn>
      </TableCell>
      <TableCell>
        <TableColumn className="FarmingTableItem__separator" />
      </TableCell>
    </>
  );
}

FarmingTableItemOptions.defaultProps = {
  currency: '',
  type: 'connect',
  aviable: [0, 0],
  staked: [0, 0],
  earned: [0, 0],
  handleTypeChange: () => {},
};

FarmingTableItemOptions.propTypes = {
  currency: PropTypes.string,
  type: PropTypes.string,
  aviable: PropTypes.arrayOf(PropTypes.number),
  staked: PropTypes.arrayOf(PropTypes.number),
  earned: PropTypes.arrayOf(PropTypes.number),
  handleTypeChange: PropTypes.func,
};

export default FarmingTableItemOptions;
