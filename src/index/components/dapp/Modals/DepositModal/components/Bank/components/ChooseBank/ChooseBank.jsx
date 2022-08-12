import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { Row, Col, Button, ButtonWrapper } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetScrollBlock from 'src/index/components/dapp/CabinetScrollBlock/CabinetScrollBlock';
import Bank from '../../Bank';
import Sidebar from '../Sidebar/Sidebar';
import ChoosedBank from '../ChoosedBank/ChoosedBank';
import DepositTransfer from '../DepositTransfer/DepositTransfer';
import Lang from 'src/components/Lang/Lang';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';

// Utils
import { getAnalytics, logEvent } from 'firebase/analytics';
import _ from 'lodash';

import { getLang } from 'src/utils';
import * as actionTypes from 'src/actions/actionTypes';
import {
  walletCardReservationSelector,
  walletSelector,
  walletStatusSelector,
} from 'src/selectors';
import useAdaptive from 'src/hooks/adaptive';
import { confirm, closeModal, openModal } from 'src/actions/index';
import * as api from 'src/services/api';
import apiSchema from 'src/services/apiSchema';
import * as toast from 'src/actions/toasts';
import * as actions from 'src/actions';

// Styles
import './ChooseBank.less';

const CustomLoadingStatus = ({ status }) => {
  const props = {};
  if (status === 'wait_for_review') {
    props.icon = require('src/asset/120/info.svg');
    props.description = getLang(
      'fiatRefillCard_status_description_not_available_cards'
    );
    props.status = getLang('fiatRefillCard_status_not_available_cards');
  }
  return <LoadingStatus status={status} {...props} />;
};

function ChooseBank(props) {
  const dispatch = useDispatch();
  const { refillBankList } = useSelector(walletSelector);
  const status = useSelector(walletStatusSelector);
  const cardReservation = useSelector(walletCardReservationSelector);
  const adaptive = useAdaptive();
  const [timeIsOver, setTimeIsOver] = useState(false);

  const { minFee, percentFee, currency } = props;

  const amount = cardReservation
    ? cardReservation.reservation.amount
    : props.amount;

  const fee = cardReservation
    ? cardReservation.reservation.fee
    : Math.max((amount / 100) * percentFee, minFee);

  const handleTimerFinish = useCallback(() => {
    setTimeIsOver(true);
  }, [setTimeIsOver]);

  useEffect(() => {
    if (!cardReservation && !props.amount) {
      props.onClose();
    }

    logEvent(getAnalytics(), 'open_rub_fiat_refill_modal');

    const isReservationExpired =
      _.get(cardReservation, 'card.expire_in', 0) * 1000 < Date.now();
    if (
      isReservationExpired &&
      _.get(cardReservation, 'reservation.status') === 'wait_for_pay'
    ) {
      // time is over hack
      dispatch({
        type: actionTypes.FIAT_SET_RESERVED_CARD,
        payload: null,
      });
      dispatch({
        type: actionTypes.WALLET_SET_CARD_RESERVATION,
        payload: null,
      });
      // Delete expired reservation
      api.call(apiSchema.Fiat_wallet.Cards.ReservationDelete, {
        reservation_id: _.get(cardReservation, 'reservation.id'),
      });

      actions.closeModal();
      actions.openModal('merchant', {
        currency: 'rub',
      });
    }

    if (!cardReservation || isReservationExpired) {
      dispatch({
        type: actionTypes.WALLET_SET_STATUS,
        section: 'refillBankList',
        status: 'loading',
      });

      api
        .call(apiSchema.Fiat_wallet.Cards.RefillBanksGet, {
          amount: props.amount,
        })
        .then((r) => {
          const isReservationExpired =
            _.get(r, 'card.expire_in', 0) * 1000 < Date.now();
          if (r.status === 'already_booked' && !isReservationExpired) {
            dispatch({
              type: actionTypes.WALLET_SET_CARD_RESERVATION,
              payload: r,
            });
          } else {
            dispatch({
              type: actionTypes.WALLET_SET_REFILL_BANK_LIST,
              banks: r,
            });
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          dispatch({
            type: actionTypes.WALLET_SET_STATUS,
            section: 'refillBankList',
            status: '',
          });
        });
    }
    return () => {
      // dispatch({
      //   type: actionTypes.FIAT_WALLETS_CLEAR_LOADING_STATUSES
      // });
    };
  }, [dispatch, props, cardReservation]);

  const handleChoiceBank = (bankCode) => {
    dispatch({
      type: actionTypes.WALLET_SET_STATUS,
      section: 'reservedCard',
      status: 'loading',
    });

    api
      .call(apiSchema.Fiat_wallet.Cards.ReservationPost, {
        amount,
        bank_code: bankCode,
      })
      .then((response) => {
        dispatch({
          type: actionTypes.WALLET_SET_CARD_RESERVATION,
          payload: response,
        });
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: 'reservedCard',
          status: '',
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: 'reservedCard',
          status: err.status,
        });
      });
  };

  const handleCancel = () => {
    dispatch({
      type: actionTypes.WALLET_SET_STATUS,
      section: 'cancelReservation',
      status: 'loading',
    });
    confirm({
      title: <Lang name="fiatRefillCard_cancelReservation_confirmTitle" />,
      content: <Lang name="fiatRefillCard_cancelReservation_confirmText" />,
      okText: <Lang name="fiatRefillCard_cancelReservation_confirmOk" />,
      cancelText: (
        <Lang name="fiatRefillCard_cancelReservation_confirmCancel" />
      ),
      type: 'negative',
      dontClose: true,
    }).then(() => {
      api
        .call(apiSchema.Fiat_wallet.Cards.ReservationDelete, {
          amount,
          reservation_id: cardReservation.reservation.id,
        })
        .then(() => {
          dispatch({
            type: actionTypes.WALLET_SET_CARD_RESERVATION,
            payload: null,
          });
          dispatch({
            type: actionTypes.WALLET_SET_STATUS,
            section: 'cancelReservation',
            status: '',
          });
        })
        .finally(() => {
          closeModal();
        });
    });
  };

  const handleClickBack = () => {
    dispatch({
      type: actionTypes.WALLET_SET_CARD_RESERVATION,
      payload: null,
    });

    dispatch({
      type: actionTypes.WALLET_SET_STATUS,
      section: 'reservedCard',
      status: '',
    });
  };

  const handleConfirmPayment = () => {
    dispatch({
      type: actionTypes.WALLET_SET_STATUS,
      section: 'confirmPayment',
      status: 'loading',
    });
    api
      .call(apiSchema.Fiat_wallet.Cards['Reservation/confirmPaymentPost'], {
        reservation_id: cardReservation.reservation.id,
      })
      .then(({ status }) => {
        dispatch({
          type: actionTypes.WALLET_SET_CARD_RESERVATION,
          payload: {
            ...cardReservation,
            reservation: {
              ...cardReservation.reservation,
              status,
            },
          },
        });
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch({
          type: actionTypes.WALLET_SET_STATUS,
          section: 'confirmPayment',
          status: '',
        });
      });
  };

  const BanksList = ({ items = [], onChange }) => {
    const BanksWrapper =
      items.length > 5 && !adaptive ? CabinetScrollBlock : Col;

    return (
      <>
        <BanksWrapper className="DepositModal__ChooseBank-items" noScrollX>
          {items.map((bank, key) => {
            let icon = null;

            try {
              icon = require(`src/asset/banks/${bank.code}.svg`).default;
            } catch {
              console.log('[BankList] Logo is not defined');
            }

            return (
              <Row
                className="DepositModal__ChooseBank-item"
                alignItems="center"
                onClick={() => onChange(bank)}
                key={key}
              >
                <span className="secondary medium default">{bank.name}</span>
                <Row alignItems="center">
                  <img src={icon} alt={bank.name} className="bankIcon" />
                  <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
                </Row>
              </Row>
            );
          })}
        </BanksWrapper>
      </>
    );
  };

  const RenderBody = () => {
    if (timeIsOver) {
      return (
        <Row
          justifyContent="flex-end"
          alignItems="flex-end"
          className="DepositModal__ChooseBank__timeIsOver"
        >
          <div>
            <LoadingStatus
              icon={require('src/asset/120/error.svg')}
              status={<Lang name="fiatRefillCard_timeIsOver_title" />}
              description={
                <Lang name="fiatRefillCard_timeIsOver_description" />
              }
            />
          </div>
          <Button onClick={props.onClose} type="lightBlue">
            {getLang('global_close')}
          </Button>
        </Row>
      );
    }

    if (status.reservedCard === 'not_available_cards') {
      return (
        <Col className="DepositModal__ChooseBank">
          <div className="DepositModal__ChooseBank__empty">
            <h3 className="default dark medium extra-large-height">
              <Lang name="fiatRefillCard_status_not_available_cards" />
            </h3>
            <SVG src={require('src/asset/icons/transaction/empty-icon.svg')} />
          </div>
          <Row className="buttons" justifyContent="flex-end">
            <Button type="secondary-alice" shadow onClick={handleClickBack}>
              <Lang name="global_back" />
            </Button>
          </Row>
        </Col>
      );
    }

    if ([status.refillBankList, status.reservedCard].some(Boolean)) {
      return (
        <div className="DepositModal__ChooseBank__loading">
          <CustomLoadingStatus
            status={status.refillBankList || status.reservedCard}
          />
        </div>
      );
    }

    if (cardReservation?.reservation.status === 'wait_for_review') {
      return <DepositTransfer onClose={props.onClose} />;
    }

    if (!cardReservation) {
      const cardsExists = refillBankList.length && props.merchant === 'cards';

      return (
        <Col className="DepositModal__ChooseBank">
          {cardsExists ? (
            <>
              <h3 className="default dark medium">
                <Lang name="cabinet_fiatWithdrawalModal_chooseBank" />
              </h3>
              <BanksList
                items={refillBankList}
                onChange={(b) => handleChoiceBank(b.code)}
              />
            </>
          ) : (
            <div className="DepositModal__ChooseBank__empty">
              <h3 className="default dark medium extra-large-height">
                <Lang name="fiatRefillCard_status_not_available_cards" />
              </h3>
              <SVG
                src={require('src/asset/icons/transaction/empty-icon.svg')}
              />
            </div>
          )}
          <Row className="buttons" justifyContent="flex-end">
            <Button
              type="secondary-alice"
              shadow
              onClick={() => openModal('deposit_balance')}
            >
              <Lang name="global_back" />
            </Button>
          </Row>
        </Col>
      );
    } else {
      return (
        <ChoosedBank
          cardReservation={cardReservation}
          amount={amount}
          currency={currency}
          onFinish={handleTimerFinish}
          onConfirm={handleConfirmPayment}
          status={{
            confirmPayment: status.confirmPayment,
            cancelReservation: status.cancelReservation,
          }}
          adaptive={adaptive}
        />
      );
    }
  };

  return (
    <Bank {...props} adaptive={adaptive}>
      <Sidebar amount={amount} currency={currency} fee={fee} />
      <RenderBody />
    </Bank>
  );
}

export default ChooseBank;
