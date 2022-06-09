import React from 'react';
import PropTypes from 'prop-types';
import router from 'src/router';
import { useDispatch } from 'react-redux';
import wei from 'utils/wei';

// Components
import { TableCell, TableColumn, Button, NumberFormat } from 'src/ui';
import DoubleText from '../DoubleText/DoubleText';
import { classNames as cn } from 'src/utils/index';
import SVG from 'utils/svg-wrap';
import { LIQUIDITY } from 'src/index/constants/pages';

// Utils
import { openModal } from 'src/actions';
import { toastPush } from 'src/actions/toasts';
import { Web3Context } from 'services/web3Provider';

// Styles
import './FarmingTableItemOptions.less';

// Main
function FarmingTableItemOptions({ id, currency, available, staked, earned, pool }) {
  const dispatch = useDispatch();
  const { isConnected, connectWallet } = React.useContext(Web3Context);

  // States
  const [isVisible, setIsVisible] = React.useState(false);
  const [type, setType] = React.useState('stake');

  // Actions
  React.useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    });
  }, []);

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
            first={wei.from(available)}
            second={0}
            currency={currency}
            title="available"
          />
        </TableColumn>
        <TableColumn colspan={2}>
          {isConnected ? (
            type === 'staked' ? (
              <>
                <Button
                  type="lightBlue"
                  className="stake"
                  onClick={() => {
                    openModal('stake', {}, { id, currency });
                    setType('staked');
                  }}
                >
                  Stake
                </Button>
                <Button
                  type="dark"
                  onClick={() => {
                    openModal('unstake', {}, { id, currency });
                    setType('stake');
                  }}
                  className="unstake"
                >
                  Unstake
                </Button>
              </>
            ) : (
              <Button
                type="lightBlue"
                onClick={() => {
                  openModal('stake', {}, { id, currency });
                  setType('staked');
                }}
                style={{ width: '100%' }}
              >
                Stake
              </Button>
            )
          ) : (
            <Button
              type="lightBlue"
              onClick={connectWallet}
              style={{ width: '100%' }}
            >
              Connect Wallet
            </Button>
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
  available: [0, 0],
  staked: [0, 0],
  earned: [0, 0],
};

FarmingTableItemOptions.propTypes = {
  currency: PropTypes.string,
  available: PropTypes.any,
  staked: PropTypes.any,
  earned: PropTypes.any,
};

export default FarmingTableItemOptions;
