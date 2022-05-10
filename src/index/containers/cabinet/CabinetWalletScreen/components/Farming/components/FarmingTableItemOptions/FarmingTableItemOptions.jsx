import React from 'react';

// Components
import { TableCell, TableColumn, Button, NumberFormat } from 'src/ui';
import { classNames as cn } from 'src/utils/index';
import SVG from 'utils/svg-wrap';

// Styles
import './FarmingTableItemOptions.less';

function FarmingTableItemOptions({
  type,
  handleTypeChange,
  currency,
  aviable,
  staked,
  earned,
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
                onClick={() => handleTypeChange('staked')}
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

export default FarmingTableItemOptions;
