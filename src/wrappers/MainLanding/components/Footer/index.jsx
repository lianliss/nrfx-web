import React from 'react';
import { Link } from 'react-router5';

// Components
import { Row, Col, Container } from 'ui';
import SocialLinks from 'src/landings/Main/components/SocialLinks';
import FooterReadDoc from '../FooterReadDoc';

// Utils
import socialLinkTypes from 'src/landings/Main/constants/socialLinkTypes';
import { getLang } from 'utils';
import * as pages from 'src/index/constants/pages';
import company from 'src/index/constants/company';

// Styles
import './index.less';

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
                <Link routeName={pages.TOKEN}>
                  {getLang('main_landing_navbar_token')}
                </Link>
                <Link routeName={pages.DAPP_PRO_DEX}>
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
              <h6>{getLang('landing_footer_about')}</h6>
              <div className="MainLandingWrapperFooter-nav__items">
                <a href={company.docs} target="_blank">
                  {getLang('landing_footer_docs')}
                </a>
                <a href={company.docsTeam} target="_blank">
                  {getLang('dapp_sidebar_more_team')}
                </a>
                <a href={company.github} target="_blank">
                  Github
                </a>
                <a href={company.audit} target="_blank">
                  {getLang('dapp_sidebar_more_audit')}
                </a>
                <Link routeName="">
                  {getLang('landing_footer_terms_of_use')}
                </Link>
                <Link routeName="">{getLang('landing_footer_privacy')}</Link>
              </div>
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
          <span className="copyright">2023 All rights reserved</span>
          <Col className="MainLandingWrapperFooter-social-links">
            <SocialLinks type={socialLinkTypes.icons} wrap={false} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
