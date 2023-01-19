import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

// Components
import * as UI from 'src/ui/';
import DepositModal from '../../DepositModal';
import DappInput from '../../../../DappInput/DappInput';
import NumberFormat from 'src/ui/components/NumberFormat/NumberFormat';
import SVG from 'utils/svg-wrap';
import { Web3Context } from 'services/web3Provider';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import CabinetModal from '../../../CabinetModal/CabinetModal';
import {setInvoice} from "src/actions/dapp/wallet";

// Utils
import { getLang } from 'src/utils';
import router from 'src/router';
import * as actions from 'src/actions';
import * as toasts from 'src/actions/toasts';
import { fiatSelector, adaptiveSelector } from 'src/selectors';
import { closeModal } from 'src/actions';
import wei from 'src/utils/wei';
import getFinePrice from 'src/utils/get-fine-price';
import KNOWN_FIATS from 'src/index/constants/knownFiats';

// Styles
import './Balance.less';

function Balance(props) {
  const dispatch = useDispatch();
  const context = React.useContext(Web3Context);
  const {
    fiats,
    updateFiats,
    chainId,
    accountAddress,
    connectWallet,
    isConnected,
    getInvoice,
  } = context;
  const isAdaptive = useSelector(adaptiveSelector);
  const banks = useSelector((state) => state.fiat.banks);

  const userId = `${chainId}${accountAddress}`;
  const fiatTokens = _.get(fiats, userId, []);

  const [fiatSelected, setFiatSelected] = React.useState(null);
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const fiatSymbol = _.get(fiatSelected, 'symbol', '');
  const invoice = useSelector(state => _.get(state, `dapp.invoices.${fiatSymbol}`));
  
  const withdrawBanks = useSelector(state => _.get(state, `dapp.withdraw.banks.${fiatSymbol}`, []));

  /**
   * Update "fiatSelected" — fiat token state.
   * Sets router param
   * @param currencyObject {object} - fiat token
   */
  const setFiat = (currencyObject) => {
    setCurrency(currencyObject.symbol);
    setFiatSelected(currencyObject);
    const routerState = router.getState();
    if (routerState.params.currency !== currencyObject.symbol) {
      router.navigate(routerState.name, {
        ...routerState.params,
        currency: currencyObject.symbol,
      });
    }
  };

  React.useEffect(() => {
    const routerState = router.getState();
    const token = fiatTokens.find(
      (t) => t.symbol === routerState.params.currency
    );
    if (!token) return;
    setFiat(token);
  }, [fiats]);
  
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
  };
  
  React.useEffect(() => {
    updateInvoice();
  }, [fiatSymbol]);

  const { adaptive } = props;
  const { params } = router.getState();
  const [currency, setCurrency] = useState(
    params.currency.toUpperCase() || 'RUB'
  );
  const [amount, setAmount] = useState(null);
  const [touched, setTouched] = useState(null);
  const fiatState = useSelector(fiatSelector);

  // Get min and max amounts
  // of the banks.
  const getAmounts = (currency = currency) => {
    if (!_.isString(currency)) return;

    const anyBank = banks.find((b) =>
      _.includes(b.currencies, currency.toUpperCase())
    );

    const minAmount = _.get(anyBank, 'minAmount', 100);
    const maxAmount = _.get(anyBank, 'maxAmount', 150000);

    return { minAmount, maxAmount };
  }

  const checkAmount = (value = amount) => {
    const { minAmount, maxAmount } = getAmounts(currency);

    const currencyLabel = currency.toUpperCase();
    if (value < minAmount) {
      return (
        <>
          {getLang('cabinet_amount_shouldBeMore')} {minAmount} {currencyLabel}
        </>
      );
    } else if (value > maxAmount) {
      return (
        <>
          {getLang('cabinet_amount_shouldBeLess')} {maxAmount} {currencyLabel}
        </>
      );
    }
    return null;
  };
  
  const handleFiatRefill = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    }
    
    actions.openModal(
      'deposit_choose_bank',
      {
        currency: fiatSelected.symbol,
        amount,
      },
      {
        amount,
        minFee: 0,
        percentFee: 0,
        currency: fiatSelected.symbol,
      }
    );
  };

  const handleWithdraw = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    }

    actions.openModal(
      'deposit_choose_bank',
      {
        currency: fiatSelected.symbol,
        amount,
        type: 'withdrawal',
      },
      {
        amount,
        currency: fiatSelected.symbol,
      }
    );
  };

  const handleChangeAmount = (value) => {
    setAmount(parseInt(value));
    if (!value || checkAmount(value)) return false;
  };

  // get amounts of the KNOWN_FIATS.
  const getAllAmounts = () => {
    const allAmounts = KNOWN_FIATS.map((fiat) => {
      const { symbol } = fiat;
      const { minAmount, maxAmount } = getAmounts(symbol);

      return { minAmount, maxAmount, symbol };
    });

    return allAmounts;
  }

  const renderForm = () => {
    // const currencyInfo = actions.getCurrencyInfo(currency);
    // const { fee, percent_fee, min_fee } = getFee();
    // const total = props.type === 'withdrawal' ? amount + fee : amount - fee;

    function fiatSelector() {
      if (!isConnected) {
        connectWallet()
          .then(() => setIsSelectFiat(true))
          .catch((error) => {
            setIsSelectFiat(false);
          });
      } else {
        setIsSelectFiat(true);
      }
    }
    
    const { minAmount, maxAmount } = getAmounts(currency);

    const fiatBalance = wei.from(_.get(fiatSelected, 'balance', '0'), _.get(fiatSelected, 'decimals', 18));
    const isWithdrawAvailable = amount && amount <= fiatBalance;

    const indicator = (
      <span>
        {minAmount
          ? getLang('cabinet_merchantModal_min')
          : getLang('cabinet_merchantModal_max')}
        &nbsp;
        <NumberFormat number={minAmount || maxAmount} currency={fiatSymbol} />
      </span>
    );

    const InputFooter = ({ onClick }) => {
      return (
        <span onClick={() => onClick(Number(fiatBalance))}>
          {getLang('dapp_global_balance')}: {getFinePrice(fiatBalance)} {_.get(fiatSelected, 'symbol')}
        </span>
      );
    };

    return (
      <>
        <h3>
          {props.type === 'withdrawal'
            ? getLang('cabinet_balanceWithdrawal')
            : getLang('cabinet_balanceDeposit')}
        </h3>
        <div className="DepositModal__Balance__dropdown" onClick={fiatSelector}>
          <div
            className="DepositModal__Balance__icon"
            style={{
              backgroundImage: `url('${_.get(fiatSelected, 'logoURI', '')}')`,
            }}
          />
          <div className="DepositModal__Balance__select">
            {/*<span>{_.get(fiat, 'name', 'Unknown')}</span>*/}
            <div className="DepositModal__Balance__currency">
              <span>{_.get(fiatSelected, 'symbol', 'Unknown')}</span>
              <SVG
                src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
              />
            </div>
          </div>
        </div>
        <DappInput
          error={touched && (!amount || checkAmount())}
          placeholder="0.00"
          value={amount}
          onChange={handleChangeAmount}
          indicator={indicator}
          type="number"
          footer={
            props.type === 'withdrawal' && (
              <InputFooter onClick={handleChangeAmount} />
            )
          }
        />
        <UI.Row className="DepositModal__Balance-buttons" wrap>
          <UI.Button type="secondary-alice" onClick={props.onClose}>
            {getLang('global_back')}
          </UI.Button>
          {props.type === 'withdrawal' ? (
            <UI.Button
              type="lightBlue"
              // disabled={!amount}
              disabled={!isWithdrawAvailable}
              onClick={handleWithdraw}
            >
              {getLang('global_withdrawal')}
            </UI.Button>
          ) : (
            <UI.Button
              type="lightBlue"
              /* state={urlStatus} */ onClick={handleFiatRefill}
            >
              {getLang('global_next')}
            </UI.Button>
          )}
        </UI.Row>
      </>
    );
  };

  return (
    <>
      <DepositModal
        className={'DepositModal__Balance'}
        onClose={closeModal}
        useOnCloseForAdaptive
        isOpen
      >
        {renderForm()}
      </DepositModal>
      {isSelectFiat && (
        <CabinetModal onClose={() => setIsSelectFiat(false)} closeOfRef>
          <TokenSelect
            onChange={(value) => {
              setFiat(value);
              setIsSelectFiat(false);
            }}
            onClose={() => setIsSelectFiat(false)}
            selected={fiatSelected}
            isAdaptive={isAdaptive}
            {...context}
            tokens={fiatTokens}
            disableSwitcher
            disableCommonBases
            loadAccountBalances={() => {
            }}
          />
        </CabinetModal>
      )}
    </>
  );
}

export default Balance;
