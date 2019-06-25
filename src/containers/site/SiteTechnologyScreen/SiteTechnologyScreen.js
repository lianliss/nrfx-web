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
        <h1 className="SiteTechnologyScreen__heading">Технологии BITCOINBOT</h1>

        <p className="SiteTechnologyScreen__intro">
          Мы используем передовые технологии и решения для нашей платформы и создаем новые, уникальные в своем роде. Одна из наших сфер развития, которой мы уделяем особое внимание - это искусственный интелект.
        </p>

        <div className="SiteTechnologyScreen__description">
          <TitleWithBg title="Искусственный интеллект" bgTitle="Artificial Intelligence" centered darkBg />

          <p className="SiteTechnologyScreen__description__text">
            Искусственный интеллект уже вошел в нашу жизнь, такие компании как Google, Apple, Facebook и многие другие применяют механизмы анализа данных для предоставления пользователям информации, интересующей именно их. Распознавание изображения и речи являются типичными областями применения. Но сфера применения машинного обучения намного шире.
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
            ? <p className="SiteTechnologyScreen__see_more" onClick={this.showMoreText}>Читать далее</p>
            : null}

        </div>

        <div className="SiteTechnologyScreen__features">
          <h2 className="SiteTechnologyScreen__title">Почему мы создаем и развиваем собственные сети?</h2>

          {this._renderFeatures()}
        </div>


        <InfoSection firstInfo={misssionInfo} secondInfo={aboutInfo} />

      </SiteWrapper>
    )
  }

  _renderFeatures() {
    const features = [
      {
        caption: 'Позволяет выстраивать стратегию на следующий торговый день, прогнозирует цены для всех видов активов',
      },
      {
        caption: 'Помогает выявлять случаи манипулирования рынком',
      },
      {
        caption: 'Показывает большую эффективность по сравнению с пассивной стратегией (buy/hold)',
      },
      {
        caption: 'Увеличивает процент выигрышных сделок и значительно превосходит средний уровень прибыльности рынка',
      },
      {
        caption: 'Помогает для формировании финансовых инструментов ценообразования',
      },
      {
        caption: 'Обрабатывает огромные массивы данных и постоянно совершенствуют свои прогнозы',
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
