import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import web3Backend from 'services/web3-backend';
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import { getLang } from "src/utils";
import * as actions from "src/actions";
import {setWithdraw} from "src/actions/dapp/withdraw";
import {setInvoice} from "src/actions/dapp/wallet";

// Components
import SVG from 'utils/svg-wrap';
import { ContentBox, Button, Timer, BankLogo, Input } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import Lang from "src/components/Lang/Lang";
import DexSwapInput from 'src/index/containers/dapp/DexSwap/components/DexSwapInput/DexSwapInput';
import limits from 'src/index/constants/fiats';
import * as toast from "src/actions/toasts";

// Styles
import './ExchangerTopup.less';

const SVGContainer = ({ icon }) => {
  return (
    <div className={`${icon} ExchangerTopup__bg-icon`}>
      <SVG src={require(`asset/backgrounds/${icon}.svg`)} />
    </div>
  );
};

let invoiceTimeout;

function ExchangerTopup(props) {

  const dispatch = useDispatch();
  const isAdaptive = useSelector(adaptiveSelector);
  const rates = useSelector(web3RatesSelector);
  const withdrawBanks = useSelector(state => _.get(state, 'dapp.withdraw.banks', {}));
  const commissions = useSelector(state => _.get(state, 'web3.commissions', {}));
  const context = React.useContext(Web3Context);
  const {
    connectWallet, isConnected, addTokenToWallet,
    tokens, loadAccountBalances, exchange,
    getInvoice, cancelInvoice,
  } = context;
  const {
    fiats, fiat, coins, coin,
    setFiat, setCoin,
    reservation, setReservation
  } = props;
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const [isSelectCoin, setIsSelectCoin] = React.useState(false);

  // Symbols
  const fiatSymbol = _.get(fiat, 'symbol', '');
  const coinSymbol = _.get(coin, 'symbol', '');

  const isFiat = _.get(fiat, 'isFiat', false);

  const currentWithdrawBanks = _.get(withdrawBanks, fiatSymbol, []);

  const invoice = useSelector(state => _.get(state, `dapp.invoices.${fiatSymbol}`));

  const updateInvoice = async () => {
    try {
      if (isConnected && _.includes(['USD', 'CNY'], fiatSymbol)) {
        const newInvoice = await getInvoice(fiatSymbol);
        if (newInvoice) {
          if (_.get(invoice, 'id') !== newInvoice.id) {
            const invoiceObject = {};
            invoiceObject[fiatSymbol] = newInvoice;
            dispatch(setInvoice(invoiceObject));
          }
        } else {
          const invoiceObject = {};
          invoiceObject[fiatSymbol] = null;
          dispatch(setInvoice(invoiceObject));
        }
      }
    } catch (error) {

    }
    invoiceTimeout = setTimeout(updateInvoice, 4000);
  };
  React.useEffect(() => {
    clearTimeout(invoiceTimeout);
    updateInvoice();
  }, [fiatSymbol]);

  // Fiat price
  const fiatBalance = wei.from(_.get(fiat, 'balance', "0"));
  const fiatPrice = _.get(rates, fiatSymbol.toLowerCase(), 0);

  // Calculate coin price
  let coinPrice;
  switch (coinSymbol) {
    case 'NRFX': coinPrice = _.get(rates, 'nrfx', 0); break;
    case 'USDT': coinPrice = 1; break;
    default: coinPrice = _.get(rates, `${coinSymbol}USDT`, 0);
  }

  const limits = props.limits.find(l => l.coin === coinSymbol);
  const minCoinAmount = Math.max(_.get(limits, 'min', 0), 20 / coinPrice);
  const maxCoinAmount = _.get(limits, 'max', Infinity);

  // Fiat input value
  const [fiatValue, setFiatValue] = React.useState(null);

  // Calculate amount
  const commission = (Number(_.get(commissions, `${coinSymbol.toLowerCase()}`, commissions.default)) || 0) / 100;
  const rate = fiatPrice / coinPrice;
  const fiatAmount = Number(fiatValue) || 0;
  const coinAmount = fiatAmount * rate * (1 - commission);
  const rateDisplay = 1 / rate / (1 - commission);

  // Button availability
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingTime, setProcessingTime] = React.useState(false);
  const isAvailable = coinAmount >= minCoinAmount
    && coinAmount <= maxCoinAmount
    && fiatBalance >= fiatAmount;

  function topUp() {
    if (reservation) {
      actions.openModal("deposit_choose_bank", {
        currency: fiatSymbol,
      });
    } else {
      actions.openModal("deposit_balance", {
        currency: fiatSymbol,
        amount: fiatAmount,
        type: 'refill'
      });
    }
  }

  function withdrawal() {
    actions.openModal("deposit_balance", {
      currency: fiatSymbol,
      amount: fiatAmount,
      type: 'withdrawal'
    });
  }

  const swapTokens = async () => {
    setIsProcessing(true);
    setProcessingTime(Date.now() + 60000 * 5);
    try {
      const result = await exchange(fiatSymbol, coinSymbol, fiatAmount);
      console.log('[swapTokens]', result);
      toast.success('Exchange confirmed');
    } catch (error) {
      console.error('[swapTokens]', error);
      toast.error(_.get(error, 'data.message', error.message));
    }
    setIsProcessing(false);
    setProcessingTime(null);
  };

  const onCancelInvoice = async () => {
    try {
      await cancelInvoice(fiatSymbol);
      toast.success('Invoice cancelled');
      setInvoice(null);
    } catch (error) {
      console.error('[onCancelInvoice]', error);
      toast.error(error.message);
    }
  };

  const onDownloadInvoice = async () => {
    actions.openModal("swift_generated", {
      currency: fiatSymbol,
    });
  };

  React.useEffect(() => {
    web3Backend.getWithdrawBanks()
      .then(withdrawBanks => {
        dispatch(setWithdraw({
          banks: withdrawBanks,
        }))
      }).catch(error => {
        console.error('[getWithdrawBanks]', error);
      });
  }, []);

  let buttons = <Button type="secondary" onClick={() => actions.openModal('connect_to_wallet')}>
    {getLang('dapp_global_connect_wallet')}
  </Button>;

  if (isConnected) {
    if (!!reservation) {
      buttons = <>
      {(reservation.status !== 'wait_for_review' && reservation.status !== 'wait_for_admin_review')
        ? <Timer
          hiddenAfterFinish
          onFinish={() => setReservation(null)}
          time={reservation.book_expiration * 1000}
        />
        : <span className="ExchangerTopup__waiting">{getLang('dapp_global_waiting_for_confirmation')}</span>}
      <Button type="secondary" onClick={topUp}>
        {getLang('dapp_global_view_details')}
      </Button>
      </>
    } else {
      if (invoice) {
        buttons = <div className="ExchangerTopup__actions-buttons">
          <Button type="secondary" onClick={onCancelInvoice}>
            Cancel
          </Button>
          <Button type="secondary" onClick={onDownloadInvoice}>
            {invoice.status === 'wait_for_review'
              ? 'Under Review'
              : 'Get Invoice'}
          </Button>
        </div>;
      } else {
        buttons = (
          <>
            <Button type="secondary" onClick={topUp}>
              {getLang('topup_button')}
            </Button>
            <Button type="secondary" disabled={!currentWithdrawBanks.length} onClick={withdrawal}>
              {getLang('global_withdrawal')}
              {!currentWithdrawBanks.length && <><br/>(coming soon)</>}
            </Button>
          </>
        )
      }
    }
  }

  return (
    <ContentBox className={`ExchangerTopup ${isAdaptive && 'adaptive'}`}>
      {!isAdaptive && <SVGContainer icon="exchanger-topup" />}
      <div className="ExchangerTopup__info">
        <div className="ExchangerTopup__info-label">
          {getLang('dapp_global_your_balance')}:
        </div>
        <div className={`ExchangerTopup__info-balance ${isConnected && 'active'}`}
             onClick={() => isConnected && addTokenToWallet(fiat)}>
          {getFinePrice(fiatBalance)} {fiatSymbol}
        </div>
      </div>
      <div className="ExchangerTopup__actions">
        {isFiat && buttons}
      </div>
    </ContentBox>
  )

}

export default ExchangerTopup;
