import React from 'react';
import PropTypes from 'prop-types';
import router from 'src/router';
import { useDispatch } from 'react-redux';

// Components
import { TableCell, TableColumn, Button, NumberFormat } from 'src/ui';
import { classNames as cn } from 'src/utils/index';
import SVG from 'utils/svg-wrap';
import { LIQUIDITY } from 'src/index/constants/pages';

// Utils
import { openModal } from 'src/actions';
import { toastPush } from 'src/actions/toasts';

// Styles
import './FarmingTableItemOptions.less';

// Main
function FarmingTableItemOptions({
  id,
  type,
  handleTypeChange,
  currency,
  aviable,
  staked,
  earned,
}) {
  const dispatch = useDispatch();
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
          <Button type="light" onClick={() => router.navigate(LIQUIDITY)}>
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
                onClick={() => {
                  openModal('stake', {}, { id, currency });
                  handleTypeChange('staked');
                }}
                style={{ width: '100%' }}
              >
                Stake
              </Button>
            </>
          )}
          {type === 'staked' && (
            <>
              <Button
                type="lightBlue"
                className="stake"
                onClick={() => {
                  openModal('stake', {}, { id, currency });
                  handleTypeChange('staked');
                }}
              >
                Stake
              </Button>
              <Button
                type="dark"
                onClick={() => {
                  openModal('unstake', {}, { id, currency });
                  handleTypeChange('stake');
                }}
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
          <Button
            type="green-light"
            disabled={type !== 'staked'}
            onClick={() => dispatch(toastPush('Harwest 0,55 BNB', 'farming'))}
          >
            Harvest
          </Button>
        </TableColumn>
        <TableColumn colspan={3}>
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
