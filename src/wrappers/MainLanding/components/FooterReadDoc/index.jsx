import React from 'react';

// Components
import { Button, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';
import company from 'src/index/constants/company';

// Styles
import './index.less';

function FooterReadDoc() {
  return (
    <div className="MainLandingWrapperFooter-read-doc">
      <div className="MainLandingWrapperFooter-read-doc__title">
        {getLang('footer_documentation_card_title')}
      </div>
      <div className="MainLandingWrapperFooter-read-doc__description">
        {getLang('footer_documentation_card_subtitle')}
      </div>
      <Button
        type="secondary-lightBlue"
        href={'https://' + company.social.medium}
        target="_blank"
      >
        <Row alignItems="center" wrap>
          {getLang('footer_documentation_card_button')}
          <SVG src={require('src/asset/24px/arrow_right_alt.svg')} flex />
        </Row>
      </Button>
    </div>
  );
}

export default FooterReadDoc;
