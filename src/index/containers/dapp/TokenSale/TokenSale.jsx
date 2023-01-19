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

// Styles
import './TokenSale.less';

const TOKEN_PRICE = 0.4;
const CHAIN_HEX = '0x61';

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
    getBSCScanLink, addTokenToWallet,
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
    const token = tokens.find(t => t.symbol === 'BUSD');
    const contract = getTokenContract(token);
    try {
      await contract.approve(network.contractAddresses.tokenSale, busdAmount);
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
      require('src/index/constants/ABI/TokenSale'),
      network.contractAddresses.tokenSale,
    );
    try {
      const txHash = await transaction(contract, 'buy', [wei.to(wei.bn(amount), 18)]);
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

  // // Change the chain
  // React.useEffect(() => {
  //   if (!isConnected) return;
  //   if (window.ethereum.chainId === CHAIN_HEX) return;
  //
  //   window.ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: '0x61' }],
  //   });
  // }, [isConnected, chainId]);

  return (
    <div className="TokenSale__wrap">
      <CabinetBlock className="TokenSale">
        <Form>
          <SVG src={require('src/asset/logo/narfex-icon.svg')} />
          <h3>{chainId === 97 ? 'Testnet' : ''} Token Sale</h3>
          <label>
            <p>
              <span>BUSD Amount</span>
              <small>1 BUSD = {1 / TOKEN_PRICE} NRFX</small>
            </p>
            <Input value={value} onChange={onChange} disabled={isDeposit} />
          </label>
          {isConnected ? <>
          <Button type={isAvailable ? 'secondary' : 'lightBlue'}
                  onClick={onApprove}
                  disabled={!amount || isAvailable}
                  state={isApproving ? 'loading' : ''}>
            Approve {amount.toFixed(2)} BUSD
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
