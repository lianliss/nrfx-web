import React from 'react';

// Components
import { Row, Col, NumberFormat, Button, CopyText, LineBreaker } from 'src/ui';
import SVG from 'utils/svg-wrap';
import FormattedText from 'src/index/components/dapp/FormattedText/FormattedText';
import InfoWrapper from '../InfoWrapper/InfoWrapper';
import { getLang } from 'src/utils';
import Bank from '../../Bank';

// Utils
import { openModal } from 'src/actions';

// Styles
import './ChoosedBank.less';

const bank = {
  name: 'Tinkoff bank',
  icon: require('src/asset/banks/tinkoff.svg').default,
};

function ChoosedBank(props) {
  return (
    <Bank {...props}>
      <Col className="DepositModal__ChoosedBank">
        <h3 className="default dark medium">Choose a bank</h3>
        <Row alignItems="center">
          <img src={bank.icon} alt={bank.name} className="bankIcon" />
          <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
        </Row>
        <Col>
          <div className="DepositModal__ChoosedBank__items">
            <InfoWrapper type="secondary">
              <p className="dark default small hight-height left">
                <FormattedText
                  text={getLang(
                    '{Attention!} \n To avoid loss of funds, send exactly {5 000 RUB one transaction} this is neccesary for the automatic confirmation of your payment'
                  )}
                  className="blue"
                  regularExpression={/\{[а-яА-яa-zA-z0-9\s\!]+\}/g}
                />
              </p>
            </InfoWrapper>
          </div>
          <div className="DepositModal__ChoosedBank__items">
            <InfoWrapper>
              <p className="dark default hight-height extra-small">
                An account is reserved for you until 27 July 2022, 9:45
              </p>
              <p className="blue default small">01:59:53</p>
            </InfoWrapper>
            <InfoWrapper>
              <p className="dark default hight-height extra-small">
                Amount to top up
              </p>
              <p className="blue default small">
                <NumberFormat number={5000} currency="rub" />
              </p>
            </InfoWrapper>
          </div>
          <div className="DepositModal__ChoosedBank__items">
            <InfoWrapper size="large">
              <p className="dark default hight-height extra-small extra-large-height">
                Recharge card number
              </p>
              <CopyText text="4377 7237 4627 4764">
                <span className="blue default small extra-large-height">
                  4377 7237 4627 4764
                </span>
                <SVG src={require('src/asset/icons/action/copy.svg')} />
              </CopyText>
              <p className="dark default hight-height extra-small extra-large-height">
                Name
              </p>
              <p className="blue default small extra-large-height">
                Evgeny Igorevich G.
              </p>
            </InfoWrapper>
          </div>
        </Col>
        <Row className="buttons" justifyContent="flex-end">
          <Button
            type="secondary-alice"
            shadow
            onClick={() => openModal('deposit_cancel')}
          >
            Cancel
          </Button>
          <Button
            type="lightBlue"
            onClick={() => openModal('deposit_transfer')}
          >
            Confirm payment
          </Button>
        </Row>
      </Col>
    </Bank>
  );
}

export default ChoosedBank;
