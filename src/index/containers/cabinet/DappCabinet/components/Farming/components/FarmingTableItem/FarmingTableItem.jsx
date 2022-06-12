import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import _ from 'lodash';

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

    this.state.reward = wei.from(`${_.get(props, 'pool.reward', '0')}`);
  }

  componentDidMount() {
    this._mount = true;
    this.rewardTimeout = setTimeout(this.updateRewardAmount, REWARD_UPDATE_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    const currentReward = _.get(this.props, 'pool.reward');
    if (currentReward !== _.get(prevProps, 'pool.reward')) {
      this.setState({
        reward: wei.from(currentReward || '0')
      });
    }
  }

  componentWillUnmount() {
    this._mount = false;
  }

  handleActive = () => {
    this.setState({
      isActive: !this.state.isActive,
    })
  };

  handleRoiOpen = e => {
    e.stopPropagation();

    openModal('farming_roi');
  };

  rewardTimeout = null;

  updateRewardAmount = async () => {
    const {pool} = this.props;
    const {getFarmContract, accountAddress} = this.context;
    const farm = getFarmContract();
    const data = await Promise.all([
      farm.contract.methods.getUserReward(pool.address, accountAddress).call(),
      farm.contract.methods.getIsUserCanHarvest(pool.address, accountAddress).call(),
    ]);
    const weiReward = data[0];
    const isCanHarvest = data[1];
    const reward = wei.from(weiReward);
    console.log('[updateRewardAmount]', data);
    pool.reward = reward;
    pool.isCanHarvest = isCanHarvest;
    if (this._mount) {
      this.setState({reward});
    }
    this.rewardTimeout = setTimeout(this.updateRewardAmount, REWARD_UPDATE_INTERVAL);
  };

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
    const {tokens, getFarmContract, accountAddress} = this.context;

    const QuestionAPY = () => (
      <p>
        APY is based on your one-year income if Harvest and Compound are made once
        a 14 days. Provided APY calculations depend on current APR rates.
      </p>
    );

    const token0 = tokens.find(t => t.address && t.address === pool.token0) || {...UNKNOWN_TOKEN, address: pool.token0};
    const token1 = tokens.find(t => t.address && t.address === pool.token1) || {...UNKNOWN_TOKEN, address: pool.token1};
    const poolSize = wei.from(pool.size);

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
          <NumberFormat number={arp} percent />
          <span onClick={this.handleRoiOpen.bind(this)}>
            <SVG
              src={require('src/asset/icons/cabinet/calculator-icon.svg')}
              className="FarmingTableItem__action_icon"
            />
          </span>
        </TableColumn>
        <TableColumn>
          {!!poolSize ? `${getFinePrice(poolSize)}` : '—'}
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

export default FarmingTableItem;
