import './SiteTechnologyScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import FeatureCard from '../../../components/site/FeatureCard/FeatureCard';
import InfoSection from '../../../components/site/InfoSection/InfoSection';
import { misssionInfo, aboutInfo } from '../SiteAboutScreen/fixtures';
import { PHONE } from '../../../constants/breakpoints';
import * as utils from '../../../utils/index';


export default class SiteTechnologyScreen extends BaseScreen {
  state = {
    isAllTextVisible: false,
    screenWidth: window.innerWidth,
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.updateVisibleText(true);
    window.addEventListener('resize', this.updateVisibleText);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateVisibleText);
  }

  updateVisibleText = (isFirst) => {
    const { isAllTextVisible, screenWidth } = this.state;

    if ((window.innerWidth !== screenWidth) || isFirst) {
      if (screenWidth > PHONE && !isAllTextVisible) {
        this.setState({ isAllTextVisible: true });
      } else if (screenWidth <= PHONE && isAllTextVisible) {
        this.setState({ isAllTextVisible: false });
      }

      this.setState({ screenWidth: window.innerWidth });
    }
  }

  showMoreText = () => {
    this.setState({ isAllTextVisible: true });
  }

  render() {
    const { isAllTextVisible } = this.state;

    return (
      <SiteWrapper withOrangeBg>
        <div className="Layout_spacing">
          <h1 className="SiteTechnologyScreen__heading">{this.lang.site.technologyTitle}</h1>

          <p className="SiteTechnologyScreen__intro">
            {this.lang.site.technologySubTitle}
          </p>

          <div className="SiteTechnologyScreen__description">
            <TitleWithBg title={this.lang.site.technologyArtificialIntelligence} bgTitle="Artificial Intelligence" centered darkBg />
            <p className="SiteTechnologyScreen__description__text">
              {this.lang.site.technologyArtificialIntelligenceText}
            </p>
            <br /><br />

            {isAllTextVisible
              ? (
                <p className="SiteTechnologyScreen__description__text">
                  {utils.nl2br(this.lang.site.technologyDescriptionText)}
                </p>
              )
              : null}

            {!isAllTextVisible
              ? <p className="SiteTechnologyScreen__see_more" onClick={this.showMoreText}>{this.lang.site.technologyReadMore}</p>
              : null}
          </div>

          <div className="SiteTechnologyScreen__features">
            <h2 className="SiteTechnologyScreen__title">{this.lang.site.technologyQuestionTitle}</h2>
            {this._renderFeatures()}
          </div>

          <InfoSection firstInfo={misssionInfo} secondInfo={aboutInfo} />

        </div>
      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const features = [
      {
        caption: this.lang.site.technologyAnswers1,
      },
      {
        caption: this.lang.site.technologyAnswers2,
      },
      {
        caption: this.lang.site.technologyAnswers3,
      },
      {
        caption: this.lang.site.technologyAnswers4,
      },
      {
        caption: this.lang.site.technologyAnswers5,
      },
      {
        caption: this.lang.site.technologyAnswers6,
      },
    ];

    return (
      <div className="SiteTechnologyScreen__features__items">
        {features.map((feat, i) => (
          <FeatureCard key={i} title={feat.title} caption={feat.caption} />
        ))}
      </div>
    );
  }
}
