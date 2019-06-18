import './SiteInvestmentScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import SitePageInfoBlock from '../../../components/site/SitePageInfoBlock/SitePageInfoBlock';
import TitleWithBg from '../../../components/site/TitleWithBg/TitleWithBg';
import Banner from '../../../components/site/Banner/Banner';
import InfoCard from '../../../components/site/InfoCard/InfoCard';


export default class SiteInvestmentScreen extends BaseScreen {
  render() {
    return (
      <SiteWrapper>
        <SitePageInfoBlock
          hideWatchButton
          image={require('./asset/investment_main_image.svg')}
          title={<span>Инвестиции.pro</span>}
          caption={<span>Приумножайте свой криптовалютный капитал вместе с нами</span>}
          buttonText="Инвестировать"
        />

        <div className="SiteInvestmentScreen__numbers">
          {this._renderNumbers()}
        </div>

        <div className="SiteInvestmentScreen__intro">
          <TitleWithBg title="Что такое Инвестиции.pro?" bgTitle="Investment" bgTitleUppercase centered darkBg />
          <p className="SiteInvestmentScreen__caption">
            Любая покупка криптовалюты является инвестированием, как в саму технологию, так и в конкретный проект.
            Мы даем возможность не только купить криптовалюту, но и инвестировать, приумножив свой собственный капитал.
          </p>
        </div>


        <h2 className="SiteInvestmentScreen__title">Инвестиции.pro - это больше чем депозит</h2>
        {this._renderFeatures()}


        <Banner
          title="Инвестирование никогда не было таким простым"
          caption="Приумножить свой криптокапитал"
          btnText="Инвестировать"
        />

      </SiteWrapper>
    )
  }


  _renderNumbers = () => {
    const dataWithNumbers = [
      {
        title: '4000+',
        caption: 'Открыто депозитов',
      },
      {
        title: '125%',
        caption: 'Выплачено прибыли',
      },
      {
        title: 'x6',
        caption: 'Рост капитала в год',
      },
    ]

    return dataWithNumbers.map(item => (
      <div key={item.title} className="SiteInvestmentScreen__numbers__item">
        <h2 className="SiteInvestmentScreen__numbers__item__title">{item.title}</h2>
        <p className="SiteInvestmentScreen__numbers__item__caption">{item.caption}</p>
      </div>
    ))
  }


  _renderFeatures() {
    const items = [
      {
        icon: require('./asset/investment_feature_1.svg'),
        title: 'Высокая доходность',
        caption: 'Выплачиваем высокую прибыль своим инвесторам, значительно выше той, что представлена на классических фондовых рынках'
      },
      {
        icon: require('./asset/investment_feature_2.svg'),
        title: 'Застрахованный депозит',
        caption: 'Все криптовалютные депозиты наших инвесторов страхуются, формируя таким образом страховой фонд'
      },
      {
        icon: require('./asset/investment_feature_3.svg'),
        title: 'Удобный вывод',
        caption: 'Выводите средства в любое удобное для вас время, хоть каждый день. Вывод средств в кратчайшие сроки'
      },
      {
        icon: require('./asset/investment_feature_4.svg'),
        title: 'Вариативные депозиты',
        caption: 'Гибкая система инвестирования позволит подобрать наиболее удобный и выгодный тарифный план по депозиту, включая выбор из разных криптовалют'
      },
      {
        icon: require('./asset/investment_feature_5.svg'),
        title: 'Надежный партнер',
        caption: 'Проект существует на рынке с 2017 года, за это время команда показала не только отличные результаты, но и смогла зарекомендовать себя, как профессионалов отрасли'
      },
    ].map((item) => {
      return (
        <InfoCard
          key={item.title}
          title={item.title}
          caption={item.caption}
          icon={item.icon}
          className="InvestmentFeature__item"
        />
      )
    });

    return (
      <div className="InvestmentFeature__items">
        {items}
      </div>
    )
  }
}
