import React from 'react';

// Components
import { Row, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import CustomButton from 'dapp/ui/CustomButton/CustomButton';

// Styles
import './index.less';

function SuggestiveBox() {
  return (
    <CustomButton className="MainLanding-SuggestiveBox">
      <div className="MainLanding-SuggestiveBox-icon">
        <div className="MainLanding-SuggestiveBox-icon__bg" />
        <SVG src={require('src/asset/icons/action/play-circle.svg')} />
      </div>
      <Col className="MainLanding-SuggestiveBox__content">
        <div className="MainLanding-SuggestiveBox__title">
          How our exchanger works
        </div>
        <div className="MainLanding-SuggestiveBox__subtitle">
          video instruction
        </div>
      </Col>
    </CustomButton>
  );
}

export default SuggestiveBox;
