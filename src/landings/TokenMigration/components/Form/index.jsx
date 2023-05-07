import React from 'react';
import { Web3Context } from 'services/web3Provider';

// Components
import { Button, NumberFormat, Row } from 'ui';
import SVG from 'utils/svg-wrap';
import * as toast from 'actions/toasts';
import tokenABI from 'src/index/constants/ABI/NarfexToken3';

// Utils
import { classNames as cn, getLang } from 'utils';
import { openStateModal } from 'src/actions';
import successIcon from 'src/asset/icons/status/check_circle_success.svg';

// Styles
import './index.less';

function Form() {
  const context = React.useContext(Web3Context);
  const {
    accountAddress,
    isConnected,
    chainId,
    getTokenContract,
    network,
    transaction,
    getBSCScanLink,
    addTokenToWallet,
    setChain,
    getWeb3,
  } = context;
  
  const v1 = {
    address: _.get(network, 'contractAddresses.narfexToken1'),
    symbol: 'NRFX v1',
  };
  const v2 = {
    address: _.get(network, 'contractAddresses.narfexToken2'),
    symbol: 'NRFX v2',
  };
  let nrfxOld = v1;
  const nrfx = {
    address: _.get(network, 'contractAddresses.narfexToken'),
    symbol: 'NRFX',
  };
  const isEth = chainId === 1;
  
  const [allowance, setAllowance] = React.useState(0);
  const [isChecking, setIsChecking] = React.useState(true);
  const [isProcess, setIsProcess] = React.useState(true);
  const [isApproving, setIsApproving] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [old, setOld] = React.useState(v1);
  
  const isApproved = allowance >= balance && allowance;
  const isFromV2 = old.symbol === v2.symbol;
  
  React.useEffect(() => {
    console.log('USEEFFECT', chainId, isConnected, isEth, nrfxOld, nrfx, accountAddress);
    if (!isConnected || !isEth || !accountAddress) {
      setIsProcess(false);
      return;
    }
    if (!old.address) setOld(v1);
    const token1 = getTokenContract(v1);
    token1.getBalance(accountAddress).then(amount => {
      if (!amount) return;
      setBalance(amount);
      console.log('BALANCE', amount);
      token1.getAllowance(nrfx.address, accountAddress).then(allowed => {
        setAllowance(allowed);
        setIsProcess(false);
        console.log('ALLOWANCE', allowed);
        setIsChecking(false);
      }).catch(error => {
        console.error('[getAllowance]', error);
      });
    }).catch(error => {
      console.error('[getBalance]', accountAddress, error);
    });
  
    const token2 = getTokenContract(v2);
    token2.getBalance(accountAddress).then(amount => {
      if (!amount) return;
      setBalance(amount);
      setOld(v2);
      console.log('BALANCE', amount);
      token2.getAllowance(nrfx.address, accountAddress).then(allowed => {
        setAllowance(allowed);
        setIsProcess(false);
        console.log('ALLOWANCE', allowed);
        setIsChecking(false);
      }).catch(error => {
        console.error('[getAllowance]', error);
      });
    }).catch(error => {
      console.error('[getBalance]', accountAddress, error);
    });
  }, [chainId, isConnected, accountAddress]);
  
  React.useEffect(() => {
    if (isConnected && !isEth) {
      setChain(1);
    }
  }, [chainId]);
  
  const approve = async () => {
    if (isApproved) return;
    setIsApproving(true);
    if (!isConnected || !isEth) {
      toast.warning('Please connect your wallet to Ether network');
      setIsApproving(false);
      return;
    }
    console.log('old', old, v1, v2);
    const oldToken = getTokenContract(old);
    try {
      const maxApprove = 10**9;
      setIsApproving(true);
      await oldToken.approve(nrfx.address, maxApprove > balance ? maxApprove : balance);
      setAllowance(maxApprove);
    } catch (error) {
      console.error('[approve]', error);
      oldToken.stopWaiting();
      toast.warning('Approve error');
    }
    setIsApproving(false);
  };
  
  const migrate = async () => {
    setIsProcess(true);
    if (!isConnected || !isEth) {
      toast.warning('Please connect your wallet to Ether network');
      setIsProcess(false);
      return;
    }
    
    try {
      const token = new (getWeb3().eth.Contract)(
        tokenABI,
        nrfx.address,
      );
  
      const params = [];
      if (isFromV2) {
        params.push(true);
      }
      const receipt = await transaction(token, 'migrate', params);
      openStateModal('transaction_submitted', {
        txLink: getBSCScanLink(receipt),
        symbol: 'NRFX',
        addToken: () => addTokenToWallet(nrfx.address),
      });
    } catch (error) {
      console.error('[migrate]', error);
      const message = _.get(error, 'message', '');
      let blockchainError = message.split('execution reverted: ')[1];
      if (blockchainError) {
        blockchainError = blockchainError.split('{')[0];
      }
      toast.warning(
        blockchainError || 'Migration error');
    }
    setIsProcess(false);
  };
  
  return (
    <div className={cn('TokenMigrationLanding-form', { isConnected })}>
      <div className="TokenMigrationLanding-form__content">
        <h3>{getLang('token_migration_form_title')} {old.symbol} to NRFX v2.1</h3>
        <p className="TokenMigrationLanding-form__balance">
          <NumberFormat number={Number(balance.toFixed(4))} currency={old.symbol} />
        </p>
        <p className="TokenMigrationLanding-form__description">
          {getLang('token_migration_form_description')}
        </p>
      </div>
      <div className="TokenMigrationLanding-form__buttons">
        {isConnected ? (
          <>
            <Button
              type={isApproved ? "secondary-light" : "lightBlue"}
              style={{ pointerEvents: isApproved && 'none' }}
              size="ultra_large"
              state={isApproving || isChecking ? 'loading' : ''}
              onClick={() => approve()}
            >
              <Row alignItems="center">
                <span className="blue">
                  {isApproving
                    ? getLang('dapp_global_approved')
                    : getLang('dapp_global_approve')}
                </span>
                <SVG src={successIcon} flex style={{ marginLeft: 5.56 }} />
              </Row>
            </Button>
            <Button type={!isApproved ? "secondary-light" : "lightBlue"}
                    state={isProcess || isChecking ? 'loading' : ''}
                    disabled={!isApproved} size="ultra_large" onClick={() => migrate()}>
              {getLang('dapp_swap_exchange')}
            </Button>
          </>
        ) : (
          <Button
            type="lightBlue"
            size="ultra_large"
            onClick={() => openStateModal('connect_to_wallet')}
          >
            {getLang('dapp_global_connect_wallet')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Form;
