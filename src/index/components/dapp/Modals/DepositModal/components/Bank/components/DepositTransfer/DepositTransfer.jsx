import React from 'react';

// Components
import { Row, Button, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Lang from 'src/components/Lang/Lang';

// Styles
import './DepositTransfer.less';

function DepositTransfer({ onClose }) {
  return (
    <Col className="DepositModal__Bank__DepositTransfer" alignItems="center">
      <h3 className="medium dark large-height">
        <Lang name="fiatRefillCard_status_wait_for_review" />
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
          <Lang name="fiatRefillCard_status_description_wait_for_review" />
        </em>
      </p>
      <Row className="buttons" justifyContent="center">
        <Button type="secondary-alice" shadow>
          Add to Metamask
          <SVG src={require('src/asset/icons/social/metaMask.svg')} />
        </Button>
        <Button type="lightBlue" shadow onClick={onClose}>
          <Lang name="global_ok" />
        </Button>
      </Row>
    </Col>
  );
}

export default DepositTransfer;
