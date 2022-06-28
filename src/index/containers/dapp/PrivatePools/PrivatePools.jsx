import React from 'react';
import _ from 'lodash';
import { Web3Context } from 'services/web3Provider';

// Components
import * as UI from 'src/ui';
import CreatePool from './components/CreatePool/CreatePool';
import Information from './components/Information/Information';
import JoinThePool from './components/JoinThePool/JoinThePool';
import Unlock from './components/Unlock/Unlock';
import WhiteListed from './components/WhiteListed/WhiteListed';

// Utils
import { steps } from './constants/steps';
import wei from 'utils/wei';

// Styles
import './PrivatePools.less';

const STORAGE_POOL_KEY = 'narfex-sale-pool';

class PrivatePools extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    step: steps.main,
    poolAddress: _.get(window.localStorage, STORAGE_POOL_KEY, null),
    isPoolLoading: false,
    minUserAmount: 0,
    maxUserAmount: 0,
    poolBalance: 0,
    targetAmount: 0,
    isPoolCollected: false,
    isWhitelisted: false,
    isNarfexLocked: false,
    busdBalance: 0,
    nrfxBalance: 0,
    userShare: 0,
    userNrfxBalance: 0,
    userDeposit: 0,
    isAdmin: false,
  };

  setStep = step => this.setState({step});
  setPoolAddress = poolAddress => this.setState({poolAddress});
  updatePoolAddress = address => {
    window.localStorage.setItem(STORAGE_POOL_KEY, address);
    this.setPoolAddress(address);
  };
  deletePoolAddress = () => {
    window.localStorage.removeItem(STORAGE_POOL_KEY);
    this.setState({
      poolAddress: null,
      step: steps.main,
    });
  };
  handlePoolAddress = () => {
    const {poolAddress, isPoolCollected, isNarfexLocked, isWhitelisted, nrfxBalance} = this.state;
    if (poolAddress && poolAddress.length) {
      if (isPoolCollected) {
        if (nrfxBalance) {
          this.setStep(steps.unlock)
        } else {
          this.setStep(steps.whiteListed)
        }
      } else {
        this.setStep(steps.information)
      }
    }
  };

  loadPoolData = async () => {
    const {getContract, accountAddress} = this.context;
    const {poolAddress} = this.state;
    if (!poolAddress || !poolAddress.length) return;
    if (!this.accountAddress) return;
    const contract = getContract(
      require('src/index/constants/ABI/salePool'),
      poolAddress,
    );

    this.setState({isPoolLoading: true});
    try {
      const data = await Promise.all([
        contract.methods.getPoolData().call(),
        contract.methods.getUserData(this.accountAddress).call(),
      ]);
      console.log('[loadPoolData]', data);
      this.setState({
        isPoolLoading: false,
        minUserAmount: wei.from(data[0]._minUserDeposit),
        maxUserAmount: wei.from(data[0]._maxUserDeposit),
        poolBalance: wei.from(data[0]._busdAmount),
        targetAmount: wei.from(data[0]._maxPoolAmount),
        isPoolCollected: data[0]._isPoolCollected,
        isWhitelisted: data[0]._isWhitelisted,
        isNarfexLocked: data[0]._isNarfexLocked,
        busdBalance: wei.from(data[0]._busdBalance),
        nrfxBalance: wei.from(data[0]._nrfxBalance),
        userShare: wei.from(data[1]._share),
        userNrfxBalance: wei.from(data[1]._availableBalance),
        userDeposit: wei.from(data[1]._busdDeposit),
        isAdmin: data[1]._isOwner || data[1]._isFactoryOwner,
      })
    } catch (error) {
      console.error('[loadPoolData]', error);
      this.setState({
        isPoolLoading: false,
      });
    }
  };

  componentDidMount() {
    this._mounted = true;
    this.handlePoolAddress();
    const {poolAddress} = this.state;
    this.accountAddress = this.context.accountAddress;
    this.chainId = this.context.chainId;
    this.isConnected = this.context.isConnected;
    if (poolAddress && poolAddress.length && this.accountAddress) {
      this.loadPoolData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.poolAddress
      || !prevProps.poolAddress.length
      || (prevState.isPoolCollected !== this.state.isPoolCollected)) {
      this.handlePoolAddress();
    }
    if (prevState.poolAddress !== this.state.poolAddress
      || this.accountAddress !== this.context.accountAddress
      || this.chainId !== this.context.chainId
      || this.isConnected !== this.context.isConnected
    ) {
      this.accountAddress = this.context.accountAddress;
      this.chainId = this.context.chainId;
      this.isConnected = this.context.isConnected;
      this.loadPoolData();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {

    const {
      step, poolAddress,
      isPoolLoading,
      minUserAmount,
      maxUserAmount,
      poolBalance,
      targetAmount,
    } = this.state;
    const {
      isConnected, chainId, connectWallet,
    } = this.context;

    if (!isConnected) {
      return <div className="PrivatePools__wrap">
        <div className="PrivatePools">
          <div className="PrivatePools__form">
            <h2>
              {steps.main}
            </h2>
            <div className="row">
              <UI.Button
                type="lightBlue"
                onClick={connectWallet}
              >
                Connect wallet
              </UI.Button>
            </div>
          </div>
        </div>
      </div>
    }

    return (
      <div className="PrivatePools__wrap">
        <div className="PrivatePools">
          <div className="PrivatePools__form">
            <h2>
              {(step !== steps.main) &&<div className="PrivatePools__back" onClick={this.deletePoolAddress.bind(this)}>
                &#10094;
              </div>}
              <span>{step}</span>
            </h2>
            {step === steps.main && (
              <>
              <div className="row">
                <UI.Button
                  type="lightBlue"
                  onClick={() => this.setStep(steps.createPool)}
                >
                  Create pool
                </UI.Button>
              </div>
              <div className="row">
                <UI.Button
                  type="lightBlue"
                  onClick={() => this.setStep(steps.joinThePool)}
                >
                  Join the pool
                </UI.Button>
              </div>
              </>
            )}
            {step === steps.joinThePool && (
              <JoinThePool setStep={this.setStep.bind(this)}
                           setPoolAddress={this.updatePoolAddress.bind(this)}
                           deletePoolAddress={this.deletePoolAddress.bind(this)} />
            )}
            {step === steps.createPool && (
              <CreatePool
                setStep={this.setStep.bind(this)}
                setPoolAddress={this.updatePoolAddress.bind(this)}
                deletePoolAddress={this.deletePoolAddress.bind(this)}
                poolAddress={poolAddress}
              />
            )}
            {step === steps.information && <Information
              {...this.state}
              loadPoolData={this.loadPoolData.bind(this)}
              setStep={this.setStep.bind(this)}
              deletePoolAddress={this.deletePoolAddress.bind(this)}
              poolAddress={poolAddress} />}
            {step === steps.whiteListed && <WhiteListed
              {...this.state}
              loadPoolData={this.loadPoolData.bind(this)}
              setStep={this.setStep.bind(this)} />}
            {step === steps.unlock && <Unlock {...this.state} setStep={this.setStep.bind(this)} />}
          </div>
        </div>
      </div>
    );
  }
}

export default PrivatePools;
