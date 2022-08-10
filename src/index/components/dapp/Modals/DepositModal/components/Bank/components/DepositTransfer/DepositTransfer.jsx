import React from 'react';

// Components
import { Row, Button, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Bank from '../../Bank';

// Styles
import './DepositTransfer.less';

function DepositTransfer(props) {
  return (
    <Bank {...props}>
      <Col className="DepositModal__Bank__DepositTransfer" alignItems="center">
        <h3 className="medium dark large-height">
          Your transfer is under review
        </h3>
        <p className="default small secondary large-height">
          Your tokens will be credited directly to your connected wallet. Import
          the token into your wallet using the button below.
        </p>
        <div className="speed-icon">
          <SVG src={require('src/asset/icons/transaction/speed.svg')} />
        </div>
        <p className="medium-weight blue large-height">
          <em>
            If funds are not available within 24 hours, please contact support
          </em>
        </p>
        <Row className="buttons" justifyContent="center">
          <Button type="secondary-alice" shadow>
            Add to Metamask
            <SVG src={require('src/asset/icons/social/metaMask.svg')} />
          </Button>
          <Button type="lightBlue" shadow onClick={props.onClose}>
            OK
          </Button>
        </Row>
      </Col>
    </Bank>
  );
}

export default DepositTransfer;
