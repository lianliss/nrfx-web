import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import router from 'src/router';
import wei from 'utils/wei';
import _ from 'lodash';

// Components
import { Button, NumberFormat } from 'src/ui';
import DoubleText from '../../../DoubleText/DoubleText';
import SVG from 'utils/svg-wrap';

// Utils
import { Web3Context } from 'services/web3Provider';
import { openModal } from 'src/actions';
import { toastPush } from 'src/actions/toasts';
import { LIQUIDITY } from 'src/index/constants/pages';
import getFinePrice from 'utils/get-fine-price';
import { getLang } from 'src/utils';

// Styles
import './FarmingAdaptiveItemOptions.less';

function FarmingAdaptiveItemOptions({
                                      currency, available, staked, earned, pool,
                                      pairPrice, apr, tokens
                                    }) {
  const {size} = pool;
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
  const poolSize = wei.from(pool.size);

  return (
    <div className="FarmingAdaptiveItemOptions">
      <div className="row">
        <div className="col statistics">
          <div className="row">
            <div className="col little-title">ARP</div>
            <div className="col">
              <div className="row" onClick={() => openModal('farming_roi', {}, {pool})}>
                <span className="link">
                  <NumberFormat number={apr * 100} percent />
                </span>
                <SVG
                  src={require('src/asset/icons/cabinet/calculator-icon.svg')}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col little-title">Liquidity</div>
            <div className="col">
              <div className="row">
                <span className="Number">
                  $<NumberFormat number={poolSize * pairPrice} />
                </span>
                <SVG
                  src={require('src/asset/icons/cabinet/question-icon.svg')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DoubleText
            first={lpBalance}
            second={lpBalance * pairPrice}
            currency={'LP'}
            title="Available"
          />
        </div>
        <div className="col">
          <Button
            type="light"
            onClick={() => {
              router.navigate(LIQUIDITY, {
                token0: _.get(tokens[0], 'symbol'),
                token1: _.get(tokens[1], 'symbol'),
              });
            }}
            className="get-lp"
          >
            <SVG src={require('src/asset/icons/cabinet/add-icon.svg')} />
            Get LP
          </Button>
        </div>
      </div>
      <div className="row">
        {!isConnected ? (
          <>
            <Button
              type="lightBlue"
              onClick={connectWallet}
              style={{ width: '100%' }}
            >
              {getLang('dapp_global_connect_wallet')}
            </Button>
          </>
        ) : (
          <>
            <div className="col">
              <DoubleText
                first={stakedAmount}
                second={stakedAmount * pairPrice}
                currency={'LP'}
                title="Staked"
              />
            </div>
            <div className="col">
              <div className="row">
                <Button
                  type="lightBlue"
                  className="stake"
                  onClick={() => {
                    openModal('stake', {}, modalData);
                  }}
                >
                  Stake
                </Button>
                {!!stakedAmount && <Button
                  type="dark"
                  onClick={() => {
                    openModal('unstake', {}, modalData);
                  }}
                  className="unstake"
                >
                  Unstake
                </Button>}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col">
          <DoubleText
            first={getFinePrice(reward)}
            second={getFinePrice(reward * nrfxPrice)}
            currency={'NRFX'}
            title="Earned"
          />
        </div>
        <div className="col">
          <Button
            type="green-light"
            disabled={reward <= 0 || !pool.isCanHarvest}
            onClick={harvest}
            state={isHarvest ? 'loading' : ''}
          >
            Harvest
          </Button>
        </div>
      </div>
    </div>
  );
}

FarmingAdaptiveItemOptions.defaultProps = {
  currency: '',
  aviable: [0, 0],
  arp: 0,
  liquidity: 0,
  staked: [0, 0],
  earned: [0, 0],
};

FarmingAdaptiveItemOptions.propTypes = {
  currency: PropTypes.string,
  aviable: PropTypes.arrayOf(PropTypes.number),
  arp: PropTypes.number,
  liquidity: PropTypes.number,
  staked: PropTypes.arrayOf(PropTypes.number),
  earned: PropTypes.arrayOf(PropTypes.number),
};

export default FarmingAdaptiveItemOptions;
