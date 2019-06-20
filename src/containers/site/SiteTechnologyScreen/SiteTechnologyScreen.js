import './SiteTechnologyScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import FeatureCard from '../../../components/site/FeatureCard/FeatureCard';
import InfoSection from '../../../components/site/InfoSection/InfoSection';
import { misssionInfo, aboutInfo } from '../SiteAboutScreen/fixtures';
import { PHONE } from '../../../constants/breakpoints';


export default class SiteTechnologyScreen extends BaseScreen {
  state = {
    isAllTextVisible: false,
    screenWidth: window.innerWidth,
  }

  componentDidMount() {
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
                Так, в марте 2016 года Ли Седол - один из лучших игроков в настольную игру «Go» проиграл программному обеспечению (AlphaGo), разработанному Google DeepMind. По сравнению с шахматами, «Go» гораздо сложнее и долгое время считалась «вершиной» для исследований в области искусственного интеллекта. 
                <br /><br />
                Не прошли стороной и фондовые рынки. Согласно исследованиям Friedrich-Alexander-Universität (FAU) алгоритмы, основанные на искусственном интеллекте, способны принимать выгодные инвестиционные решения. Изучив индекс «S&P 500» с 1992 по 2015 год алгоритм смог выбрать акции и стратегии, которые приносили годовой доход в виде двузначных цифр. Фонд Medallion (Renaissance Technologies), использующий количественные методы анализа фондового рынка за 20 лет работы смог вернуть +35 % в годовом выражении. 
                <br /><br />
                В ближайшем будущем большую часть рабочих мест на финансовых рынках займут роботы, и это – хорошо, потому что лучшие выпускники университетов теперь смогут развивать отрасли с более ощутимой для населения и планеты пользой – энергетику, образование и медицину. Влияние искусственного интеллекта в индустрии постепенно нарастает, и скоро совершенно изменит ее. 
                <br /><br />
                Команда BitcoinBot прикладывает огромные усилий для развития данной области, создает собственные алгоритмы работы, настраивает и обучает нейронные сети на основе больших баз данных, чтобы сделать торговлю и инвестиции еще более выгодными. Мы добились определённых успехов в данной области. В период с 2017 по 2019 год мы не только смогли сохранить средства инвесторов, но и приумножить их, в том числе благодаря алгоритмам на основе искусственного интеллекта.
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
