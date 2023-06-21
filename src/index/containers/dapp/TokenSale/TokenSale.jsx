import React from 'react';
import _ from 'lodash';
import Web3 from 'web3/dist/web3.min.js';
import wei from 'utils/wei';

// Components
import { Web3Context } from 'services/web3Provider';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import { getLang } from "utils";
import { Form, Input, Button } from 'src/ui';
import * as toast from 'actions/toasts';
import { openStateModal } from 'src/actions';
import { DappInput } from 'dapp';

// Styles
import './TokenSale.less';

const TOKEN_PRICE = 0.1;

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

function TokenSale() {

  const context = React.useContext(Web3Context);
  const {
    tokens, getTokenContract, network, transaction,
    isConnected, connectWallet, chainId, getTransactionReceipt,
    getBSCScanLink, addTokenToWallet, accountAddress,
    getFiatsArray,
  } = context;
  const [value, setValue] = React.useState('0');
  const [allowance, setAllowance] = React.useState(0);
  const [errorText, setErrorText] = React.useState('');
  const [isApproving, setIsApproving] = React.useState(false);
  const [isDeposit, setIsDeposit] = React.useState(false);

  const onChange = event => {
    let value = event.target.value;
    value = value.replace(',', '.');
    if (!_.isNaN(Number(value)) || value === '.') {
      setValue(value);
    }
  };

  const amount = Number(value) || 0;
  const busdAmount = amount;
  const isAvailable = allowance >= busdAmount && busdAmount;

  const addToken = () => {
    addTokenToWallet(tokens.find(t => t.symbol === 'NRFX'));
  };

  const onApprove = async () => {
    if (isApproving) return;
    setIsApproving(true);
    const token = getFiatsArray().find(t => t.symbol === 'CAD');
    const contract = getTokenContract(token);
    try {
      await contract.approve(network.contractAddresses.cadSwap, busdAmount);
      setAllowance(busdAmount);
      setErrorText('');
    } catch (error) {
      contract.stopWaiting();
      console.error('[onApprove]', error);
      setErrorText(processError(error));
    }
    setIsApproving(false);
  };

  const onBuyTokens = async () => {
    setIsDeposit(true);
    setErrorText('');
    const web3 = new Web3(window.ethereum);
    const contract = new (web3.eth.Contract)(
      [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"SetPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"CADamount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"NRFXamount","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"NRFXamount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"CAD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NRFX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"inputAmount","type":"uint256"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawNRFX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawNRFX","outputs":[],"stateMutability":"nonpayable","type":"function"}],
      network.contractAddresses.cadSwap,
    );
    try {
      const txHash = await transaction(contract, 'swap', [wei.to(wei.bn(amount), 6)]);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[onBuyTokens]', txHash, receipt);
      setValue('0');
      openStateModal('transaction_submitted', {
        txLink: getBSCScanLink(txHash),
        symbol: `NRFX`,
        addToken,
      });
    } catch (error) {
      console.error('[onBuyTokens]', error);
      setErrorText(processError(error));
    }
    setIsDeposit(false);
  };
  
  React.useEffect(() => {
    (async() => {
      try {
        const token = getFiatsArray().find(t => t.symbol === 'CAD');
        const contract = getTokenContract(token);
        const allowance = await contract.getAllowance(network.contractAddresses.cadSwap);
        console.log('Allowance', allowance);
        setAllowance(allowance);
      } catch (error) {
        console.error('setAllowance', error);
      }
    })()
  }, [isConnected, accountAddress, chainId]);

  return (
    <div className="TokenSale__wrap">
      <CabinetBlock className="TokenSale">
        <Form>
          <SVG src={require('src/asset/logo/narfex-icon.svg')} />
          <h3>{chainId === 97 ? 'Testnet' : ''} Token Sale</h3>
          <label>
            <p>
              <span>CAD Amount</span>
              <small>1 CAD = {1 / TOKEN_PRICE} NRFX</small>
            </p>
            <DappInput
              type="number"
              disabled={isDeposit}
              inputMode="decimal"
              value={value}
              onChange={setValue}
              indicator="CAD"
              decimals={6}
            />
          </label>
          {isConnected ? <>
          <Button type={isAvailable ? 'secondary' : 'lightBlue'}
                  onClick={onApprove}
                  disabled={!amount || isAvailable}
                  state={isApproving ? 'loading' : ''}>
            Approve {amount.toFixed(2)} CAD
          </Button>
          <Button type={!isAvailable ? 'secondary' : 'lightBlue'}
                  onClick={onBuyTokens}
                  disabled={!isAvailable}
                  state={isDeposit ? 'loading' : ''}>
            Buy Tokens
          </Button>
          </> : <>
          <Button type={'lightBlue'}
                  onClick={() => connectWallet()}>
            <SVG src={require('src/asset/token/wallet.svg')} />
            {getLang('dex_button_connect_wallet')}
          </Button>
          </>}
          {!!errorText.length && <div className="TokenSale__error">
            {errorText}
          </div>}
        </Form>
      </CabinetBlock>
    </div>
  );
}

export default TokenSale;
