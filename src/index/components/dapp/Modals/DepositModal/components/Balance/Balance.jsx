import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

// Components
import Select, { option } from 'src/index/components/dapp/Select/Select';
import * as UI from 'src/ui/';
import DepositModal from '../../DepositModal';
import DappInput from '../../../../DappInput/DappInput';
import EmptyContentBlock from 'src/index/components/cabinet/EmptyContentBlock/EmptyContentBlock';
import NumberFormat from 'src/ui/components/NumberFormat/NumberFormat';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';
import SVG from 'utils/svg-wrap';
import { Status } from 'src/index/containers/cabinet/CabinetMerchantStatusScreen/CabinetMerchantStatusScreen';
import { Web3Context } from 'services/web3Provider';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import CabinetModal from '../../../CabinetModal/CabinetModal';

// Utils
import { getLang, classNames as cn } from 'src/utils';
import router from 'src/router';
import * as actions from 'src/actions';
import * as toasts from 'src/actions/toasts';
import * as fiatActions from 'src/actions/cabinet/fiat';
import { fiatSelector, adaptiveSelector } from 'src/selectors';
import { closeModal } from 'src/actions';

// Styles
import './Balance.less';

const merchantList = {
  advcash: {
    icon: require('src/asset/merchants/adv_cash.svg').default,
    title: 'AdvCash',
    payments: ['mastercard', 'visa'],
  },
  invoice: {
    icon: require('src/asset/merchants/swift.svg').default,
    title: 'S.W.I.F.T',
    payments: ['bank'],
  },
  payoneer: {
    icon: require('src/asset/merchants/payoneer.svg').default,
    title: 'Payoneer',
    payments: ['mastercard', 'visa', 'bank'],
  },
  xendit: {
    // icon: require('src/asset/merchants/xendit.svg').default,
    icon: require('src/asset/merchants/rp.svg').default,
    // title: "Xendit",
    title: 'Indonesian Rupiah',
    // payments: ['mastercard', 'visa', 'bank']
    payments: ['bank'],
  },
  cards: {
    icon: require('src/asset/merchants/xendit.svg').default,
    title: 'By Card',
    payments: ['bank'],
  },
};

function Balance(props) {
  const context = React.useContext(Web3Context);
  const {
    fiats,
    updateFiats,
    chainId,
    accountAddress,
    connectWallet,
    isConnected,
  } = context;
  const isAdaptive = useSelector(adaptiveSelector);
  const banks = useSelector((state) => state.fiat.banks);

  const userId = `${chainId}${accountAddress}`;
  const fiatTokens = _.get(fiats, userId, []);

  const [fiatSelected, setFiatSelected] = React.useState(null);
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const fiatSymbol = _.get(fiatSelected, 'symbol', '');

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

  // React.useEffect(() => {
  //   if (fiats.length) return;

  //   updateFiats().then((res) => {
  //     setFiat(res.list[0]);
  //   });
  // }, []);

  React.useEffect(() => {
    const routerState = router.getState();
    const token = fiatTokens.find(
      (t) => t.symbol === routerState.params.currency
    );
    if (!token) return;
    setFiat(token);
  }, [fiats]);

  const { adaptive } = props;
  const { params } = router.getState();
  const [currency, setCurrency] = useState(
    params.currency.toUpperCase() || 'RUB'
  );
  const [merchant, setMerchant] = useState(null);
  const [amount, setAmount] = useState(null);
  const [touched, setTouched] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [availableMerchants, setAvailableMerchants] = useState([]);
  const fiatState = useSelector(fiatSelector);

  useEffect(() => {
    // props.getMerchant(props.type);
    // if (
    //   props.type !== 'withdrawal' &&
    //   currency === 'rub' &&
    //   merchant &&
    //   fiatState.reservedCard
    // ) {
    //   closeModal();
    //   actions.openModal('fiat_refill_card');
    // }
    // eslint-disable-next-line
  }, [merchant]);

  useEffect(() => {
    // HACK for one merchant
    if (!props.loadingStatus.merchants && props.merchantType === props.type) {
      if (availableMerchants.length === 1) {
        setMerchant(availableMerchants[0].name);
      }
    }
  }, [
    availableMerchants,
    props.type,
    props.merchantType,
    currency,
    props.loadingStatus.merchants,
  ]);

  const checkAmount = (value = amount) => {
    const anyBank = banks.find((b) =>
      _.includes(b.currencies, currency.toUpperCase())
    );
    const minAmount = _.get(anyBank, 'minAmount', 100);
    const maxAmount = _.get(anyBank, 'maxAmount', 150000);
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

  const getBalance = (currency) => {
    return props.balances.find((b) => b.currency.toLowerCase() === currency);
  };

  const handleFiatRefill = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    }

    const balance = getBalance(currency);

    // const { min_fee: minFee, percent_fee: percentFee } =
    //   props.merchants[merchant].currencies[currency].fees;

    actions.openModal(
      'deposit_choose_bank',
      {
        currency: fiatSelected.symbol,
        amount,
      },
      {
        amount,
        balance,
        minFee: 0,
        percentFee: 0,
        currency: fiatSelected.symbol,
        merchant,
      }
    );
  };

  const handleFiatWithdrawal = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    }

    const balance = getBalance(currency);
    const { min_fee: minFee, percent_fee: percentFee } =
      props.merchants[merchant].currencies[currency].fees;
    actions.openModal('fiat_withdrawal', null, {
      amount,
      balance,
      minFee,
      percentFee,
    });
  };

  const handleSubmitInvoice = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    }
    fiatActions
      .payForm({
        amount,
        merchant,
        currency,
      })
      .then(({ file }) => {
        setInvoice(file);
      });
  };

  // const getMerchantUrl = (params) =>  {
  //   setUrlStatus('loading');
  //   fiatActions.payForm(params).then(({url}) => {
  //     setUrl(url);
  //   }).finally(() => {
  //     setUrlStatus(null);
  //   });
  // };

  // const getMerchantUrlThrottled = useRef(throttle(getMerchantUrl, 500)).current;

  const handleChangeAmount = (value) => {
    setAmount(parseInt(value));
    if (!value || checkAmount(value)) return false;
    // if (props.type !== 'withdrawal' && merchant !== 'invoice') {
    //   getMerchantUrlThrottled({
    //     amount: value,
    //     merchant,
    //     currency
    //   });
    // }
  };

  // window.handleSubmit = handleSubmit;

  useEffect(() => {
    setAvailableMerchants(
      Object.keys(props.merchants)
        .map((name) => ({
          ...props.merchants[name],
          ...merchantList[name],
          name,
        }))
        .filter((m) => Object.keys(m.currencies).includes(currency))
    );
  }, [props.merchants, currency]);

  const renderMerchantsList = () => {
    return (
      <div className="MerchantModal__list">
        {availableMerchants.length ? (
          availableMerchants.map((m, index) => (
            <div
              key={index}
              className="MerchantModal__item"
              onClick={() => setMerchant(m.name)}
            >
              <div className="MerchantModal__item__icon">
                <SVG src={m.icon} />
              </div>
              <div className="MerchantModal__item__content">
                <div className="MerchantModal__item__content__name">
                  {m.title}
                </div>
                <div className="MerchantModal__item__content__commission">
                  {getLang('global_commissions')}: {m.fee}
                </div>
                <div className="MerchantModal__item__content__currencies">
                  {getLang('global_currencies')}:{' '}
                  <span>
                    {Object.keys(m.currencies).join(', ').toUpperCase()}
                  </span>
                </div>
              </div>
              {!adaptive && (
                <div className="MerchantModal__item__methods">
                  <div>
                    {m.payments.includes('visa') && (
                      <SVG
                        src={require('src/asset/payment_systems/visa.svg')}
                      />
                    )}
                    {m.payments.includes('mastercard') && (
                      <SVG
                        src={require('src/asset/payment_systems/mastercard.svg')}
                      />
                    )}
                  </div>
                  {m.payments.includes('bank') && (
                    <div>{getLang('global_bankTransfer')}</div>
                  )}
                </div>
              )}
              {!adaptive && (
                <div className="MerchantModal__item__arrow">
                  <SVG src={require('src/asset/24px/angle-right.svg')} />
                </div>
              )}
            </div>
          ))
        ) : (
          <EmptyContentBlock
            skipContentClass
            icon={require('src/asset/120/exchange.svg').default}
            message={
              props.type === 'withdrawal'
                ? getLang('cabinet_merchantWithdrawalEmptyList')
                : getLang('cabinet_merchantEmptyList')
            }
          />
        )}
      </div>
    );
  };

  const getFee = () => {
    const fees = props.merchants[merchant]?.currencies[currency]?.fees;
    if (fees) {
      return {
        ...fees,
        fee: Math.max(fees.min_fee, (amount / 100) * fees.percent_fee),
      };
    }
    return {};
  };

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

    // const currentMerchantCurrency =
    //   props.merchants[merchant].currencies[currency];

    // const minAmount = currentMerchantCurrency.min_amount;
    // const maxAmount = currentMerchantCurrency.max_amount;
    const anyBank = banks.find((b) =>
      _.includes(b.currencies, currency.toUpperCase())
    );

    const minAmount = _.get(anyBank, 'minAmount', 100);
    const maxAmount = _.get(anyBank, 'maxAmount', 150000);

    const indicator = (
      <span>
        {minAmount
          ? getLang('cabinet_merchantModal_min')
          : getLang('cabinet_merchantModal_max')}{' '}
        <NumberFormat number={minAmount || maxAmount} currency={fiatSymbol} />
      </span>
    );

    return (
      <>
        <h3>{getLang('cabinet_balanceDeposit')}</h3>
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
        />
        {/*<p className="secondary medium default hight">*/}
        {/*Fee: <NumberFormat percent number={percent_fee} />*/}
        {/*</p>*/}
        {/*{total >= 0 && (*/}
        {/*<p className="blue medium default hight">*/}
        {/*{getLang('cabinet_fiatRefillModal_total')}&nbsp;*/}
        {/*<NumberFormat number={total} currency={currency} />*/}
        {/*</p>*/}
        {/*)}*/}
        <UI.Row className="DepositModal__Balance-buttons" wrap>
          <UI.Button type="secondary-alice" onClick={props.onClose}>
            {getLang('global_back')}
          </UI.Button>
          {merchant === 'invoice' ? (
            <UI.Button
              type="lightBlue"
              disabled={!amount}
              onClick={handleSubmitInvoice}
            >
              {getLang('global_next')}
            </UI.Button>
          ) : props.type === 'withdrawal' ? (
            <UI.Button
              type="lightBlue"
              disabled={!amount}
              onClick={handleFiatWithdrawal}
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

  const renderInvoice = () => {
    const { fee } = getFee();

    const currencyInfo = actions.getCurrencyInfo(currency);
    return (
      <div className="MerchantModal__invoice">
        <div className="MerchantModal__invoice__amount">
          <div className="MerchantModal__invoice__label">
            {getLang('global_amount')}:
          </div>
          <div className="MerchantModal__invoice__value">
            {parseFloat(amount) + fee} {currencyInfo.abbr.toUpperCase()}
          </div>
        </div>
        <UI.List
          items={[
            { label: 'Company Reciever', value: 'WIN ALWAYS 1900 LTD' },
            {
              label: 'Address',
              value: '91 Battersea Park Road, London, England, SW8 4DU',
              margin: true,
            },
            { label: 'SWIFT Code', value: 'STPVHKHH' },
            { label: 'Account', value: '099790001101' },
            {
              label: 'Purpose of Payment',
              value: 'Balance Replenishment',
              margin: true,
            },
            {
              label: getLang('global_fee'),
              value: <NumberFormat number={fee} currency={currency} />,
            },
          ]}
        />

        <div className="MerchantModal__invoice__link">
          <a
            href={'data:application/pdf;base64,' + invoice}
            download="invoice.pdf"
          >
            {getLang('cabinet_fiatDownloadInvoice')}{' '}
            <SVG src={require('src/asset/24px/new-window.svg')} />
          </a>
        </div>

        <div className="MerchantModal__buttons">
          <UI.Button type="secondary" onClick={() => setInvoice(null)}>
            {getLang('global_back')}
          </UI.Button>
          <UI.Button type="lightBlue" onClick={props.onBack}>
            {getLang('global_close')}
          </UI.Button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return renderForm();
    if (
      /* status === 'loading' || */ props.loadingStatus.merchants === 'loading'
    ) {
      return <LoadingStatus inline status="loading" />;
    }
    if (['success', 'error'].includes(props.loadingStatus.merchants)) {
      return (
        <Status
          onClose={props.onClose}
          status={props.loadingStatus.merchants}
        />
      );
    }

    if (!merchant) {
      return renderMerchantsList();
    } else if (invoice) {
      return renderInvoice();
    } else {
      return renderForm();
    }
  };

  return (
    <>
      <DepositModal
        className={cn('DepositModal__Balance', {
          MerchantModal__list_wrapper: /* !status && */ !merchant,
        })}
        onClose={closeModal}
        useOnCloseForAdaptive
        isOpen
      >
        {props.type === 'withdrawal' && (
          <UI.ModalHeader>
            {getLang('cabinet_balanceWithdrawal')}
          </UI.ModalHeader>
        )}
        {renderContent()}
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
              console.log('LOAD');
            }}
          />
        </CabinetModal>
      )}
    </>
  );
}

export default connect(
  (state) => ({
    balances: state.fiat.balances?.length
      ? state.fiat.balances
      : state.wallet.balances,
    loadingStatus: state.fiat.loadingStatus,
    adaptive: state.default.adaptive,
    profile: state.default.profile,
    merchants: state.fiat.merchants,
    merchantType: state.fiat.merchantType,
  }),
  {
    getMerchant: fiatActions.getMerchant,
    clearMerchants: fiatActions.clearMerchants,
  }
)(Balance);
