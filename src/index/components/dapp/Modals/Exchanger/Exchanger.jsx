import React from 'react';
import { Web3Context } from 'services/web3Provider';
import routerABI from 'src/index/constants/ABI/NarfexExchangerRouter';

// Components
import { CabinetModal, CustomButton, AnswerPopup } from 'dapp';
import { Col, Row, Button, NumberFormat } from 'ui';
import Currency from './components/Currency/Currency';
import DexDescription from 'dapp/DexDescription/DexDescription.jsx';
import ExchangeRoute from './components/ExchangeRoute/ExchangeRoute';
import ExchangerSettings from './components/ExchangerSettings/ExchangerSettings';
import SVG from 'utils/svg-wrap';

// Utils
import _ from 'lodash';
import { getLang } from 'utils';
import { useSelector } from 'react-redux';
import * as actions from "src/actions";
import { openStateModal } from 'src/actions';
import * as toast from 'actions/toasts';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';

// Styles
import './Exchanger.less';

function Exchanger({ ...props }) {
  const adaptive = useSelector((state) => state.default.adaptive);
  const context = React.useContext(Web3Context);
  const {fiat, coin, fiatAmount, coinAmount, isExactOut} = props;
  const {
    connectWallet, isConnected, addTokenToWallet,
    tokens, loadAccountBalances, exchange,
    exchangerRouter, getTokenContract,
    accountAddress,
    getTokenBalance,
    chainId,
    routerAddress,
    getWeb3,
    transaction,
    getBSCScanLink,
    network
  } = context;
  
  const [inAmount, setInAmount] = React.useState(fiatAmount);
  const [outAmount, setOutAmount] = React.useState(coinAmount);
  const [priceImpact, setPriceImpact] = React.useState(0);
  const [rate, setRate] = React.useState(coinAmount / fiatAmount);
  const [isRateReverse, setIsRateReverse] = React.useState(false);
  const [path, setPath] = React.useState([]);
  const [slippage, setSlippage] = React.useState(Number(window.localStorage.getItem('nrfx-slippage')) || 4);
  const [deadline, setDeadline] = React.useState(20);
  const [allowance, setAllowance] = React.useState(999999999);
  const [isProcess, setIsProcess] = React.useState(true);
  const [isApproving, setIsApproving] = React.useState(false);
  
  const networkName = chainId === 56 ? 'BSC' : 'Testnet BSC';
  
  React.useEffect(() => {
    if (isExactOut) {
      getTokenContract(fiat).getInAmount(coin, outAmount).then(data => {
        setInAmount(data.inAmount);
        setRate(outAmount / data.inAmount);
        setPath(data.path);
        setPriceImpact(_.get(data, 'priceImpact', 0));
      });
    } else {
      getTokenContract(fiat).getOutAmount(coin, inAmount).then(data => {
        setOutAmount(data.outAmount);
        setRate(data.outAmount / inAmount);
        setPath(data.path);
        setPriceImpact(_.get(data, 'priceImpact', 0));
      });
    }
  }, [fiatAmount, coinAmount, isExactOut]);
  
  React.useEffect(() => {
    if (fiat.isFiat) {
      setIsProcess(false);
      return;
    }
    const token = getTokenContract(fiat);
    const router = network.contractAddresses.exchangerRouter;

    token.getAllowance(router).then(allowance => {
      setAllowance(allowance);
      setIsProcess(false);
    });
  }, []);
  
  const inAmountMax = inAmount * (1 + slippage / 100);
  const outAmountMin = outAmount * (1 - slippage / 100);
  
  const priceImpactPercents = priceImpact * 100;
  let priceImpactColor = '';
  if (priceImpactPercents < 1) priceImpactColor = 'green';
  if (priceImpactPercents >= 3) priceImpactColor = 'yellow';
  if (priceImpactPercents >= 5) priceImpactColor = 'red';
  
  const isAvailable = allowance > inAmount;
  
  const approve = async () => {
    const token = getTokenContract(fiat);
    const router = network.contractAddresses.exchangerRouter;
    try {
      const maxApprove = 10**9;
      setIsApproving(true);
      await token.approve(router, inAmountMax > maxApprove ? inAmountMax : maxApprove);
      setAllowance(inAmountMax > maxApprove ? inAmountMax : maxApprove);
    } catch (error) {
      console.error('[approve]', error);
      token.stopWaiting();
      toast.warning('Approve error');
    }
    setIsApproving(false);
  };
  
  const swap = async () => {
    try {
      setIsProcess(true);
      const router = new (getWeb3().eth.Contract)(
        routerABI,
        network.contractAddresses.exchangerRouter,
      );
      
      const isFromBNB = !path[0].address
        || path[0].address.toLowerCase() ===
          network.tokens.wrapBNB.address.toLowerCase();
      let value;
      if (isFromBNB) {
        if (isExactOut) {
          value = wei.to(inAmountMax);
        } else {
          value = wei.to(inAmount);
        }
      }
      
      const receipt = await transaction(router, 'swap', [
        path.map(token => token.address),
        isExactOut,
        wei.to(isExactOut ? outAmount : inAmount),
        wei.to(isExactOut ? inAmountMax : outAmountMin),
        Math.floor(Date.now() / 1000) + deadline * 60,
        '0x0000000000000000000000000000000000000000',
      ], value);
      openStateModal('transaction_submitted', {
        txLink: getBSCScanLink(receipt),
        symbol: coin.symbol,
        addToken: () => addTokenToWallet(coin),
      });
    } catch (error) {
      console.error('[swap]', error);
      if (error.message.indexOf('Internal JSON-RPC error.') >= 0) {
        const message = error.message.split('Internal JSON-RPC error.')[1];
        try {
          const parsed = JSON.parse(message);
          toast.warning(parsed.message.split('execution reverted:')[1]);
        } catch (error) {
          toast.warning(error.message);
        }
      } else {
        toast.warning(error.message);
      }
    }
    setIsProcess(false);
  };

  const ListItem = ({ title, value }) => (
    <Row
      className="ExchangerModal-ListItem"
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="ExchangerModal-ListItem__title">{title}</div>
      <div className="ExchangerModal-ListItem__value">{value}</div>
    </Row>
  );

  const SwapButton = () => (
    <CustomButton onClick={() => setIsRateReverse(!isRateReverse)} className="swap">
      <SVG src={require('src/asset/icons/swap.svg')} />
    </CustomButton>
  );

  return (
    <CabinetModal className="ExchangerModal" closeOfRef closeButton {...props}>
      <div className="ExchangerModal__container">
        <h3>Exchange</h3>
        <Col className="ExchangerModal__Currency__container">
          <span>{getLang('dapp_exchanger_you_give')}</span>
          <Currency
            adaptive={adaptive}
            name={networkName}
            currency={fiat}
            amount={inAmount}
          />
        </Col>
        <Col className="ExchangerModal__Currency__container">
          <span>{getLang('dapp_exchanger_you_receive')}</span>
          <Currency
            adaptive={adaptive}
            name={networkName}
            currency={coin}
            amount={outAmount}
          />
        </Col>
        <div className="ExchangerModal__rate">
          <ListItem
            title={getLang('dapp_exchange_rate')}
            value={
              <>
                <span>
                  {getFinePrice(isRateReverse ? 1 / rate : rate)}
                  &nbsp;{(isRateReverse ? fiat : coin).symbol}
                  &nbsp;{getLang('dapp_global_per').toLowerCase()}
                  &nbsp;{(isRateReverse ? coin : fiat).symbol}
                </span>
                <SwapButton />
              </>
            }
          />
        </div>
        <div>
          {!isAvailable && <Button type="lightBlue"
                                   size="extra_large"
                                   onClick={() => approve()}
                                   state={isApproving ? 'loading' : ''}
                                   className="exchange">
            Approve
          </Button>}
          <Button type="lightBlue"
                  size="extra_large"
                  onClick={() => swap()}
                  disabled={!isAvailable}
                  state={isProcess ? 'loading' : ''}
                  className="exchange">
            {getLang('dapp_exchanger_exchange_button')}
          </Button>
        </div>
        <DexDescription>
          <DexDescription.Item>
            <div>
              {getLang(isExactOut ? 'dex_maximum_spend' : 'dex_minimum_receive')}
              <AnswerPopup>{getLang('dex_notice_price_movement')}</AnswerPopup>
            </div>
            <span>
              <NumberFormat number={isExactOut ? inAmountMax : outAmountMin} />
              &nbsp;{isExactOut ? fiat.symbol : coin.symbol}
            </span>
          </DexDescription.Item>
          <DexDescription.Item>
            <div>
              {getLang('dex_price_impact')}
              <AnswerPopup>{getLang('dex_price_impact_hint')}</AnswerPopup>
            </div>
            <span className={priceImpactColor}>
              <NumberFormat number={priceImpactPercents.toFixed(2)} percent />
            </span>
          </DexDescription.Item>
          {/*<DexDescription.Item>*/}
            {/*<div>*/}
              {/*{getLang('dex_trade_fee')}*/}
              {/*/!* <AnswerPopup>*/}
                {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem*/}
                {/*ipsum dolor sit amet, consectetur adipiscing elit*/}
              {/*</AnswerPopup> *!/*/}
            {/*</div>*/}
            {/*<span>$00.55 - BNB557483875475</span>*/}
          {/*</DexDescription.Item>*/}
        </DexDescription>
        <ExchangeRoute
          route={path.map(token => token.symbol)}
        />
        <ExchangerSettings
          {...{
            slippage,
            setSlippage,
            deadline,
            setDeadline,
          }}
        />
      </div>
    </CabinetModal>
  );
}

export default Exchanger;
