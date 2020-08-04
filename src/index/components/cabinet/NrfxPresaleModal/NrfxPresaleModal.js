import "./NrfxPresaleModal.less";

import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import SVG from "react-inlinesvg";

import {
  Input,
  Modal,
  NumberFormat,
  Tooltip,
  ModalHeader
} from "../../../../ui";
import NrfxButton from "./components/NrfxButton/NrfxButton";
import NrfxSwitch from "./components/NrfxSwitch/NrfxSwitch";
import { getLang, classNames as cn } from "../../../../utils";
import { tokenRateGet, buyToken } from "src/actions/cabinet/wallets";
import * as toast from "src/actions/toasts";
import ModalState from "../ModalState/ModalState";
import COMPANY from "src/index/constants/company";

const NrfxPresaleModal = props => {
  const [currency, setCurrency] = useState("btc");
  const [pending, setPending] = useState(false);
  const [amount, setAmount] = useState(100);
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState(null);
  const [rate, setRate] = useRate(0);

  // const lang = props.lang === "ru" ? "ru" : "en";
  // const url = `https://storage.googleapis.com/narfex/files/narfex-white-paper-${lang}-1.1.pdf`;
  const url = COMPANY.whitePaper.en;

  useEffect(() => {
    setPending(true);
    setRate(currency);
    const intervalId = setInterval(() => {
      setRate(currency);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [props, currency]);

  useEffect(() => {
    setPending(false);

    firebase.analytics().logEvent("open_nrfx_presale_modal");
  }, [rate]);

  const handleBuy = () => {
    setTouched(true);
    if (amount < 10) {
      toast.error(getLang("cabinet_nrfxCoinPresaleMinAmount"));
    } else {
      setState("loading");
      buyToken(currency, amount)
        .then(() => {
          props.onClose();

          firebase.analytics().logEvent("nrfx_presale_modal_buy");
        })
        .finally(() => {
          setState(null);
        });
    }
  };

  if (!rate) {
    return <ModalState className="NrfxPresaleModal" status="loading" />;
  }

  return (
    <Modal isOpen={true} className="NrfxPresaleModal" onClose={props.onClose}>
      {props.adaptive && (
        <ModalHeader>{getLang("cabinet_nrfxCoinPresaleTitle")}</ModalHeader>
      )}
      <div className="NrfxPresaleModal__content">
        <div className="NrfxPresaleModal__promo">
          <SVG src={require("./assets/promo.svg")} />
          <Tooltip
            place="bottom"
            title={
              <a target="_blank" rel="noopener noreferrer" href={url}>
                {getLang("cabinet_nrfxCoinPresaleAboutLink")}
                <SVG src={require("src/asset/16px/link.svg")} />
              </a>
            }
          >
            <small className="NrfxPresaleModal__promo__presale">
              {getLang("cabinet_nrfxCoinPresalePresale")}
              <SVG src={require("../../../../asset/16px/help.svg")} />
            </small>
          </Tooltip>
        </div>

        <div className="NrfxPresaleModal__amountInput">
          <div className="NrfxPresaleModal__label">
            {getLang("cabinet_nrfxCoinPresaleInputAmountLabel")}
          </div>
          <Input
            error={touched && amount < 10}
            value={amount}
            onTextChange={setAmount}
            type="number"
            positive={true}
            indicator="NRFX"
          />
        </div>

        <div className="NrfxPresaleModal__currencies">
          <div className="NrfxPresaleModal__label">
            {getLang("cabinet_nrfxCoinPresaleSelectCurrency")}
          </div>
          <NrfxSwitch
            options={[
              { label: "Bitcoin", value: "btc" },
              { label: "Ethereum", value: "eth" },
              { label: "Litecoin", value: "ltc" }
            ]}
            value={currency}
            onChange={setCurrency}
          />
          <div className="NrfxPresaleModal__price">
            <span>
              {getLang("cabinet_nrfxCoinPresalePrice")}{" "}
              <NumberFormat number={1} currency="nrfx" />
            </span>
            <strong className={cn({ pending })}>
              <NumberFormat prefix="~" number={rate} currency={currency} />
            </strong>
          </div>
        </div>

        <div className={cn("NrfxPresaleModal__total", { pending })}>
          <SVG src={require("../../../../asset/24px/loading-small.svg")} />
          <div className="NrfxPresaleModal__label">
            {getLang("cabinet_nrfxCoinPresaleTotalAmount")}
          </div>
          <div className="NrfxPresaleModal__total__amount">
            <strong>
              <NumberFormat prefix="~" number={amount * rate} />
            </strong>
            <small>{currency}</small>
          </div>
        </div>

        <div className="NrfxPresaleModal__submit">
          <NrfxButton
            state={state}
            onClick={handleBuy}
            disabled={!amount || pending}
            active
          >
            {getLang("global_buy")}
          </NrfxButton>
        </div>
      </div>
    </Modal>
  );
};

const useRate = initialState => {
  const [rate, setRate] = useState(initialState);
  return [
    rate,
    currency =>
      tokenRateGet(currency).then(r => {
        setRate(r.rate);
      })
  ];
};

export default connect(state => ({
  adaptive: state.default.adaptive,
  lang: state.default.currentLang
}))(NrfxPresaleModal);
