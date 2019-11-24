import React from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { data } from '../fixtures';
import * as utils from '../../../../../utils';


function About({ lang }) {
  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg title={lang.site__aboutShortTitle} bgTitle={lang.site__aboutShortTitle} centered />
        <p className="SiteAboutScreen__caption">{utils.nl2br(lang.site__aboutShortTitleText)}</p>
      </div>

      <div className="SiteAboutScreen__career">
        <SVG src={require('../asset/about__career.svg')} />
        <h2 className="SiteAboutScreen__career__title">{lang.site__aboutWorkBitcoinbotTitle}</h2>
        <p className="SiteAboutScreen__career__caption">{utils.nl2br(lang.site__aboutWorkBitcoinbotTitleText)}</p>
        <a href="/contact" className="SiteAboutScreen__link">{lang.site_aboutContact}</a>
      </div>

      <InfoSection firstInfo={data.misssionInfo} secondInfo={data.historyInfo} />
    </>
  )
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
});

export default React.memo(connect(mapStateToProps)(About));