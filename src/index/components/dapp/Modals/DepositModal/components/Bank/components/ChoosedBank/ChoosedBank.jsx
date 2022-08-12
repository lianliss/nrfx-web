import React from 'react';
import PropTypes from 'prop-types';

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

// Styles
import './ChoosedBank.less';

function ChoosedBank({
  cardReservation,
  amount,
  currency,
  onFinish,
  onConfirm,
  statuses,
  adaptive,
}) {
  const { card } = cardReservation;
  const { bank } = card;

  const handleCancel = () => {
    openModal(
      'deposit_cancel',
      {},
      { amount, reservation_id: cardReservation.reservation.id }
    );
  };

  return (
    <Col className="DepositModal__ChoosedBank">
      <h3 className="default dark medium">Choose a bank</h3>
      <Row alignItems="center">
        <BankLogo name={bank.code} />
        <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
      </Row>
      <Col>
        <div className="DepositModal__ChoosedBank__items">
          <InfoWrapper type="secondary">
            <p className="dark default small hight-height left">
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
        <div className="DepositModal__ChoosedBank__items">
          <InfoWrapper>
            <p className="dark default hight-height extra-small">
              <LineBreaker
                text={getLang('An account is reserved \nfor you until')}
              />
              &nbsp;
              {dateFormat(card.expire_in)}
            </p>
            <p className="blue default small">
              <Timer onFinish={onFinish} time={card.expire_in * 1000} />
            </p>
          </InfoWrapper>
          <InfoWrapper>
            <p className="dark default hight-height extra-small">
              <Lang name="fiatRefillCard_paymentAmount" />
            </p>
            <p className="blue default small">
              <NumberFormat number={amount} currency={currency} />
            </p>
          </InfoWrapper>
        </div>
        <div className="DepositModal__ChoosedBank__items">
          <InfoWrapper size="large">
            <p className="dark default hight-height extra-small extra-large-height">
              <Lang name="fiatRefillCard_cardNumberForRefill" />
            </p>
            <CopyText text={card.number}>
              <span className="blue default small extra-large-height">
                {card.number.match(/.{1,4}/g).join(' ')}
              </span>
              <SVG src={require('src/asset/icons/action/copy.svg')} />
            </CopyText>
            <p className="dark default hight-height extra-small extra-large-height">
              <Lang name="fiatRefillCard_cardHolderName" />
            </p>
            <p className="blue default small extra-large-height">
              {bank.holder_name}
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
          onClick={onConfirm}
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
