import React from 'react';

// Components
import { Button, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function FooterReadDoc() {
  return (
    <div className="MainLandingWrapperFooter-read-doc">
      <div className="MainLandingWrapperFooter-read-doc__title">
        Explore the Narfex Documentation
      </div>
      <div className="MainLandingWrapperFooter-read-doc__description">
        All project information in one place
      </div>
      <Button type="secondary-lightBlue">
        <Row alignItems="center" wrap>
          Read all doc
          <SVG src={require('src/asset/24px/arrow_right_alt.svg')} flex />
        </Row>
      </Button>
    </div>
  );
}

export default FooterReadDoc;
