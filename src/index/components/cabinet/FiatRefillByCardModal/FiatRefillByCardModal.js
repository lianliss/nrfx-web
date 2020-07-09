import "../FiatRefillModal/FiatRefillModal.less";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal, { ModalHeader } from "../../../../ui/components/Modal/Modal";
import NumberFormat from "../../../../ui/components/NumberFormat/NumberFormat";
import BankList from "../FiatRefillModal/components/BankList/BankList";
import LoadingStatus from "../LoadingStatus/LoadingStatus";
import BankLogo from "../../../../ui/components/BankLogo/BankLogo";
import Clipboard from "src/index/components/cabinet/Clipboard/Clipboard";
import Button, { ButtonWrapper } from "../../../../ui/components/Button/Button";
import { getLang } from "../../../../utils";
import * as actionTypes from "../../../../actions/actionTypes";
import { fiatSelector } from "src/selectors";
import useAdaptive from "src/hooks/adaptive";
import { Message } from "../../../../ui";
import Lang from "../../../../components/Lang/Lang";
import { confirm, closeModal } from "src/actions/index";
import * as api from "../../../../services/api";
import apiSchema from "../../../../services/apiSchema";
import * as utils from "../../../../utils";
import { calculateTimeLeft } from "../../../containers/site/SiteTokenScreen/components/Promo/timer";

const CustomLoadingStatus = ({ status }) => {
  const props = {};
  if (status === "not_available_cards") {
    props.icon = require("src/asset/120/info.svg");
    props.description = getLang(
      "fiatRefillCard_status_description_not_available_cards"
    );
    props.status = getLang("fiatRefillCard_status_not_available_cards");
  } else if (status === "wait_for_review") {
    props.icon = require("src/asset/120/info.svg");
    props.description = getLang(
      "fiatRefillCard_status_description_not_available_cards"
    );
    props.status = getLang("fiatRefillCard_status_not_available_cards");
  }
  return <LoadingStatus status={status} {...props} />;
};

export default props => {
  const dispatch = useDispatch();
  const fiatState = useSelector(fiatSelector);
  const [dateNow, setDateNow] = useState(Date.now());
  const adaptive = useAdaptive();

  const { minFee, percentFee, currency } = props;

  const amount = fiatState.reservedCard
    ? fiatState.reservedCard.reservation.amount
    : props.amount;

  useEffect(() => {
    setTimeout(() => {
      setDateNow(Date.now());
    }, 1000 * 60);
  }, [dateNow]);

  const expireIn =
    fiatState.reservedCard && fiatState.reservedCard.card.expire_in;
  const difference = expireIn * 1000 - dateNow;

  const fee = fiatState.reservedCard
    ? fiatState.reservedCard.reservation.fee
    : Math.max((amount / 100) * percentFee, minFee);
  const timer = calculateTimeLeft(difference);

  useEffect(() => {
    if (!fiatState.reservedCard) {
      dispatch({
        type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
        section: "refillBankList",
        status: "loading"
      });

      api
        .call(apiSchema.Fiat_wallet.Cards.RefillBanksGet, {
          amount: props.amount
        })
        .then(r => {
          if (r.status === "already_booked") {
            dispatch({
              type: actionTypes.FIAT_SET_RESERVED_CARD,
              payload: r
            });
          } else {
            dispatch({
              type: actionTypes.FIAT_WALLETS_SET_REFILL_BANK_LIST,
              banks: r
            });
          }
        })
        .finally(() => {
          dispatch({
            type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
            section: "refillBankList",
            status: ""
          });
        });
    }
    return () => {
      dispatch({
        type: actionTypes.FIAT_WALLETS_CLEAR_LOADING_STATUSES
      });
    };
  }, [dispatch, props.amount, fiatState.reservedCard]);

  const handleChoiceBank = bankCode => {
    dispatch({
      type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
      section: "reservedCard",
      status: "loading"
    });

    api
      .call(apiSchema.Fiat_wallet.Cards.ReservationPost, {
        amount,
        bank_code: bankCode
      })
      .then(response => {
        dispatch({
          type: actionTypes.FIAT_SET_RESERVED_CARD,
          payload: response
        });
        dispatch({
          type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
          section: "reservedCard",
          status: ""
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
          section: "reservedCard",
          status: err.status
        });
      });
  };

  const handleCancel = () => {
    dispatch({
      type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
      section: "cancelReservation",
      status: "loading"
    });

    confirm({
      title: <Lang name="fiatRefillCard_cancelReservation_confirmTitle" />,
      content: <Lang name="fiatRefillCard_cancelReservation_confirmText" />,
      okText: <Lang name="fiatRefillCard_cancelReservation_confirmOk" />,
      cancelText: (
        <Lang name="fiatRefillCard_cancelReservation_confirmCancel" />
      ),
      type: "negative",
      dontClose: true
    }).then(() => {
      api
        .call(apiSchema.Fiat_wallet.Cards.ReservationDelete, {
          amount,
          reservation_id: fiatState.reservedCard.reservation.id
        })
        .then(() => {
          dispatch({
            type: actionTypes.FIAT_SET_RESERVED_CARD,
            payload: null
          });
          dispatch({
            type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
            section: "cancelReservation",
            status: ""
          });
        })
        .finally(() => {
          closeModal();
        });
    });
  };

  const handleConfirmPayment = () => {
    dispatch({
      type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
      section: "confirmPayment",
      status: "loading"
    });
    api
      .call(apiSchema.Fiat_wallet.Cards["Reservation/confirmPaymentPost"], {
        reservation_id: fiatState.reservedCard.reservation.id
      })
      .then(({ status }) => {
        dispatch({
          type: actionTypes.FIAT_SET_RESERVED_CARD,
          payload: {
            ...fiatState.reservedCard,
            reservation: {
              ...fiatState.reservedCard.reservation,
              status
            }
          }
        });
        dispatch({
          type: actionTypes.FIAT_WALLETS_SET_LOADING_STATUS,
          section: "confirmPayment",
          status: "loading"
        });
      });
  };

  const renderBody = () => {
    const { loadingStatus } = fiatState;

    if (
      [loadingStatus.refillBankList, loadingStatus.reservedCard].some(Boolean)
    ) {
      return (
        <CustomLoadingStatus
          status={loadingStatus.refillBankList || loadingStatus.reservedCard}
        />
      );
    }

    if (fiatState.reservedCard?.reservation.status === "wait_for_review") {
      return (
        <>
          <div>
            <LoadingStatus
              icon={require("src/asset/120/clock.svg")}
              status={getLang("fiatRefillCard_status_wait_for_review")}
              description={getLang(
                "fiatRefillCard_status_description_wait_for_review"
              )}
            />
          </div>
          <ButtonWrapper
            align="center"
            className="FiatRefillModal__body__footer"
          >
            <Button onClick={handleCancel} type="secondary">
              {getLang("global_cancel")}
            </Button>
          </ButtonWrapper>
        </>
      );
    }

    if (!fiatState.reservedCard) {
      return (
        <>
          <div className="FiatRefillModal__header">
            {getLang("cabinet_fiatWithdrawalModal_chooseBank")}
          </div>
          <BankList
            onChange={b => handleChoiceBank(b.code)}
            items={fiatState.refillBankList}
          />
          <ButtonWrapper
            align="right"
            className="FiatRefillModal__body__footer"
          >
            <Button onClick={props.onBack} type="secondary">
              {getLang("global_back")}
            </Button>
          </ButtonWrapper>
        </>
      );
    } else {
      return (
        <>
          <div className="FiatRefillModal__body__content">
            <div className="FiatRefillModal__header">
              {fiatState.reservedCard.card.bank.name}
            </div>
            <p>
              <BankLogo name={fiatState.reservedCard.card.bank.code} />
            </p>
            <Message title={<Lang name="global_attention" />} type="warning">
              <Lang name="fiatRefillCard_attention_text_sendExactly" />{" "}
              <strong>
                <NumberFormat number={amount} currency={currency} />{" "}
                <Lang name="fiatRefillCard_attention_text_oneTransaction" />
              </strong>{" "}
              <Lang name="fiatRefillCard_attention_text" />
            </Message>
            <div className="FiatRefillModal__infoBlock">
              <div className="FiatRefillModal__infoBlock__item">
                <span>
                  <Lang name="fiatRefillCard_cardReservation" />{" "}
                  {utils.dateFormat(fiatState.reservedCard.card.expire_in)}
                </span>
                <strong>
                  {timer.hours} <Lang name="global_H" /> {timer.minutes}{" "}
                  <Lang name="global_M" />
                </strong>
              </div>
              <div className="FiatRefillModal__infoBlock__item">
                <span>
                  <Lang name="fiatRefillCard_paymentAmount" />
                </span>
                <strong>
                  <NumberFormat number={amount} currency={currency} />
                </strong>
              </div>
            </div>
            <div className="FiatRefillModal__infoBlock">
              <div className="FiatRefillModal__infoBlock__item primary">
                <span>
                  <Lang name="fiatRefillCard_cardNumberForRefill" />
                </span>
                <strong>
                  <Clipboard
                    displayText={fiatState.reservedCard.card.number
                      .match(/.{1,4}/g)
                      .join(" ")}
                    text={fiatState.reservedCard.card.number}
                  />
                </strong>
              </div>
            </div>
          </div>

          <ButtonWrapper
            align="justify"
            className="FiatRefillModal__body__footer"
          >
            <Button
              stete={fiatState.loadingStatus.cancelReservation}
              onClick={handleCancel}
              type="secondary"
            >
              <Lang name="fiatRefillCard_cancelReservation" />
            </Button>
            <Button
              state={fiatState.loadingStatus.confirmPayment}
              onClick={handleConfirmPayment}
            >
              <Lang name="fiatRefillCard_confirmPayment" />
            </Button>
          </ButtonWrapper>
        </>
      );
    }
  };

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
              <small>
                <Lang name="global_amount" />
              </small>
              <strong>
                <NumberFormat number={amount} currency={currency} />
              </strong>
            </div>
            <div className="FiatRefillModal__sideBar__fee">
              <small>
                <Lang name="global_fee" />
              </small>
              <strong>
                <NumberFormat number={fee} currency={currency} />
              </strong>
            </div>
            <hr />
            <div className="FiatRefillModal__sideBar__amount">
              <small>
                <Lang name="fiatRefillCard_totalAmount" />
              </small>
              <strong>
                <NumberFormat number={amount - fee} currency={currency} />
              </strong>
            </div>
          </div>
        </div>
        <div className="FiatRefillModal__body">{renderBody()}</div>
      </div>
    </Modal>
  );
};
