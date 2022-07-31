import "./FiatTopupModal.less";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAnalytics, logEvent } from "firebase/analytics";
import _ from 'lodash';

import Modal, { ModalHeader } from "../../../../ui/components/Modal/Modal";
import NumberFormat from "../../../../ui/components/NumberFormat/NumberFormat";
import BankList from "./components/BankList/BankList";
import MethodsList from "./components/MethodsList/MethodsList";
import { refillBanksGet } from "../../../../actions/cabinet/fiat";
import LoadingStatus from "../LoadingStatus/LoadingStatus";
import BankLogo from "../../../../ui/components/BankLogo/BankLogo";
import Clipboard from "src/index/components/cabinet/Clipboard/Clipboard";
import {Button, ButtonWrapper, Input} from "src/ui";
import { getLang } from "../../../../utils";

const currencies = {
  RUB: {
    fee: 2,
    minFee: 0,
    minAmount: 5000,
    maxAmount: 150000,
  },
  UAH: {
    fee: 2,
    minFee: 0,
    minAmount: 5000,
    maxAmount: 150000,
  },
};

const methods = [
  {
    currencies: ['RUB'],
    code: 'tinkoff',
    title: 'Tinkoff Bank',
  },
  {
    currencies: ['RUB'],
    code: 'gazprombank',
    title: 'Газпромбанк',
  },
  {
    currencies: ['UAH'],
    code: 'vostokbank',
    title: 'Восток Банк',
  },
];

const FiatTopupModal = props => {
  const {
    balance, adaptive, bankList,
    currency,
  } = props;
  const [bank, changeBank] = useState(null);
  const [method, setMethod] = useState(null);
  const [value, setValue] = useState(null);
  const currencyOptions = currencies[currency];
  const percentFee = _.get(currencyOptions, 'fee', 0);
  const minFee = _.get(currencyOptions, 'minFee', 0);
  let minAmount = _.get(currencyOptions, 'minAmount', 0);
  let maxAmount = _.get(currencyOptions, 'maxAmount', null);

  const amount = Number(value) || 0;
  const fee = Math.max((amount / 100) * percentFee, minFee);

  const availableMethods = methods.filter(m => !m.currencies || m.currencies.indexOf(currency) >= 0);

  const handleInput = newValue => {
    if (adaptive) {
      setValue(newValue);
      return;
    }
    let value = `${newValue}`;
    value = value.replace(',', '.');
    if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
      value = _.trimStart(value, '0');
    }
    if (!_.isNaN(Number(value)) || value === '.') {
      setValue(value);
    }
  };

  const isAllow = !!method && amount >= minAmount && (!maxAmount || amount <= maxAmount);

  function sendRequest() {

  }

  return (
    <Modal noSpacing isOpen={true} onClose={props.onClose}>
      {adaptive && (
        <ModalHeader>
          {getLang("cabinet_fiatWithdrawalModal_chooseBank")}
        </ModalHeader>
      )}
      <div className="FiatRefillModal">
        <div className="FiatRefillModal__sideBar">
          <div className="FiatRefillModal__header">
            {getLang("cabinet_balanceDeposit")}
          </div>
          <div className="FiatRefillModal__sideBar__content">
            <div className="FiatRefillModal__sideBar__amount">
              <small>{getLang("global_amount")}</small>
              <Input value={value}
                     placeholder="0.00"
                     indicator={<span>
                       {getLang("cabinet_merchantModal_min")}
                       &nbsp;
                       <NumberFormat
                         number={minAmount}
                         currency={currency}
                       />
                     </span>}
                     onTextChange={handleInput}
                     type={adaptive ? 'number' : 'text'} />
            </div>
            <div className="FiatRefillModal__sideBar__fee">
              <small>{getLang("global_fee")}</small>
              <strong>
                <NumberFormat number={fee} currency={currency} />
              </strong>
            </div>
            <hr />
            <div className="FiatRefillModal__sideBar__amount">
              <small>{getLang("cabinet_fiatRefillModal_total")}</small>
              <strong>
                <NumberFormat
                  number={amount - fee}
                  currency={currency}
                />
              </strong>
            </div>
          </div>
        </div>
        <div className="FiatRefillModal__body">
          {!bank ? (
            <>
              <div className="FiatRefillModal__header">
                {getLang("cabinet_fiatWithdrawalModal_chooseBank")}
              </div>
              {availableMethods ? (
                <BankList onChange={setMethod} selected={method} items={availableMethods} />
              ) : (
                <LoadingStatus status={props.loadingStatus} />
              )}
              <ButtonWrapper
                align="right"
                className="FiatRefillModal__body__footer"
              >
                <Button onClick={props.onClose} type="secondary">
                  {getLang("global_back")}
                </Button>
                <Button onClick={sendRequest} type="primary" disabled={!isAllow}>
                  {getLang("topup_button")}
                </Button>
              </ButtonWrapper>
            </>
          ) : (
            <>
              <div className="FiatRefillModal__body__content">
                <div className="FiatRefillModal__header">{bank.name}</div>
                <p>
                  <BankLogo name={bank.code} />
                </p>
                <ul className="FiatRefillModal__accountInfo">
                  <li>
                    {getLang("cabinet_virtualAccount")} #{" "}
                    <span>
                      <Clipboard text={bank.account_number} />
                    </span>
                  </li>
                </ul>
                <p>{getLang("cabinet_fiatWithdrawalModal__infoText")}</p>

                <MethodsList
                  keys={{
                    account_number: bank.account_number,
                    service_provider_code: bank.service_provider_code
                  }}
                  methods={bank.methods}
                />
              </div>

              <ButtonWrapper
                align="right"
                className="FiatRefillModal__body__footer"
              >
                <Button
                  onClick={() => {
                    changeBank(null);
                  }}
                  type="secondary"
                >
                  {getLang("global_back")}
                </Button>
              </ButtonWrapper>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default connect(
  state => ({
    accountName: [
      state.default.profile.user.first_name,
      state.default.profile.user.last_name
    ].join(" "),
    adaptive: state.default.adaptive,
    loadingStatus: state.fiat.loadingStatus.refillBankList,
    withdrawalStatus: state.fiat.loadingStatus.withdrawal,
    bankList: state.fiat.refillBankList
  }),
  {
    refillBanksGet: refillBanksGet
  }
)(FiatTopupModal);
