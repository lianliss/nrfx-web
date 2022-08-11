import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

// Components
import Select, { option } from 'src/index/components/dapp/Select/Select';
import { Input, Row, Button } from 'src/ui';
import DepositModal from '../../DepositModal';

// Utils
import { openModal } from 'src/actions';

import * as UI from 'src/ui/';
import { getLang, classNames as cn } from 'src/utils';
import SVG from 'utils/svg-wrap';
import router from 'src/router';
import * as actions from 'src/actions';
import * as toasts from 'src/actions/toasts';
import * as fiatActions from 'src/actions/cabinet/fiat';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';
import { Status } from 'src/index/containers/cabinet/CabinetMerchantStatusScreen/CabinetMerchantStatusScreen';
import EmptyContentBlock from 'src/index/components/cabinet/EmptyContentBlock/EmptyContentBlock';
import NumberFormat from 'src/ui/components/NumberFormat/NumberFormat';
import { fiatSelector } from 'src/selectors';
import { closeModal } from 'src/actions';
import Lang from 'src/components/Lang/Lang';

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
  const { adaptive } = props;
  const { params } = router.getState();
  const [currency, setCurrency] = useState(
    params.currency.toLowerCase() || 'usd'
  );
  const [merchant, setMerchant] = useState(null);
  const [amount, setAmount] = useState(null);
  const [touched, setTouched] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [availableMerchants, setAvailableMerchants] = useState([]);
  const fiatState = useSelector(fiatSelector);

  useEffect(() => {
    props.getMerchant(props.type);
    if (
      props.type !== 'withdrawal' &&
      currency === 'rub' &&
      merchant &&
      fiatState.reservedCard
    ) {
      closeModal();
      actions.openModal('fiat_refill_card');
    }
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
    const { min_amount, max_amount } =
      props.merchants[merchant].currencies[currency];
    const currencyLabel = currency.toUpperCase();
    if (value < min_amount) {
      return (
        <>
          {getLang('cabinet_amount_shouldBeMore')} {min_amount} {currencyLabel}
        </>
      );
    } else if (value > max_amount) {
      return (
        <>
          {getLang('cabinet_amount_shouldBeLess')} {max_amount} {currencyLabel}
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

    const { min_fee: minFee, percent_fee: percentFee } =
      props.merchants[merchant].currencies[currency].fees;

    actions.openModal(
      merchant === 'cards' ? 'deposit_choose_bank' : 'fiat_refill',
      null,
      {
        amount,
        balance,
        minFee,
        percentFee,
        currency,
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

  const handleGoToMerchantList = () => {
    if (availableMerchants.length === 1) {
      props.onBack();
    } else {
      setMerchant(null);
    }
  };

  const renderForm = () => {
    const currencyInfo = actions.getCurrencyInfo(currency);
    const { fee, percent_fee, min_fee } = getFee();
    const total = props.type === 'withdrawal' ? amount + fee : amount - fee;

    const currentMerchantCurrency =
      props.merchants[merchant].currencies[currency];

    const minAmount = currentMerchantCurrency.min_amount;
    const maxAmount = currentMerchantCurrency.max_amount;

    const indicator = (
      <span>
        {minAmount
          ? getLang('cabinet_merchantModal_min')
          : getLang('cabinet_merchantModal_max')}{' '}
        <NumberFormat
          number={minAmount || maxAmount}
          currency={currencyInfo.abbr}
        />
      </span>
    );

    return (
      <DepositModal className="DepositModal__Balance" {...props}>
        <h3>Balance Deposit</h3>
        <Select
          options={Object.keys(props.merchants[merchant].currencies)
            .map((b) => actions.getCurrencyInfo(b))
            .map((b) => ({
              value: b.abbr,
              title: b.name,
              note: b.abbr.toUpperCase(),
              label: option(
                b.name,
                b.abbr.toUpperCase(),
                b.icon ? b.icon : null,
                true
              ).label,
            }))}
          value={currency}
          onChange={(value) => {
            setCurrency(value);
          }}
          indicatorIcon={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
          defaultIsOpen
        />
        <Input
          error={touched && (!amount || checkAmount())}
          placeholder="0.00"
          value={amount}
          onTextChange={handleChangeAmount}
          indicator={indicator}
          type="number"
        />
        <p className="secondary medium default hight">
          Fee: <NumberFormat percent number={percent_fee} />
        </p>
        <p className="blue medium default hight">
          To be credited: <NumberFormat number={total} currency={currency} />
        </p>
        <Row className="DepositModal__Balance-buttons">
          <Button type="secondary-alice" onClick={props.onClose}>
            {getLang('global_back')}
          </Button>
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
        </Row>
      </DepositModal>
    );

    return (
      <div className="MerchantModal__form">
        <div className="MerchantModal__form__wallet">
          <UI.CircleIcon
            className="MerchantModal__form__wallet__icon"
            currency={currencyInfo}
          />
          <UI.Dropdown
            value={currency}
            options={Object.keys(props.merchants[merchant].currencies)
              .map((b) => actions.getCurrencyInfo(b))
              .map((b) => ({
                value: b.abbr,
                title: b.name,
                note: b.abbr.toUpperCase(),
              }))}
            onChange={(e) => {
              setCurrency(e.value);
              // getMerchantUrlThrottled({
              //   amount,
              //   merchant,
              //   currency: e.value
              // });
            }}
          />
        </div>
        <div className="MerchantModal__form__input__wrapper">
          <UI.Input
            error={touched && (!amount || checkAmount())}
            value={amount}
            onTextChange={handleChangeAmount}
            type="number"
            placeholder="0.00"
            indicator={indicator}
          />
          {/*<div className="MerchantModal__form__input__description">*/}
          {/*  <span>Комиссия 1%: $10</span>*/}
          {/*  <span>~252.940254 BTC</span>*/}
          {/*</div>*/}
        </div>

        {(props.type === 'withdrawal' ? amount > fee : total > 0) ? (
          <div className="MerchantModal__form__description">
            <div className="MerchantModal__form__description__fee">
              <Lang name="global_fee" />:{' '}
              <NumberFormat number={fee} currency={currency} />
            </div>
            <div className="MerchantModal__form__description__total">
              {props.type === 'withdrawal' ? (
                <Lang name="cabinet_fiatWithdrawalModal_total" />
              ) : (
                <Lang name="cabinet_fiatRefillModal_total" />
              )}
              {': '}
              <NumberFormat number={total} currency={currency} />
            </div>
            {/*{getLang("cabinet_merchantModalDescription_" + merchant)}*/}
          </div>
        ) : (
          <div className="MerchantModal__form__description">
            <div className="MerchantModal__form__description__fee">
              <Lang name="global_fee" />:{' '}
              <NumberFormat percent number={percent_fee} />
              {min_fee > 0 && (
                <>
                  , <NumberFormat number={min_fee} currency={currency} />{' '}
                  <Lang name="global_min" />.
                </>
              )}
            </div>
            <div className="MerchantModal__form__description__total">
              &nbsp;
            </div>
            {/*{getLang("cabinet_merchantModalDescription_" + merchant)}*/}
          </div>
        )}

        {/*{fee > 0 && (*/}
        {/*  <div className="MerchantModal__form__fee">*/}
        {/*    {getLang("global_fee")}: <NumberFormat number={percent_fee} percent />,{" "}*/}
        {/*    <NumberFormat number={fee} currency={currency} />{" "}*/}
        {/*    {getLang("global_min")}.*/}
        {/*  </div>*/}
        {/*)}*/}

        <div className="MerchantModal__buttons">
          <UI.Button onClick={handleGoToMerchantList} type="secondary">
            {getLang('global_back')}
          </UI.Button>
          {merchant === 'invoice' ? (
            <UI.Button disabled={!amount} onClick={handleSubmitInvoice}>
              {getLang('global_next')}
            </UI.Button>
          ) : props.type === 'withdrawal' ? (
            <UI.Button disabled={!amount} onClick={handleFiatWithdrawal}>
              {getLang('global_withdrawal')}
            </UI.Button>
          ) : (
            <UI.Button /* state={urlStatus} */ onClick={handleFiatRefill}>
              {getLang('global_next')}
            </UI.Button>
          )}
        </div>
      </div>
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
          <UI.Button onClick={() => setInvoice(null)} type="secondary">
            {getLang('global_back')}
          </UI.Button>
          <UI.Button onClick={props.onBack}>
            {getLang('global_close')}
          </UI.Button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
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
    <UI.Modal
      className={cn('MerchantModal', {
        MerchantModal__list_wrapper: /* !status && */ !merchant,
      })}
      onClose={props.onBack}
      isOpen={true}
    >
      <UI.ModalHeader>
        {props.type === 'withdrawal'
          ? getLang('cabinet_balanceWithdrawal')
          : getLang('cabinet_balanceDeposit')}
      </UI.ModalHeader>
      {renderContent()}
    </UI.Modal>
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
