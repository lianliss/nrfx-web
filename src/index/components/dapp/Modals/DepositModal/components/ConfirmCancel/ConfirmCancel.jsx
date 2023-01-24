import React from 'react';
import { useDispatch } from 'react-redux';
import {Web3Context} from "src/services/web3Provider";

// Components
import DepositModal from '../../DepositModal';
import FormattedText from 'src/index/components/dapp/FormattedText/FormattedText';
import { Button, Col } from 'src/ui';
import Lang from 'src/components/Lang/Lang';

// Utils
import { getLang } from 'src/utils';
import { closeModal } from 'src/actions';
import * as api from 'src/services/api';
import apiSchema from 'src/services/apiSchema';
import * as actionTypes from 'src/actions/actionTypes';

// Styles
import './ConfirmCancel.less';

function ConfirmCancel({ reservation_id, amount, currency, ...props }) {
  const dispatch = useDispatch();
  const context = React.useContext(Web3Context);
  const {cancelReservation} = context;
  const onCancel = () => {
    cancelReservation(reservation_id).then(data => {
      dispatch({
        type: actionTypes.FIAT_TOPUP_DELETE,
        payload: currency.toUpperCase(),
      });
      dispatch({
        type: actionTypes.WALLET_SET_CARD_RESERVATION,
        payload: null,
      });
      closeModal();
    });
    // api
    //   .call(apiSchema.Fiat_wallet.Cards.ReservationDelete, {
    //     amount,
    //     reservation_id: reservation_id,
    //   })
    //   .then(() => {
    //     dispatch({
    //       type: actionTypes.WALLET_SET_CARD_RESERVATION,
    //       payload: null,
    //     });
    //     dispatch({
    //       type: actionTypes.WALLET_SET_STATUS,
    //       section: 'cancelReservation',
    //       status: '',
    //     });
    //   })
    //   .finally(() => {
    //     closeModal();
    //   });
  };

  return (
    <DepositModal className="DepositModal__ConfirmCancel" {...props}>
      <h3>
        <Lang name="fiatRefillCard_cancelReservation_confirmTitle" />
      </h3>
      <p className="secondary default medium">
        <FormattedText lang="fiatRefillCard_cancelReservation_confirmText" />
      </p>
      <Col className="buttons">
        <Button type="lightBlue" onClick={onCancel}>
          <Lang name="fiatRefillCard_cancelReservation_confirmOk" />
        </Button>
        <Button type="secondary-alice" onClick={closeModal}>
          <Lang name="fiatRefillCard_cancelReservation_confirmCancel" />
        </Button>
      </Col>
    </DepositModal>
  );
}

export default ConfirmCancel;
