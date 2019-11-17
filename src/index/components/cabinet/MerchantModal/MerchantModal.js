import './MerchantModal.less'

import React, { useState } from 'react';
import { connect } from 'react-redux';

import UI from '../../../../ui/';
import { getLang, classNames as cn } from '../../../../utils';
import SVG from 'react-inlinesvg';
import router from '../../../../router';
import * as actions from '../../../../actions';
import * as fiatActions from '../../../../actions/cabinet/fiatWallets';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import * as merchantService from '../../../../services/merchant';
import { Status } from '../../../containers/cabinet/CabinetMerchantStatusScreen/CabinetMerchantStatusScreen';

const MerchantModal = props => {
  const { adaptive } = props;
  const { params } = router.getState();
  const [currency, setCurrency] = useState(params.currency.toLowerCase() || 'usd');
  const [merchant, setMerchant] = useState(null);
  const [amount, setAmount] = useState(null);
  const [touched, setTouched] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = () => {
    if (amount) {
      fiatActions.payForm({
        amount,
        merchant,
        currency
      }).then((result) => {
        if (result.file) {
          setInvoice(result.file);
        } else if (result.url) {
          setStatus('loading');
          merchantService.open(result.url).then(() => {
            setStatus('success');
          }).catch(() => {
            setStatus('error');
          })
        }
      });
    }
    setTouched(true);
  };

  const merchants = [
    {
      icon: require('../../../../asset/merchants/adv_cash.svg'),
      name: "AdvCash",
      value: 'advcash',
      fee: '2-3%',
      currencies: [getLang('cabinet_fiatWalletCurrenciesAll')],
      payments: ['mastercard', 'visa']
    },
    {
      icon: require('../../../../asset/merchants/swift.svg'),
      value: 'invoice',
      name: "S.W.I.F.T",
      fee: '~1%',
      currencies: ['USD', 'EUR', 'RUB', 'IDR'],
      payments: ['bank']
    },
    // {
    //   icon: require('../../../../asset/merchants/payoneer.svg'),
    //   name: "Payoneer",
    //   value: "invoice",
    //   fee: '1-3%',
    //   currencies: [getLang('cabinet_fiatWalletCurrenciesAll')],
    //   payments: ['mastercard', 'visa', 'bank']
    // }
  ]

  const renderMerchantsList = () => {
    return (
      <div className="MerchantModal__list">
        {merchants.map(m => (
          <div className="MerchantModal__item" onClick={() => setMerchant(m.value)}>
            <div className="MerchantModal__item__icon">
              <SVG src={m.icon} />
            </div>
            <div className="MerchantModal__item__content">
              <div className="MerchantModal__item__content__name">{m.name}</div>
              <div className="MerchantModal__item__content__commission">{getLang('global_commissions')}: {m.fee}</div>
              <div className="MerchantModal__item__content__currencies">{getLang('global_currencies')}: <span>{m.currencies.join(', ')}</span></div>
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
        ))}
      </div>
    )
  }

  const renderForm = () => {
    const currencyInfo = actions.getCurrencyInfo(currency);

    return (
      <div className="MerchantModal__form">
        <div className="MerchantModal__form__wallet">
          <div className="MerchantModal__form__wallet__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          <UI.Dropdown
            value={currency}
            options={props.balances
              .map(b => ({ ...b, ...actions.getCurrencyInfo(b.currency)}))
              .map(b => ({
                value: b.abbr,
                title: b.name,
                note: b.abbr.toUpperCase()
              }))
            }
            onChange={e => setCurrency(e.value)}
          />
        </div>
        <div className="MerchantModal__form__input__wrapper">
          <UI.Input
            error={touched && !amount}
            value={amount}
            onTextChange={setAmount}
            type="number"
            placeholder="0.00"
            indicator={currencyInfo.abbr.toUpperCase()}
          />
          {/*<div className="MerchantModal__form__input__description">*/}
          {/*  <span>Комиссия 1%: $10</span>*/}
          {/*  <span>~252.940254 BTC</span>*/}
          {/*</div>*/}
        </div>

        <div className="MerchantModal__form__description">
          {getLang('cabinet_merchantModalDescription_' + merchant)}
        </div>

        <div className="MerchantModal__buttons">
          <UI.Button onClick={() => setMerchant(null)} type="outline">{getLang('global_back')}</UI.Button>
          <UI.Button onClick={handleSubmit}>Далее</UI.Button>
        </div>
      </div>
    )
  }

  const renderInvoice = () => {
    const currencyInfo = actions.getCurrencyInfo(currency);
    return (
      <div className="MerchantModal__invoice">

        <div className="MerchantModal__invoice__amount">
          <div className="MerchantModal__invoice__label">{getLang('global_amount')}:</div>
          <div className="MerchantModal__invoice__value">
            {amount} {currencyInfo.abbr.toUpperCase()}
          </div>
        </div>
        <UI.List items={[
          { label: 'Company Reciever', value: 'WIN ALWAYS 1900 LTD' },
          { label: 'Address', value: '91 Battersea Park Road,  London, England, SW8 4DU', margin: true },
          { label: 'SWIFT Code', value: 'STPVHKHH' },
          { label: 'Account', value: '099790001101' },
          { label: 'Purpose of Payment', value: 'Balance Replenishment' }
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
    if (status === 'loading') {
      return <LoadingStatus inline status="loading" />
    }
    if (['success', 'error'].includes(status)) {
      return <Status status={status} />
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
  adaptive: state.default.adaptive
}))(MerchantModal);