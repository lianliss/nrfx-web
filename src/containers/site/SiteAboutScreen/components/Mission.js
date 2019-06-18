import React from 'react';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from './InfoSection';
import { aboutInfo, historyInfo } from '../fixtures';


function Mission() {
  const _renderValues = () => {
    const values = [
      {
        title: 'Технологии и развитие',
        caption: 'Мы стремимся максимально развивать криптовалютное сообщество и расширять доступность цифровых валют. Мы разработали уникальную платформу, которая могла бы сравняться, и даже превзойти традиционные финансовые инструменты. Это не простой путь. К счастью, мы не боимся трудностей и добьемся больших успехов. ',
        icon: require('../asset/change.svg'),
      },
      {
        title: 'Сообщество и пользователи',
        caption: 'Мы и пользователи одно целое. Всегда говорим открыто с людьми, ценим их отзывы и рекомендации, помогая друг другу расти. Делимся самыми передовыми технологиями и новыми возможностями, развивая сообщество. Наши пользователи имеют решающее значение для нашего успеха.',
        icon: require('../asset/community.svg'),
      },
      {
        title: 'Доверие и надежность',
        caption: 'Мы понимаем основные проблемы, с которыми сталкивается криптовалютное сообщество, поэтому стремимся предоставить наиболее надежный и безопасный сервис, выполняя работу качественно и заботясь о пользователях мы выстраиваем с ними доверие. Доверие как основной приоритет платформы, как фундамент свободной финансовой системы.',
        icon: require('../asset/trust.svg'),
      },
    ]

    return values.map(val => (
      <div className="SiteAboutScreen__mission__value" key={val.title}>
        <img className="SiteAboutScreen__mission__value__icon" src={val.icon} alt={val.title}/>
        <div className="SiteAboutScreen__mission__value__cont">
          <h3 className="SiteAboutScreen__mission__value__title">{val.title}</h3>
          <p className="SiteAboutScreen__mission__value__caption">{val.caption}</p>
        </div>
      </div>
    ))
  }

  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg title="Наша миссия" bgTitle="Mission" centered />
        <p className="SiteAboutScreen__caption">
          Мы стремимся к открытой финансовой системе, которая может дать экономическую свободу каждому, уровнять возможности людей, ускоряя тем самым темпы развития во всем мире. Система не контролируемая какой-либо страной или компанией, свободная как «Интернет». Технология блокчейн устраняет преграды на пути к доступности цифровых финансов, что в конечном итоге окажет существенное влияние на мировую экономику.
          Криптовалюта является средством для достижения этой цели, и наша миссия заключается в предоставлении продуктов и услуг, необходимых для развития криптовалюты.
          <br /><br />
          Неважно, кто вы и чем занимаетесь, добро пожаловать в мир цифровых финансов, с надежной и удобной платформой - BITCOINBOT.
        </p>
      </div>

      <div className="SiteAboutScreen__mission__values">
        <h2 className="SiteAboutScreen__mission__values__title">Ценности, которые нас объединяют</h2>

        {_renderValues()}
      </div>

      <InfoSection firstInfo={aboutInfo} secondInfo={historyInfo} />
    </>
  )
}

export default React.memo(Mission);