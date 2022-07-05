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
    poolAddress: _.get(window.localStorage, `${STORAGE_POOL_KEY}-${this.chainId || 56}`, null),
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
    userDeposit: 0,
    userNrfxBalance: 0,
    userNrfxInSale: 0,
    poolNrfxLocked: 0,
    poolNrfxWithdrawn: 0,
    poolDeposit: 0,
    poolTenPercents: 0,
    availableToWithdraw: 0,
    isSaleEnded: false,
    isAdmin: false,
  };

  setStep = step => this.setState({step});
  setPoolAddress = poolAddress => this.setState({poolAddress});
  updatePoolAddress = address => {
    window.localStorage.setItem(`${STORAGE_POOL_KEY}-${this.chainId || 56}`, address);
    this.setPoolAddress(address);
  };
  deletePoolAddress = () => {
    window.localStorage.removeItem(`${STORAGE_POOL_KEY}-${this.chainId || 56}`);
    this.setState({
      poolAddress: null,
      step: steps.main,
    });
  };
  handlePoolAddress = () => {
    const {poolAddress, isPoolCollected, isNarfexLocked, isWhitelisted, nrfxBalance} = this.state;
    if (poolAddress && poolAddress.length) {
      if (isPoolCollected) {
        if (nrfxBalance || isNarfexLocked) {
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
    const {getContract, accountAddress, tokenSale} = this.context;
    console.log('LOAD', `${STORAGE_POOL_KEY}-${this.chainId || 56}`);
    const poolAddress = _.get(window.localStorage, `${STORAGE_POOL_KEY}-${this.chainId || 56}`, this.state.poolAddress);
    if (!poolAddress || !poolAddress.length) return;
    if (!this.accountAddress) return;
    const contract = getContract(
      require('src/index/constants/ABI/salePool'),
      poolAddress,
    );
    const saleContract = getContract(
      require('src/index/constants/ABI/TokenSale'),
      tokenSale,
    );

    this.setState({isPoolLoading: true});
    try {
      const data = await Promise.all([
        contract.methods.getPoolData().call(),
        contract.methods.getUserData(this.accountAddress).call(),
        saleContract.methods.getNextUnlockTime().call(),
        contract.methods.getUserNRFXBalance(this.accountAddress).call(),
        saleContract.methods.users(poolAddress).call(),
        saleContract.methods.isSaleEnded().call(),
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
        userDeposit: wei.from(data[1]._busdDeposit),
        availableToWithdraw: wei.from(data[3]),
        poolNrfxLocked: wei.from(data[4].narfexLocked),
        poolNrfxWithdrawn: wei.from(data[4].withdrawn),
        isAdmin: data[1]._isOwner || data[1]._isFactoryOwner,
        nextUnlock: data[2],
        isSaleEnded: data[5],
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
    this.accountAddress = this.context.accountAddress;
    this.chainId = this.context.chainId;
    this.isConnected = this.context.isConnected;
    const poolAddress = _.get(window.localStorage, `${STORAGE_POOL_KEY}-${this.chainId || 56}`, null);
    if (poolAddress && poolAddress.length && this.accountAddress) {
      this.setState({poolAddress});
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
      console.log('NEW CHAIN');
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
              <span>{step}{chainId === 97 ? ' Testnet' : ''}</span>
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
            {step === steps.unlock && <Unlock
              {...this.state}
              loadPoolData={this.loadPoolData.bind(this)}
              setStep={this.setStep.bind(this)} />}
          </div>
        </div>
      </div>
    );
  }
}

export default PrivatePools;
