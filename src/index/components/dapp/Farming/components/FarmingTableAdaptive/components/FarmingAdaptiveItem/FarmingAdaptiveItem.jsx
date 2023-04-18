import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import _ from 'lodash';
import * as roi from 'utils/roi';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';
import { getLang } from 'src/utils';

// Components
import { NumberFormat, HoverPopup } from 'src/ui';
import DoubleWallets from 'src/index/components/dapp/DoubleWallets/DoubleWallets';
import FarmingIndicator from '../../../FarmingIndicator/FarmingIndicator';
import FarmingAdaptiveItemOptions from '../FarmingAdaptiveItemOptions/FarmingAdaptiveItemOptions';
import SVG from 'utils/svg-wrap';
import getFinePrice from 'utils/get-fine-price';

import './FarmingAdaptiveItem.less';

const UNKNOWN_TOKEN = {
  name: "Unknown token",
  symbol: null,
  address: null,
  chainId: 97,
  decimals: 18,
};

const REWARD_UPDATE_INTERVAL = 10000;

class FarmingAdaptiveItem extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    isActive: false,
    reward: 0,
    pair: null,
  };

  constructor(props) {
    super(props);

    this.state.reward = wei.from(_.get(props, 'pool.reward', '0'));
  }

  componentDidMount() {
    this._mount = true;
    const {pool} = this.props;
    const {prices, getPairUSDTPrice, getReserves} = this.context;
    this.rewardTimeout = setTimeout(this.updateRewardAmount, REWARD_UPDATE_INTERVAL);
    if (typeof prices[pool.address] === 'undefined') {
      getPairUSDTPrice(pool.address);
    }
    getReserves(pool.address).then(data => {
      this.setState({pair: data[2]});
    });
  }

  componentDidUpdate(prevProps) {
    const currentReward = _.get(this.props, 'pool.reward');
    if (currentReward !== _.get(prevProps, 'pool.reward')) {
      this.setState({
        reward: wei.from(currentReward || '0')
      });
    }

    if (!this.rewardTimeout) {
      this.rewardTimeout = setTimeout(this.updateRewardAmount, REWARD_UPDATE_INTERVAL);
    }
  }

  componentWillUnmount() {
    this._mount = false;
    clearTimeout(this.rewardTimeout);
  }

  handleActive = () => {
    this.setState({
      isActive: !this.state.isActive,
    })
  };

  handleRoiOpen = e => {
    e.stopPropagation();

    openModal('farming_roi', {}, {pool: this.props.pool});
  };

  rewardTimeout = null;

  updateRewardAmount = async () => {
    const {pool} = this.props;
    const {accountAddress, farm} = this.context;
    try {
      if (!farm || !farm.contract) throw new Error('No farm');
      if (!wei.from(pool.userPool)) throw new Error('No user share');
      const data = await Promise.all([
        farm.contract.methods.getUserReward(pool.address, accountAddress).call(),
        farm.contract.methods.getIsUserCanHarvest(pool.address, accountAddress).call(),
      ]);
      const reward = data[0];
      const isCanHarvest = data[1];
      const rewardAmount = wei.from(reward);
      pool.reward = reward;
      pool.isCanHarvest = isCanHarvest;
      if (this._mount) {
        this.setState({reward: rewardAmount});
      }
    } catch (error) {

    }
    this.rewardTimeout = setTimeout(this.updateRewardAmount.bind(this), REWARD_UPDATE_INTERVAL);
  };
  
  getAPR(poolSize = 1000) {
    const {blocksPerSecond, prices} = this.context;
    const {pool, nrfxPrice} = this.props;
    // Reward per year
    const rpy = roi.getPeriodReward(
      60 * 60 * 24 * 365,
      blocksPerSecond,
      wei.from(_.get(pool, 'rewardPerBlock', '0'))
    );
    const rewardPrice = nrfxPrice || 0;
    const lpPrice = prices[pool.address] || 0;
    
    const rewardUsdt = rpy * rewardPrice;
    const poolUsdt = poolSize * lpPrice;
    
    return rewardUsdt / poolUsdt;
  }
  
  getAPY(apr) {
    const {blocksPerSecond, prices} = this.context;
    const {pool, nrfxPrice} = this.props;
    const periodSeconds = 60 * 60 * 24 * 14; // 14 days
    const yearSeconds = 60 * 60 * 24 * 365;
    const periodsPerYear = yearSeconds / periodSeconds;
    return (1 + (apr / periodsPerYear)) ** periodsPerYear - 1;
  }

  render() {
    const {
      dark,
      id,
      indicator,
      pool,
    } = this.props;
    const {isActive, reward, pair} = this.state;
    const {
      tokens, prices,
      blocksPerSecond,
    } = this.context;

    const QuestionAPY = () => (
      <p>
        {getLang('dapp_what_is_apy')}
      </p>
    );

    const token0 = tokens.find(t => t.address && t.address === pool.token0) || {...UNKNOWN_TOKEN, address: pool.token0};
    const token1 = tokens.find(t => t.address && t.address === pool.token1) || {...UNKNOWN_TOKEN, address: pool.token1};
    const poolSize = wei.from(pool.size);
    const userPoolSize = wei.from(pool.userPool || '0');
    const lpPrice = prices[pool.address] || 0;

    const pairPrice = prices[pool.address] || 0;
  
    const apr = this.getAPR(poolSize);
    const apy = this.getAPY(apr);

    return (
      <div className="FarmingAdaptiveItem" key={id}>
        <div
          className="FarmingAdaptiveItem_default"
          onClick={this.handleActive.bind(this)}
        >
          <div className="row">
            <div className="col">
              {!!pair ? <DoubleWallets
                pair={pair}
              /> : <LoadingStatus status={'loading'} />}
            </div>
            <div className="col">
              <FarmingIndicator
                type={indicator === 'hot' ? 'red' : 'green'}
                text={indicator === 'hot' ? 'Hot' : 'Latest'}
              />
            </div>
            <div className="col">
              <a href="https://docs.narfex.com/narfex/farming/functions-and-features" target="_blank">
                <SVG
                  src={require('src/asset/icons/warning-blue.svg')}
                  style={{ width: 14, height: 14 }}
                />
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="FarmingTableAdaptive__cell">
                <span className="little-title">APY</span>
                <span>
                <NumberFormat number={apy * 100} percent />
                <a href="https://docs.narfex.com/narfex/farming/functions-and-features" target="_blank">
                  <SVG
                    src={require('src/asset/icons/cabinet/question-icon.svg')}
                    className="FarmingTableAdaptive__icon-question"
                  />
                </a>
              </span>
              </div>
            </div>
            <div className="col">
              <div className="FarmingTableAdaptive__cell">
                <span className="little-title">{getLang('dapp_global_earned')}</span>
                <span>{!!reward ? getFinePrice(reward) : '—'}</span>
              </div>
            </div>
            <div className="col">
              <SVG src={require('src/asset/icons/cabinet/select-arrow.svg')} />
            </div>
          </div>
        </div>
        <div className="row">
          {isActive && (
            <FarmingAdaptiveItemOptions
              id={id}
              available={pool.balance}
              staked={pool.userPool}
              earned={reward}
              pool={pool}
              pairPrice={pairPrice}
              apr={apr}
              tokens={[
                _.get(pair, 'token0', token0),
                _.get(pair, 'token1', token1)
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

FarmingAdaptiveItem.defaultProps = {
};

FarmingAdaptiveItem.propTypes = {
};

export default connect(state => ({
  nrfxPrice: state.web3.rates.nrfx,
}), dispatch => bindActionCreators({
}, dispatch), null, {pure: true})(FarmingAdaptiveItem);
