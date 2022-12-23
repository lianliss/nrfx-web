import React from 'react';
import { Link } from 'react-router5';

// Components
import { Row, Col, Container } from 'ui';
import SocialLinks from 'src/landings/Main/components/SocialLinks';
import FooterReadDoc from '../FooterReadDoc';

// Utils
import socialLinksType from 'src/landings/Main/constants/socialLinksType';
import { getLang } from 'utils';
import * as pages from 'src/index/constants/pages';

// Styles
import './index.less';
import company from '../../../../index/constants/company';

function Footer({ adaptive }) {
  return (
    <footer className="MainLandingWrapperFooter">
      <Container maxWidth={1293} padding={adaptive ? 15 : 38}>
        <Row
          className="MainLandingWrapperFooter__main"
          justifyContent="space-between"
          wrap
        >
          <nav className="MainLandingWrapperFooter-nav">
            <Col className="MainLandingWrapperFooter-nav__col">
              <h6>{getLang('site__footerProducts')}</h6>
              <div className="MainLandingWrapperFooter-nav__items">
                <Link routeName={pages.TOKEN_LANDING}>
                  {getLang('main_landing_navbar_token')}
                </Link>
                <Link routeName={pages.DAPP_EXCHANGE}>
                  {getLang('dapp_sidebar_exchanger')}
                </Link>
                <Link routeName={pages.DAPP_SWAP}>
                  {getLang('main_landing_footer_dex')}
                </Link>
                <Link routeName={pages.LIQUIDITY}>
                  {getLang('dapp_sidebar_liquidity')}
                </Link>
                <Link routeName={pages.FARMING}>
                  {getLang('dapp_farming_page_title')}
                </Link>
                <Link routeName={pages.VALIDATOR}>
                  {getLang('dapp_sidebar_validator')}
                </Link>
              </div>
            </Col>
            <Col className="MainLandingWrapperFooter-nav__col">
              <h6>{getLang('site__footerCompany')}</h6>
              <Col className="MainLandingWrapperFooter-nav__items">
                <Link routeName={pages.NARFEX_DAO}>
                  {getLang('landing_footer_company')}
                </Link>
                <a
                  href={company.docs + '/narfex/faq/narfex-platform'}
                  target="_blank"
                >
                  {getLang('landing_footer_faq')}
                </a>
              </Col>
            </Col>
            <Col className="MainLandingWrapperFooter-nav__col">
              <h6>{getLang('site__footerLegacy')}</h6>
              <Col className="MainLandingWrapperFooter-nav__items">
                <Link routeName="">{getLang('landing_footer_privacy')}</Link>
                <Link routeName="">{getLang('landing_footer_terms')}</Link>
              </Col>
            </Col>
          </nav>
          <FooterReadDoc />
        </Row>
        <Row
          className="MainLandingWrapperFooter-footer MainLandingWrapperFooter__footer"
          alignItems="center"
          justifyContent={adaptive ? 'center' : 'flex-start'}
          wrap={adaptive}
        >
          <img
            src={require('src/asset/logo/narfex-blue.svg').default}
            alt="Narfex"
            className="MainLandingWrapperFooter__logo"
          />
          <span className="copyright">2022 All right reserved</span>
          <Col className="MainLandingWrapperFooter-social-links">
            <SocialLinks type={socialLinksType.icons} wrap={false} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
