import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import web3Backend from 'src/services/web3-backend';
import { Web3Context } from 'src/services/web3Provider';
import * as actionTypes from 'src/actions/actionTypes';
import * as toast from 'src/actions/toasts';

// Components
import {
  Row,
  Col,
  NumberFormat,
  Button,
  CopyText,
  BankLogo,
  Timer,
  LineBreaker,
} from 'src/ui';
import SVG from 'utils/svg-wrap';
import InfoWrapper from '../InfoWrapper/InfoWrapper';
import Lang from 'src/components/Lang/Lang';

// Utils
import { openModal } from 'src/actions';
import { dateFormat } from 'src/utils';
import { getLang } from 'src/utils';
import ibanFiats from 'src/index/constants/ibanFiats';

// Styles
import './ChoosedBank.less';

function ChoosedBank(props) {
  const {
    cardReservation,
    amount,
    currency,
    onFinish,
    onConfirm,
    statuses,
    adaptive,
  } = props;
  const dispatch = useDispatch();
  const context = React.useContext(Web3Context);
  const { confirmPayment } = context;
  const { card } = cardReservation;
  const { bank } = card;

  const handleCancel = () => {
    openModal(
      'deposit_cancel',
      {},
      { amount, reservation_id: cardReservation.reservation.id, currency }
    );
  };

  const handleConfirmPayment = () => {
    confirmPayment(cardReservation.reservation.id)
      .then((data) => {
        dispatch({
          type: actionTypes.WALLET_SET_CARD_RESERVATION,
          payload: {
            ...cardReservation,
            reservation: {
              ...cardReservation.reservation,
              status: 'wait_for_review',
            },
          },
        });
        const payload = {};
        payload[currency] = {
          ...cardReservation.reservation,
          status: 'wait_for_review',
        };
        dispatch({
          type: actionTypes.FIAT_TOPUP_UPDATE,
          payload,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Col className="DepositModal__ChoosedBank" alignItems="stretch">
      <Row alignItems="center" justifyContent="center">
        <BankLogo name={bank.code} />
        <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
      </Row>
      <Col>
        <div className="DepositModal__ChoosedBank__items">
          <InfoWrapper size="large">
            {card.isCard ? <p className="dark default hight-height extra-small extra-large-height">
              {ibanFiats.includes(currency) ? (
                <Lang name="fiatRefillCard_IBANForRefill" />
              ) : (
                <Lang name="fiatRefillCard_cardNumberForRefill" />
              )}
            </p> : <p className="dark default hight-height extra-small extra-large-height">
              Account number
              </p>}
            <CopyText text={card.number}>
              <span className="blue default small extra-large-height">
                {card.number.match(/.{1,4}/g).join(' ')}
              </span>
              <SVG src={require('src/asset/icons/action/copy.svg')} />
            </CopyText>
            <p className="dark default hight-height extra-small extra-large-height">
              <Lang name="fiatRefillCard_cardHolderName" />
            </p>
            <CopyText text={card.holder_name} className="blue default small extra-large-height">
              {bank.holder_name}
            </CopyText>
            {(!card.isCard && !!card.iban) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                IBAN
              </p>
              <CopyText text={card.iban} className="blue default small extra-large-height">
                {card.iban}
              </CopyText>
            </>}
            {(!card.isCard && !!card.bic) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                BIC
              </p>
              <CopyText text={card.bic} className="blue default small extra-large-height">
                {card.bic}
              </CopyText>
            </>}
            {(!card.isCard && !!card.short_code) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                Short Code
              </p>
              <CopyText text={card.short_code} className="blue default small extra-large-height">
                {card.short_code}
              </CopyText>
            </>}
            {(!card.isCard && !!card.institution_number) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                Institution Number
              </p>
              <CopyText text={card.institution_number} className="blue default small extra-large-height">
                {card.institution_number}
              </CopyText>
            </>}
            {(!card.isCard && !!card.transit_number) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                Transit Number
              </p>
              <CopyText text={card.transit_number} className="blue default small extra-large-height">
                {card.transit_number}
              </CopyText>
            </>}
            {(!card.isCard && !!card.routing_number) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                Routing Number
              </p>
              <CopyText text={card.routing_number} className="blue default small extra-large-height">
                {card.routing_number}
              </CopyText>
            </>}
            {(!card.isCard && !!card.account_type) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                Account type
              </p>
              <CopyText text={card.account_type} className="blue default small extra-large-height">
                {card.account_type}
              </CopyText>
            </>}
            {(!card.isCard && !!card.address) && <>
              <p className="dark default hight-height extra-small extra-large-height">
                Address
              </p>
              <CopyText text={card.address} className="blue default small extra-large-height">
                {card.address}
              </CopyText>
            </>}
          </InfoWrapper>
        </div>
        <div className="DepositModal__ChoosedBank__items">
          <InfoWrapper>
            <p className="dark default hight-height extra-small">
              <Lang name="fiatRefillCard_completeTransferBefore" />
            </p>
            <p className="blue default small">
              <Timer onFinish={onFinish} time={card.expire_in * 1000} />
            </p>
          </InfoWrapper>
          <InfoWrapper>
            <p className="dark default extra-small">
              <Lang name="fiatRefillCard_paymentAmount" />
            </p>
            <p className="blue default small">
              <NumberFormat number={amount} currency={currency} />
            </p>
          </InfoWrapper>
        </div>
        <div className="DepositModal__ChoosedBank__items">
          <InfoWrapper type="secondary">
            <p className="dark default extra-small small-height">
              <span className="blue">
                <Lang name="global_attention" />
              </span>
              <br />
              <Lang name="fiatRefillCard_attention_text_sendExactly" />
              &nbsp;
              <span className="blue">
                <NumberFormat number={amount} currency={currency} />
                &nbsp;
                <Lang name="fiatRefillCard_attention_text_oneTransaction" />
                &nbsp;
              </span>
              <Lang name="fiatRefillCard_attention_text" />
            </p>
          </InfoWrapper>
        </div>
      </Col>
      <Row className="buttons" justifyContent="flex-end" wrap={adaptive}>
        <Button
          state={statuses.cancelReservation}
          type="secondary-alice"
          shadow
          onClick={handleCancel}
        >
          <Lang name="fiatRefillCard_cancelReservation" />
        </Button>
        <Button
          state={statuses.confirmPayment}
          type="lightBlue"
          onClick={handleConfirmPayment}
        >
          <Lang name="fiatRefillCard_confirmPayment" />
        </Button>
      </Row>
    </Col>
  );
}

ChoosedBank.propTypes = {
  cardReservation: PropTypes.object,
  amount: PropTypes.number,
  currency: PropTypes.string,
  onFinish: PropTypes.func,
  onConfirm: PropTypes.func,
  statuses: PropTypes.object,
  adaptive: PropTypes.bool,
};

ChoosedBank.defaultProps = {
  cardReservation: {},
  amount: 0,
  currency: 'rub',
  onFinish: () => {},
  onConfirm: () => {},
  statuses: {},
  adaptive: false,
};

export default ChoosedBank;
