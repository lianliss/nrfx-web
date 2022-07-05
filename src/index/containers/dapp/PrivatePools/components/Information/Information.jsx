import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';

// Components
import * as UI from 'src/ui';
import LoadingStatus from "src/index/components/cabinet/LoadingStatus/LoadingStatus";

// Utils
import { steps } from '../../constants/steps';
import wei from 'utils/wei';

// Styles
import './Information.less';

const processError = error => {
  const {message} = error;
  try {
    if (message.indexOf('Internal JSON-RPC error.') >= 0) {
      const internal = JSON.parse(message.split('Internal JSON-RPC error.')[1]);
      return internal.message;
    } else {
      return message;
    }
  } catch (err) {
    console.log('ERRR', err);
    return message;
  }
};

class Information extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    value: '0',
    isApproving: false,
    isDeposit: false,
    allowance: 0,
    errorText: '',
    userBusdBalance: 0,
  };

  componentDidMount() {
    this._mounted = true;
    this.accountAddress = this.context.accountAddress;
    this.setInitialAllowance();
  }

  componentWillUnmount() {
    this._mounted = false;
    this.busd.stopWaiting();
  }

  componentDidUpdate() {
    if (this.context.accountAddress !== this.accountAddress) {
      this.accountAddress = this.context.accountAddress;
      this.setInitialAllowance();
    }
  }

  setInitialAllowance = async () => {
    try {
      const {tokens, getTokenContract} = this.context;
      const {poolAddress} = this.props;
      const token = tokens.find(t => t.symbol === 'BUSD');
      this.busd = getTokenContract(token);
      const data = await Promise.all([
        await this.busd.getAllowance(poolAddress),
        await this.busd.getBalance()
      ]);
      this.setState({
        allowance: data[0],
        userBusdBalance: data[1],
      });
    } catch (error) {
      console.error('[setInitialAllowance]', error);
    }
  };

  onChange = _value => {
    let value = _value;
    value = value.replace(',', '.');
    if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
      value = _.trimStart(value, '0');
    }
    if (!_.isNaN(Number(value)) || value === '.') {
      this.setState({value});
    }
  };

  onApprove = async () => {
    const {isApproving, value} = this.state;
    const {tokens, getTokenContract} = this.context;
    const {poolAddress} = this.props;

    if (isApproving) return;
    this.setState({isApproving: true});
    const token = tokens.find(t => t.symbol === 'BUSD');
    this.busd = getTokenContract(token);
    const amount = Number(value) || 0;

    try {
      await this.busd.approve(poolAddress, amount);
      await this.setInitialAllowance();
      this.setState({
        allowance: amount,
        errorText: '',
      });
    } catch (error) {
      this.busd.stopWaiting();
      console.error('[onApprove]', error);
      this.setState({errorText: processError(error)});
    }
    this.setState({isApproving: false});
  };

  onDeposit = async () => {
    const {isDeposit, value} = this.state;
    const {transaction, getContract, getTransactionReceipt} = this.context;
    const {poolAddress, loadPoolData} = this.props;
    const contract = getContract(
      require('src/index/constants/ABI/salePool'),
      poolAddress,
    );
    const amount = Number(value) || 0;

    if (isDeposit) return;
    this.setState({isDeposit: true});
    try {
      const txHash = await transaction(contract, 'depositBUSD', [wei.to(amount, 18)]);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[onDeposit]', txHash, receipt);
      this.setState({
        value: '0',
        errorText: '',
      });
      await loadPoolData();
    } catch (error) {
      console.error('[onDeposit]', error);
      this.setState({errorText: processError(error)});
    }
    this.setState({isDeposit: false});
  };


  render() {
    const {
      setStep,
      minUserAmount,
      poolBalance,
      targetAmount,
      isPoolLoading,
      userDeposit,
      userShare,
      poolAddress,
    } = this.props;
    let maxUserAmount = _.get(this.props, 'maxUserAmount', targetAmount);
    if (maxUserAmount > targetAmount) maxUserAmount = targetAmount;
    const {
      value,
      isLoading,
      isApproving,
      isDeposit,
      errorText,
      allowance,
      userBusdBalance,
    } = this.state;


    const amount = Number(value) || 0;
    const isAvailable = allowance >= amount
      && amount
      && amount <= userBusdBalance
      && amount <= maxUserAmount
      && amount >= minUserAmount;

    return (
      <div className="PrivatePools__container">
        <div className="PrivatePools__Information">
          {isPoolLoading ? <LoadingStatus status={'loading'}/> : <div className="PrivatePools__table">
            <div className="row">
              <span>Min deposit:</span>
              <span>
                <UI.NumberFormat number={minUserAmount} currency="BUSD" />
              </span>
            </div>
            <div className="row">
              <span>Max deposit:</span>
              <span>
                <UI.NumberFormat number={maxUserAmount} currency="BUSD" />
              </span>
            </div>
            <div className="row">
              <span>Your deposit:</span>
              <span>
                <UI.NumberFormat number={userDeposit} currency="BUSD" />
              </span>
            </div>
            <div className="row">
              <span>Pool balance:</span>
              <span>
                <UI.NumberFormat number={poolBalance} currency="BUSD" />
              </span>
            </div>
            <div className="row">
              <span>Target amount:</span>
              <span>
                <UI.NumberFormat number={targetAmount} currency="BUSD" />
              </span>
            </div>
            <div className="row">
              <span/>
              <span>
              <strong>
                <em>
                  <UI.NumberFormat number={1} currency="nrfx" />
                  &nbsp;=&nbsp;
                  <UI.NumberFormat number={0.4} currency="busd" />
                </em>
              </strong>
            </span>
            </div>
          </div>}
          <div className="row deposit">
            <label>
              <span>Deposit BUSD</span>
              <UI.Input
                disabled={isPoolLoading}
                type="text"
                value={value}
                onTextChange={this.onChange.bind(this)}
              />
            </label>
          </div>
          <div className="row">
            <UI.Button type={isAvailable ? 'secondary' : 'lightBlue'}
                       onClick={this.onApprove.bind(this)}
                       disabled={!amount || isAvailable}
                       state={isApproving ? 'loading' : ''}>
              Approve
            </UI.Button>
            <UI.Button type={!isAvailable ? 'secondary' : 'lightBlue'}
                       onClick={this.onDeposit.bind(this)}
                       disabled={!isAvailable}
                       state={isDeposit ? 'loading' : ''}>
              Deposit
            </UI.Button>
          </div>
          {!!errorText.length && <div className="row error">
            {errorText}
          </div>}
        </div>
        <div className="PrivatePools__footer">
          <div className="row">
            <span>Pool address</span>
            <UI.CopyText
              className="PrivatePools__address"
              text={poolAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}

Information.propTypes = {
  setStep: PropTypes.func,
};

Information.defaultProps = {
  setStep: () => {},
};

export default Information;
