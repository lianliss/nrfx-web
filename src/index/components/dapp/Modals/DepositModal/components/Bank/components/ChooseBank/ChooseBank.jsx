import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import web3Backend from 'src/services/web3-backend';
import { Web3Context } from 'src/services/web3Provider';

// Components
import { Row, Col, Button, ButtonWrapper } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Bank from '../../Bank';
import Sidebar from '../Sidebar/Sidebar';
import ChoosedBank from '../ChoosedBank/ChoosedBank';
import DepositTransfer from '../DepositTransfer/DepositTransfer';
import Lang from 'src/components/Lang/Lang';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';
import Choose from './containers/Choose/Choose';

// Utils
import { getAnalytics, logEvent } from 'firebase/analytics';
import _, { concat } from 'lodash';

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

const ChooseBank = React.memo((props) => {
  const dispatch = useDispatch();
  const { refillBankList } = useSelector(walletSelector);
  const status = useSelector(walletStatusSelector);
  const cardReservation = useSelector(walletCardReservationSelector);
  const adaptive = useAdaptive();
  const [timeIsOver, setTimeIsOver] = useState(false);

  const { minFee, percentFee, currency } = props;
  const withdrawBanks = useSelector(state => _.get(state, `dapp.withdraw.banks[${currency}]`, []));

  const methods = useSelector((state) => state.fiat.banks);
  let availableMethods;
  if (props.type === 'withdrawal') {
    availableMethods = withdrawBanks.map(w => ({...w, currencies: [currency]}) );
  } else {
    availableMethods = methods.filter(
      (m) => !m.currencies || m.currencies.indexOf(currency.toUpperCase()) >= 0
    );
    if (_.includes(['USD', 'CNY',], currency)) {
      availableMethods.push({
        currencies: ['USD'],
        code: 'swift',
        title: 'SWIFT',
      });
    }
  }

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
    web3Backend.getBanks().then((banks) => {
      dispatch({
        type: actionTypes.FIAT_BANKS_UPDATE,
        payload: banks,
      });
    });
  }, []);

  useEffect(() => {
    if (!cardReservation && !props.amount) {
      props.onClose();
    }

    // logEvent(getAnalytics(), 'open_rub_fiat_refill_modal');
    //
    // const isReservationExpired =
    //   _.get(cardReservation, 'card.expire_in', 0) * 1000 < Date.now();
    // if (
    //   isReservationExpired &&
    //   _.get(cardReservation, 'reservation.status') === 'wait_for_pay'
    // ) {
    //   // time is over hack
    //   dispatch({
    //     type: actionTypes.FIAT_SET_RESERVED_CARD,
    //     payload: null,
    //   });
    //   dispatch({
    //     type: actionTypes.WALLET_SET_CARD_RESERVATION,
    //     payload: null,
    //   });
    //   // Delete expired reservation
    //   api.call(apiSchema.Fiat_wallet.Cards.ReservationDelete, {
    //     reservation_id: _.get(cardReservation, 'reservation.id'),
    //   });
    //
    //   actions.closeModal();
    //   actions.openModal('merchant', {
    //     currency: 'rub',
    //   });
    // }
    //
    // if (!cardReservation || isReservationExpired) {
    //   dispatch({
    //     type: actionTypes.WALLET_SET_STATUS,
    //     section: 'refillBankList',
    //     status: 'loading',
    //   });
    //
    //   api
    //     .call(apiSchema.Fiat_wallet.Cards.RefillBanksGet, {
    //       amount: props.amount,
    //     })
    //     .then((r) => {
    //       const isReservationExpired =
    //         _.get(r, 'card.expire_in', 0) * 1000 < Date.now();
    //       if (r.status === 'already_booked' && !isReservationExpired) {
    //         dispatch({
    //           type: actionTypes.WALLET_SET_CARD_RESERVATION,
    //           payload: r,
    //         });
    //       } else {
    //         dispatch({
    //           type: actionTypes.WALLET_SET_REFILL_BANK_LIST,
    //           banks: r,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       toast.error(err.message);
    //     })
    //     .finally(() => {
    //       dispatch({
    //         type: actionTypes.WALLET_SET_STATUS,
    //         section: 'refillBankList',
    //         status: '',
    //       });
    //     });
    // }
    // return () => {
    //   // dispatch({
    //   //   type: actionTypes.FIAT_WALLETS_CLEAR_LOADING_STATUSES
    //   // });
    // };
  }, [dispatch, props, cardReservation]);

  const handleChoiceBank = (bankCode) => {
    if (props.type === 'withdrawal') {
      actions.openModal('deposit_withdrawal_details', {
        currency: currency.toUpperCase(),
        amount,
        bank: bankCode,
      });
      return;
    }

    if (bankCode === 'swift') {
      actions.openModal('deposit_invoice_details', {
        currency: currency.toUpperCase(),
        amount,
      });
      return;
    }

    props.cardReserve(amount, currency.toUpperCase(), bankCode)
      .then((data) => {
        const res = data[0];
        if (!res) return;
        let payload = {};
        payload[currency] = res;
        dispatch({
          type: actionTypes.FIAT_TOPUP_UPDATE,
          payload,
        });

        const method = methods.find((b) => b.code === res.bank);
        const bankName = method ? method.title : res.bank;

        payload = {
          reservation: {
            id: res.operation_id,
            amount: res.amount,
            status: res.status,
            fee: res.fee,
          },
          card: {
            number: res.number,
            expire_in: res.book_expiration,
            bank: {
              code: res.bank,
              name: bankName,
              holder_name: res.holder_name,
              currency: currency,
            },
          },
        };
        dispatch({
          type: actionTypes.WALLET_SET_CARD_RESERVATION,
          payload,
        });
        props.onClose();
        actions.openModal('deposit_choose_bank', {
          currency: currency.toUpperCase(),
        });
      })
      .catch((error) => {
        console.error('[FiatTopupModal][sendRequest]', error);
        setIsLoading(false);
      });
    // api
    //   .call(apiSchema.Fiat_wallet.Cards.ReservationPost, {
    //     amount,
    //     bank_code: bankCode,
    //   })
    //   .then((response) => {
    //     dispatch({
    //       type: actionTypes.WALLET_SET_CARD_RESERVATION,
    //       payload: response,
    //     });
    //     dispatch({
    //       type: actionTypes.WALLET_SET_STATUS,
    //       section: 'reservedCard',
    //       status: '',
    //     });
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: actionTypes.WALLET_SET_STATUS,
    //       section: 'reservedCard',
    //       status: err.status,
    //     });
    //   });
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

  const renderBody = () => {
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
        <Choose
          adaptive={adaptive}
          onBack={() => openModal('deposit_balance')}
        />
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
      return (
        <DepositTransfer
          onClose={props.onClose}
          adaptive={adaptive}
          text={getLang('dapp_topup_modal_submitted_text')}
        />
      );
    }

    if (!cardReservation) {
      return (
        <Choose
          items={availableMethods}
          onChange={handleChoiceBank}
          adaptive={adaptive}
          onBack={() => openModal('deposit_balance', {
            type: props.type,
            currency: props.currency,
          })}
        />
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
    <Bank
      {...props}
      size={cardReservation ? 'medium' : 'small'}
      adaptive={adaptive}
    >
      {/* <Sidebar amount={amount} currency={currency} fee={fee} /> */}
      { renderBody() }
    </Bank>
  );
})

const Wrapper = (props) => {
  const context = React.useContext(Web3Context);
  const cardReserve = React.useCallback(context.cardReserve, [])

  return <ChooseBank {...props} cardReserve={cardReserve} />
}

export default React.memo(Wrapper);
