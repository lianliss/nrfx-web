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
import getFinePrice from 'utils/get-fine-price';

// Styles
import './FarmingTableItemOptions.less';

// Main
function FarmingTableItemOptions({
                                   currency, available, staked, earned, pool,
                                 }) {
  const dispatch = useDispatch();
  const { isConnected, connectWallet, getFarmContract, getBSCScanLink } = React.useContext(Web3Context);
  const [isHarvest, setIsHarvest] = React.useState(false);
  const [reward, setReward] = React.useState(earned);

  // States
  const [isVisible, setIsVisible] = React.useState(false);
  const [type, setType] = React.useState('stake');

  // Actions
  React.useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    });
  }, []);

  React.useEffect(() => {
    setReward(earned);
  }, [earned]);

  const harvest = async () => {
    setIsHarvest(true);
    try {
      const farm = getFarmContract();
      const tx = await farm.transaction('harvest', [pool.address]);
      console.log('[harvest]', tx, getBSCScanLink(tx));
      setReward(0);
      dispatch(toastPush(`Harvested ${getFinePrice(earned)} NRFX`, 'farming'))
    } catch (error) {
      console.error('[harvest]', error);
    }
    setIsHarvest(false)
  };

  const modalData = {
    pool: {...pool, contract: null}
  };

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
                    openModal('stake', {}, modalData);
                  }}
                >
                  Stake
                </Button>
                <Button
                  type="dark"
                  onClick={() => {
                    openModal('unstake', {}, modalData);
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
                  openModal('stake', {}, modalData);
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
            disabled={reward <= 0}
            onClick={harvest}
          >
            Harvest
          </Button>
        </TableColumn>
        <TableColumn colspan={3}>
          <DoubleText
            first={getFinePrice(reward)}
            second={0}
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
