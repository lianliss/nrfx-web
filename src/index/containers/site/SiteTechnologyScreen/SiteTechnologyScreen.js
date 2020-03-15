import "./SiteTechnologyScreen.less";

import React from "react";

import BaseScreen from "../../BaseScreen";
import TitleWithBg from "../../../components/site/TitleWithBg/TitleWithBg";
import FeatureCard from "../../../components/site/FeatureCard/FeatureCard";
import InfoSection from "../../../components/site/InfoSection/InfoSection";
import { data } from "../SiteAboutScreen/fixtures";
import { PHONE } from "../../../constants/breakpoints";
import * as utils from "../../../../utils/index";

export default class SiteTechnologyScreen extends BaseScreen {
  state = {
    isAllTextVisible: false,
    screenWidth: window.innerWidth
  };

  componentDidMount() {
    window.scroll(0, 0);
    this.updateVisibleText(true);
    window.addEventListener("resize", this.updateVisibleText);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateVisibleText);
  }

  updateVisibleText = isFirst => {
    const { isAllTextVisible, screenWidth } = this.state;

    if (window.innerWidth !== screenWidth || isFirst) {
      if (screenWidth > PHONE && !isAllTextVisible) {
        this.setState({ isAllTextVisible: true });
      } else if (screenWidth <= PHONE && isAllTextVisible) {
        this.setState({ isAllTextVisible: false });
      }

      this.setState({ screenWidth: window.innerWidth });
    }
  };

  showMoreText = () => {
    this.setState({ isAllTextVisible: true });
  };

  render() {
    const { isAllTextVisible } = this.state;

    return (
      <div>
        <div className="Layout_spacing">
          <h1 className="SiteTechnologyScreen__heading">
            {utils.getLang("site__technologyTitle")}
          </h1>

          <p className="SiteTechnologyScreen__intro">
            {utils.getLang("site__technologySubTitle")}
          </p>

          <div className="SiteTechnologyScreen__description">
            <TitleWithBg
              title={utils.getLang("site__technologyArtificialIntelligence")}
              bgTitle={utils.getLang("site__technologyArtificialIntelligence")}
              centered
              darkBg
            />
            <p className="SiteTechnologyScreen__description__text">
              {utils.getLang("site__technologyArtificialIntelligenceText")}
            </p>
            <br />
            <br />

            {isAllTextVisible ? (
              <p className="SiteTechnologyScreen__description__text">
                {utils.getLang("site__technologyDescriptionText")}
              </p>
            ) : null}

            {!isAllTextVisible ? (
              <p
                className="SiteTechnologyScreen__see_more"
                onClick={this.showMoreText}
              >
                {utils.getLang("site__technologyReadMore")}
              </p>
            ) : null}
          </div>

          <div className="SiteTechnologyScreen__features">
            <h2 className="SiteTechnologyScreen__title">
              {utils.getLang("site__technologyQuestionTitle")}
            </h2>
            {this._renderFeatures()}
          </div>

          <InfoSection
            firstInfo={data.misssionInfo}
            secondInfo={data.aboutInfo}
          />
        </div>
      </div>
    );
  }

  _renderFeatures() {
    const features = [
      {
        caption: utils.getLang("site__technologyAnswers1")
      },
      {
        caption: utils.getLang("site__technologyAnswers2")
      },
      {
        caption: utils.getLang("site__technologyAnswers3")
      },
      {
        caption: utils.getLang("site__technologyAnswers4")
      },
      {
        caption: utils.getLang("site__technologyAnswers5")
      },
      {
        caption: utils.getLang("site__technologyAnswers6")
      }
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
