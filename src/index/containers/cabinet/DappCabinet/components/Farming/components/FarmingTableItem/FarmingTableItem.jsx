import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import _ from 'lodash';
import * as roi from 'utils/roi';

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
import getFinePrice from 'utils/get-fine-price';

// Utils
import { openModal } from 'src/actions';

// Styles
import './FarmingTableItem.less';

const UNKNOWN_TOKEN = {
  name: "Unknown token",
  symbol: null,
  address: null,
  chainId: 97,
  decimals: 18,
};

const REWARD_UPDATE_INTERVAL = 10000;

class FarmingTableItem extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    isActive: false,
    reward: 0,
  };

  constructor(props) {
    super(props);

    this.state.reward = wei.from(_.get(props, 'pool.reward', '0'));
  }

  componentDidMount() {
    this._mount = true;
    const {pool} = this.props;
    const {prices, getPairUSDTPrice} = this.context;
    this.rewardTimeout = setTimeout(this.updateRewardAmount, REWARD_UPDATE_INTERVAL);
    if (typeof prices[pool.address] === 'undefined') {
      getPairUSDTPrice(pool.address);
    }
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
      console.log('[updateRewardAmount]', data);
      pool.reward = reward;
      pool.isCanHarvest = isCanHarvest;
      if (this._mount) {
        this.setState({reward: rewardAmount});
      }
    } catch (error) {

    }
    this.rewardTimeout = setTimeout(this.updateRewardAmount.bind(this), REWARD_UPDATE_INTERVAL);
  };

  getAPR(poolSize = wei.from(_.get(this, 'props.pool.size', '0')) || 1000) {
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
    console.log('getAPR', rewardUsdt, poolUsdt, poolSize);

    return rewardUsdt / poolUsdt;
  }

  render() {
    const {
      dark,
      id,
      indicator,
      apy,
      arp,
      pool,
    } = this.props;
    const {isActive, reward} = this.state;
    const {
      tokens, prices,
      blocksPerSecond,
    } = this.context;

    const QuestionAPY = () => (
      <p>
        APY is based on your one-year income if Harvest and Compound are made once
        a 14 days. Provided APY calculations depend on current APR rates.
      </p>
    );

    const token0 = tokens.find(t => t.address && t.address === pool.token0) || {...UNKNOWN_TOKEN, address: pool.token0};
    const token1 = tokens.find(t => t.address && t.address === pool.token1) || {...UNKNOWN_TOKEN, address: pool.token1};
    const poolSize = wei.from(pool.size);

    const pairPrice = prices[pool.address] || 0;

    const apr = this.getAPR();

    return (
      <>
      <TableCell
        className="FarmingTableItem"
        dark={dark}
        onClick={this.handleActive.bind(this)}
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
            first={token0}
            second={token1}
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
          <NumberFormat number={apr * 100} percent />
          <span onClick={this.handleRoiOpen.bind(this)}>
            <SVG
              src={require('src/asset/icons/cabinet/calculator-icon.svg')}
              className="FarmingTableItem__action_icon"
            />
          </span>
        </TableColumn>
        <TableColumn>
          {!!poolSize ? `$${getFinePrice(poolSize * pairPrice)}` : '—'}
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </TableColumn>
        <TableColumn>
          {!!reward ? `${getFinePrice(reward)} NRFX` : '—'}
        </TableColumn>
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
          available={pool.balance}
          staked={pool.userPool}
          earned={reward}
          pool={pool}
          pairPrice={pairPrice}
        />
      )}
      </>
    );
  }
}

FarmingTableItem.defaultProps = {
  dark: false,
  indicator: 'latest',
  currencies: ['', ''],
  apy: 0,
  arp: 0,
  liquidity: 0,
  available: [0, 0],
  staked: [0, 0],
  earned: [0, 0],
};

FarmingTableItem.propTypes = {
  dark: PropTypes.bool,
  id: PropTypes.any,
  indicator: PropTypes.any,
  currencies: PropTypes.any,
  apy: PropTypes.any,
  arp: PropTypes.any,
  liquidity: PropTypes.any,
  available: PropTypes.any,
  staked: PropTypes.any,
  earned: PropTypes.any,
};

export default connect(state => ({
  nrfxPrice: state.web3.rates.nrfx,
}), dispatch => bindActionCreators({
}, dispatch), null, {pure: true})(FarmingTableItem);
