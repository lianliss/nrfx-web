import React from 'react';

// Components
import {
  BottomSheetModal,
  Modal,
  HoverPopup,
  NumberFormat,
  Button,
  Row,
  Col,
} from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from '../../CabinetBlock/CabinetBlock';

// Utils
import useAdaptive from 'src/hooks/adaptive';

// Styles
import './CreateReferralLink.less';

function CreateReferralLink(props) {
  const numbers = [0, 10, 25, 50];
  const [selectedNumber, setSelectedNumber] = React.useState(numbers[0]);
  const Wrapper = useAdaptive() ? BottomSheetModal : Modal;

  return (
    <Wrapper
      {...props}
      className="CreateReferralLink__wrap"
      prefix="CreateReferralLink"
      custom
    >
      <CabinetBlock className="CreateReferralLink">
        <Row>
          <Col className="CreateReferralLink__header">
            <Row justifyContent="space-between" alignItems="center">
              <h2>Generate your link</h2>
              <span className="close" onClick={props.onClose}>
                <SVG src={require('src/asset/icons/close-popup.svg')} />
              </span>
            </Row>
            <p className="CreateReferralLink__description">
              Profit sharing allows you to share a portion of referral rewards
              with your invited friends.
            </p>
          </Col>
        </Row>
        <Row className="CreateReferralLink__main" justifyContent="center">
          <Col alignItems="center">
            <Row className="title" alignItems="center">
              <span>You receive</span>
              <HoverPopup content="Answer" type="top">
                <SVG
                  src={require('src/asset/icons/cabinet/question-icon.svg')}
                  className="question-icon"
                />
              </HoverPopup>
            </Row>
            <NumberFormat number={100} percent />
          </Col>
          <Col alignItems="center">
            <Row className="title" alignItems="center">
              <span>You receive</span>
              <HoverPopup content="Answer" type="top">
                <SVG
                  src={require('src/asset/icons/cabinet/question-icon.svg')}
                  className="question-icon"
                />
              </HoverPopup>
            </Row>
            <NumberFormat number={0} percent />
          </Col>
        </Row>
        <Row className="CreateReferralLink__table" justifyContent="center">
          <div>
            <span>
              NRFX purchases: <NumberFormat number={5} percent />
            </span>
          </div>
          <div>
            <span>
              Fiat replenishment: <NumberFormat number={30} percent />
            </span>
          </div>
        </Row>
        <Row
          className="CreateReferralLink__buttons"
          justifyContent="space-between"
        >
          {numbers.map((number, index) => (
            <Button
              key={index}
              size="medium"
              type={number === selectedNumber ? 'lightBlue' : 'secondary'}
              onClick={() => setSelectedNumber(number)}
            >
              {number}%
            </Button>
          ))}
        </Row>
        <Button type="lightBlue" size="extra_large" className="submit-button">
          <span>+</span>
          <span>Generate a referral link</span>
        </Button>
      </CabinetBlock>
    </Wrapper>
  );
}

export default CreateReferralLink;
