import './MerchantModal.less'

import React, { useEffect, useState, useRef } from 'react';
import { renderToString } from 'react-dom/server'
import { connect } from 'react-redux';

import UI from '../../../../ui/';
import {getLang, throttle, classNames as cn, default as utils} from '../../../../utils';
import SVG from 'react-inlinesvg';
import router from '../../../../router';
import * as actions from '../../../../actions';
import * as toasts from '../../../../actions/toasts';
import * as fiatActions from '../../../../actions/cabinet/fiatWallets';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import * as merchantService from '../../../../services/merchant';
import { Status } from '../../../containers/cabinet/CabinetMerchantStatusScreen/CabinetMerchantStatusScreen';
import EmptyContentBlock from '../EmptyContentBlock/EmptyContentBlock';
import NumberFormat from '../../../../ui/components/NumberFormat/NumberFormat';

const MerchantModal = props => {
  const { adaptive } = props;
  const { params } = router.getState();
  const [currency, setCurrency] = useState(params.currency.toLowerCase() || 'usd');
  const [merchant, setMerchant] = useState(null);
  const [amount, setAmount] = useState(null);
  const [touched, setTouched] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [status, setStatus] = useState(null);
  const [urlStatus, setUrlStatus] = useState(null);
  const [url, setUrl] = useState(null);


  const merchants = {
    advcash: {
      icon: require('../../../../asset/merchants/adv_cash.svg'),
      title: "AdvCash",
      payments: ['mastercard', 'visa']
    },
    invoice: {
      icon: require('../../../../asset/merchants/swift.svg'),
      title: "S.W.I.F.T",
      payments: ['bank']
    },
    payoneer: {
      icon: require('../../../../asset/merchants/payoneer.svg'),
      title: "Payoneer",
      payments: ['mastercard', 'visa', 'bank']
    },
    xendit: {
      icon: require('../../../../asset/merchants/xendit.svg'),
      title: "Xendit",
      payments: ['mastercard', 'visa', 'bank']
    }
  };

  useEffect(() => {
    props.getMerchant();
  },[]);

  const checkAmount = (value = amount) => {
    const { min_amount, max_amount } = props.merchants[merchant].currencies[currency];
    const currencyLabel = currency.toUpperCase();
    if (value < min_amount) {
      return `${getLang('cabinet_amount_shouldBeMore')} ${min_amount} ${currencyLabel}`;
    } else if (value > max_amount) {
      return `${getLang('cabinet_amount_shouldBeLess')} ${max_amount} ${currencyLabel}`;
    } return null;
  }

  const handleSubmit = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    } else if (url && amount && !urlStatus) {
      setStatus('loading');
      merchantService.open(url).then(() => {
        setStatus('success');
      }).catch(() => {
        setStatus('error');
      })
    }
  };

  const handleSubmitInvoice = () => {
    setTouched(true);
    const message = checkAmount();
    if (message) {
      toasts.error(message);
      return false;
    }
    fiatActions.payForm({
      amount,
      merchant,
      currency
    }).then(({file}) => {
      setInvoice(file);
    });
  };

  const getMerchantUrl = (params) =>  {
    setUrlStatus('loading');
    fiatActions.payForm(params).then(({url}) => {
      setUrlStatus(null);
      setUrl(url);
    });
  };

  const getMerchantUrlThrottled = useRef(throttle(getMerchantUrl, 500)).current;

  const handleChangeAmount = (value) => {
    setAmount(value);
    if (!value || checkAmount(value)) return false;
    if (merchant !== 'invoice') {
      getMerchantUrlThrottled({
        amount: value,
        merchant,
        currency
      });
    }
  };

  window.handleSubmit = handleSubmit;

  const renderMerchantsList = () => {
    const merchants2 = Object.keys(props.merchants).map(name => ({
      ...props.merchants[name],
      ...merchants[name],
      name
    })).filter(m => Object.keys(m.currencies).includes(currency));

    return (
      <div className="MerchantModal__list">
        {merchants2.length ? merchants2.map(m => (
          <div className="MerchantModal__item" onClick={() => setMerchant(m.name)}>
            <div className="MerchantModal__item__icon">
              <SVG src={m.icon} />
            </div>
            <div className="MerchantModal__item__content">
              <div className="MerchantModal__item__content__name">{m.title}</div>
              <div className="MerchantModal__item__content__commission">{getLang('global_commissions')}: {m.fee}</div>
              <div className="MerchantModal__item__content__currencies">{getLang('global_currencies')}: <span>{Object.keys(m.currencies).join(', ').toUpperCase()}</span></div>
            </div>
            {!adaptive &&
            <div className="MerchantModal__item__methods">
              <div>
                { m.payments.includes('visa') && <SVG src={require('../../../../asset/payment_systems/visa.svg')} /> }
                { m.payments.includes('mastercard') && <SVG src={require('../../../../asset/payment_systems/mastercard.svg')} /> }
              </div>
              { m.payments.includes('bank') && <div>{getLang('global_bankTransfer')}</div> }
            </div>}
            {!adaptive &&
            <div className="MerchantModal__item__arrow">
              <SVG src={require('../../../../asset/24px/angle-right.svg')}/>
            </div>
            }
          </div>
        )) : (
          <EmptyContentBlock
            skipContentClass
            icon={require('../../../../asset/120/buy_currency.svg')}
            message={getLang("cabinet_merchantEmptyList")}
          />
        )}
      </div>
    )
  }

  const getFee = () => {
    const fee = props.merchants[merchant].fee_conf[currency];
    return {
      ...fee,
      fee: Math.max(fee.min, amount / 100 * fee.percent),
    }
  }

  const renderForm = () => {
    const currencyInfo = actions.getCurrencyInfo(currency);
    const { fee, percent } = getFee();

    return (
      <div className="MerchantModal__form">
        <div className="MerchantModal__form__wallet">
          <div className="MerchantModal__form__wallet__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          <UI.Dropdown
            value={currency}
            options={Object.keys(props.merchants[merchant].currencies)
              .map(b => actions.getCurrencyInfo(b))
              .map(b => ({
                value: b.abbr,
                title: b.name,
                note: b.abbr.toUpperCase()
              }))
            }
            onChange={e => {
              setCurrency(e.value);
              getMerchantUrlThrottled({
                amount,
                merchant,
                currency: e.value
              });
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
            indicator={`${getLang('cabinet_merchantModal_min')} ${props.merchants[merchant].currencies[currency].min_amount} ${currencyInfo.abbr.toUpperCase()}`}
          />
          {/*<div className="MerchantModal__form__input__description">*/}
          {/*  <span>Комиссия 1%: $10</span>*/}
          {/*  <span>~252.940254 BTC</span>*/}
          {/*</div>*/}
        </div>

        <div className="MerchantModal__form__description">
          {getLang('cabinet_merchantModalDescription_' + merchant)}
        </div>

        {fee > 0 && <div className="MerchantModal__form__fee">
          {getLang('global_fee')}: <NumberFormat number={percent} percent />, <NumberFormat number={fee} currency={currency} /> {getLang('global_min')}.
        </div>}

        <div className="MerchantModal__buttons">
          <UI.Button currency={currencyInfo} onClick={() => setMerchant(null)} type="outline">{getLang('global_back')}</UI.Button>
          { merchant === 'invoice' ? (
            <UI.Button disabled={!amount} currency={currencyInfo} onClick={handleSubmitInvoice}>{getLang('global_next')}</UI.Button>
          ) : (
            <div dangerouslySetInnerHTML={{__html: `<div onclick="handleSubmit()">${renderToString(
              <UI.Button currency={currencyInfo} state={urlStatus}>{getLang('global_next')}</UI.Button>
            )}</div>`}} />
          )}
        </div>
      </div>
    )
  }

  const renderInvoice = () => {
    const { fee } = getFee();

    const currencyInfo = actions.getCurrencyInfo(currency);
    return (
      <div className="MerchantModal__invoice">

        <div className="MerchantModal__invoice__amount">
          <div className="MerchantModal__invoice__label">{getLang('global_amount')}:</div>
          <div className="MerchantModal__invoice__value">
            {parseFloat(amount) + fee} {currencyInfo.abbr.toUpperCase()}
          </div>
        </div>
        <UI.List items={[
          { label: 'Company Reciever', value: 'WIN ALWAYS 1900 LTD' },
          { label: 'Address', value: '91 Battersea Park Road,  London, England, SW8 4DU', margin: true },
          { label: 'SWIFT Code', value: 'STPVHKHH' },
          { label: 'Account', value: '099790001101' },
          { label: 'Purpose of Payment', value: 'Balance Replenishment', margin: true },
          { label: getLang('global_fee'), value: <NumberFormat number={fee} currency={currency} /> }
        ]} />

        <div className="MerchantModal__invoice__link">
          <a href={'data:application/pdf;base64,' + invoice} download="invoice.pdf">
            {getLang('cabinet_fiatDownloadInvoice')} <SVG src={require('../../../../asset/24px/new-window.svg')} />
          </a>
        </div>

        <div className="MerchantModal__buttons">
          <UI.Button onClick={() => setInvoice(null)} type="outline">{getLang('global_back')}</UI.Button>
          <UI.Button onClick={props.onBack}>{getLang('global_close')}</UI.Button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (status === 'loading' || props.loadingStatus.merchants) {
      return <LoadingStatus inline status="loading" />
    }
    if (['success', 'error'].includes(status)) {
      return <Status onClose={props.onClose} status={status} />
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
    <UI.Modal className={cn("MerchantModal", {
      'MerchantModal__list_wrapper': (!status && !merchant)
    })} onClose={props.onBack} isOpen={true}>
      <UI.ModalHeader>{getLang('cabinet_merchantModalTitle')}</UI.ModalHeader>
      { renderContent() }
    </UI.Modal>
  );
}

export default connect(state => ({
  balances: state.fiatWallets.balances,
  loadingStatus: state.fiatWallets.loadingStatus,
  adaptive: state.default.adaptive,
  profile: state.default.profile,
  merchants: state.fiatWallets.merchants,
}), {
  getMerchant: fiatActions.getMerchant
})(MerchantModal);
