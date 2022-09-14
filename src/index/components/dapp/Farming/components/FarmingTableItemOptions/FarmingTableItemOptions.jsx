import React from 'react';
import PropTypes from 'prop-types';
import router from 'src/router';
import { useDispatch, useSelector } from 'react-redux';
import wei from 'utils/wei';
import _ from 'lodash';

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
import { getLang } from 'src/utils';

// Styles
import './FarmingTableItemOptions.less';

// Main
function FarmingTableItemOptions({
                                   currency, available, staked, earned, pool,
                                    pairPrice, tokens
                                 }) {
  const dispatch = useDispatch();
  const {
    isConnected, connectWallet, getFarmContract, getBSCScanLink, getTransactionReceipt,
    updatePoolData,
  } = React.useContext(Web3Context);
  const [isHarvest, setIsHarvest] = React.useState(false);
  const [reward, setReward] = React.useState(earned);
  const nrfxPrice = useSelector(state => _.get(state, 'web3.rates.nrfx', 0));

  // States
  const [isVisible, setIsVisible] = React.useState(false);
  const [type, setType] = React.useState('stake');

  const stakedAmount = wei.from(staked);

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
      console.log('[harvest] tx', getBSCScanLink(tx));
      const receipt = await getTransactionReceipt(tx);
      console.log('[harvest]', receipt);
      updatePoolData(pool);
      dispatch(toastPush(`Harvested ${getFinePrice(earned)} NRFX`, 'farming'))
    } catch (error) {
      console.error('[harvest]', error);
    }
    setIsHarvest(false)
  };

  const modalData = {
    pool: {...pool, contract: null}
  };

  const lpBalance = wei.from(available);

  return (
    <>
      <TableCell className={cn('FarmingTableItem', 'options', { isVisible })}>
        <TableColumn>
          <Button
            type="light"
            onClick={() => {
              router.navigate(LIQUIDITY, {
                token0: _.get(tokens[0], 'symbol'),
                token1: _.get(tokens[1], 'symbol'),
              });
            }}
          >
            <SVG src={require('src/asset/icons/cabinet/add-icon.svg')} />
            {getLang('dapp_global_get')} LP
          </Button>
        </TableColumn>
        <TableColumn>
          <DoubleText
            first={lpBalance}
            second={lpBalance * pairPrice}
            currency={'LP'}
            title={getLang('global_available')}
          />
        </TableColumn>
        <TableColumn colspan={2}>
          {isConnected ? (
            stakedAmount ? (
              <>
                <Button
                  type="lightBlue"
                  className="stake"
                  onClick={() => {
                    openModal('stake', {}, modalData);
                  }}
                >
                  {getLang('dapp_farming_stake_button')}
                </Button>
                <Button
                  type="dark"
                  onClick={() => {
                    openModal('unstake', {}, modalData);
                  }}
                  className="unstake"
                >
                  {getLang('dapp_farming_unstake_button')}
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
                {getLang('dapp_farming_stake_button')}
              </Button>
            )
          ) : (
            <Button
              type="lightBlue"
              onClick={() => openModal('connect_to_wallet')}
              style={{ width: '100%' }}
            >
              {getLang('dapp_global_connect_wallet')}
            </Button>
          )}
        </TableColumn>
        <TableColumn>
          <DoubleText
            first={stakedAmount}
            second={stakedAmount * pairPrice}
            currency={'LP'}
            title={getLang('dapp_farming_staked')}
          />
        </TableColumn>
        <TableColumn style={{ maxWidth: 110 }}>
          <Button
            type="green-light"
            disabled={reward <= 0 || !pool.isCanHarvest}
            onClick={harvest}
            state={isHarvest ? 'loading' : ''}
          >
            {getLang('dapp_farming_harvest')}
          </Button>
        </TableColumn>
        <TableColumn colspan={3}>
          <DoubleText
            first={getFinePrice(reward)}
            second={getFinePrice(reward * nrfxPrice)}
            currency={'NRFX'}
            title={getLang('dapp_global_earned')}
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
