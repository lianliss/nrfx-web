import React from 'react';
import { Web3Context } from 'services/web3Provider';

// Components
import { Button, NumberFormat, Row } from 'ui';
import SVG from 'utils/svg-wrap';
import * as toast from 'actions/toasts';
import tokenABI from 'src/index/constants/ABI/NarfexToken2';

// Utils
import { classNames as cn, getLang } from 'utils';
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
    connectWallet,
    setChain,
    getWeb3,
  } = context;
  
  const nrfxOld = {
    address: _.get(network, 'contractAddresses.narfexToken'),
    symbol: 'NRFX v1',
  };
  const nrfx = {
    address: _.get(network, 'contractAddresses.narfexToken2'),
    symbol: 'NRFX',
  };
  const isEth = chainId === 1;
  
  const [allowance, setAllowance] = React.useState(999999999);
  const [isProcess, setIsProcess] = React.useState(true);
  const [isApproving, setIsApproving] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  
  const isApproved = allowance >= balance;
  
  React.useEffect(() => {
    console.log('USEEFFECT', chainId, isConnected, isEth, nrfxOld, nrfx, accountAddress);
    if (!isConnected || !isEth || !accountAddress) {
      setIsProcess(false);
      return;
    }
    const oldToken = getTokenContract(nrfxOld);
  
    oldToken.getAllowance(nrfx.address, accountAddress).then(amount => {
      setAllowance(amount);
      setIsProcess(false);
      console.log('ALLOWANCE', amount);
    }).catch(error => {
      console.error('[getAllowance]', error);
    });
    oldToken.getBalance(accountAddress).then(amount => {
      setBalance(amount);
      console.log('BALANCE', amount);
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
    
    const oldToken = getTokenContract(nrfxOld);
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
  
      const receipt = await transaction(token, 'migrate', []);
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
        <h3>{getLang('token_migration_form_title')}</h3>
        <p className="TokenMigrationLanding-form__balance">
          <NumberFormat number={0.0} currency="NRFX" />
        </p>
        <p className="TokenMigrationLanding-form__description">
          {getLang('token_migration_form_description')}
        </p>
      </div>
      <div className="TokenMigrationLanding-form__buttons">
        {isConnected ? (
          <>
            <Button
              type="secondary-light"
              style={{ pointerEvents: isApproved && 'none' }}
              size="ultra_large"
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
            <Button type="lightBlue" disabled={!isApproved} size="ultra_large" onClick={() => migrate()}>
              {getLang('dapp_swap_exchange')}
            </Button>
          </>
        ) : (
          <Button type="lightBlue" size="ultra_large" onClick={() => connectWallet()}>
            {getLang('dapp_global_connect_wallet')}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Form;
