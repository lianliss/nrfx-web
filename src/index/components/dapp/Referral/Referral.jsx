import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { WalletIcon } from '../index';
import { NumberFormat, Button, Row, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { DAPP } from '../../../constants/pages';

// Styles
import './Referral.less';

function Referral() {
  const { router } = useRoute();
  const params = useSelector((state) => state.router.route.params);
  const { type } = params;

  // Redirect to DAPP page, if type !== exchange or farming.
  if (type !== 'exchange') {
    router.navigate(DAPP);
  }

  return (
    <CabinetBlock className="Referral">
      <Row justifyContent="space-between">
        <Col>
          <h1>Invite your friends. Earn cryptocurrency together</h1>
          <p>
            Earn up to 20% from friends&#8217; swap commission on Narfex and 5%
            from their earmings on Farms & Launchpools
          </p>
          <span>Read more ›</span>
        </Col>
        <Col className="Referral__information">
          <CabinetBlock>
            <Row alignItems="center" justifyContent="space-between">
              <h2>Copy Referral Link</h2>
              <Col>
                <Row alignItems="center" className="create-new-link">
                  <span className='strong'>Create new link</span>
                  <SVG
                    src={require('src/asset/icons/cabinet/add-icon-blue.svg')}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              
            </Row>
            <Row></Row>
          </CabinetBlock>
        </Col>
      </Row>
    </CabinetBlock>
  );
}

export default Referral;
