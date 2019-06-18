import React from 'react';
import SVG from 'react-inlinesvg';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { misssionInfo, historyInfo } from '../fixtures';


function About() {
  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg title="Коротко" bgTitle="In Brief" centered />
        <p className="SiteAboutScreen__caption">
          BITCOINBOT.PRO основана в 2017 году. Мы – международная команда специалистов в сферах IT и финансов, а также в различных областях, таких как электронная коммерция и машинное обучение. Объединенные желанием изменить мир, используя свои знания и опыт мы создали единый надежный инструмент для удобного управления своими финансами с применением передовых технологий.
          <br /><br />
          Платформа – это продукт кропотливой работы команды профессионалов с многолетним опытом. Мы заработали свою репутацию благодаря качественной и безотказной работе, а также высокому уровню продуктов. Ядро платформы – является нашей гордостью и одним из лучших технологических решений в своем классе.
        </p>
      </div>

      <div className="SiteAboutScreen__career">
        <SVG src={require('../asset/about__career.svg')} />
        <h2 className="SiteAboutScreen__career__title">Работа в BITCOINBOT:</h2>
        <p className="SiteAboutScreen__career__caption">
          Хотите работать с нами? <br />
          Если вы верите в наше видение и разделяете нашу страсть, мы приглашаем вас подать заявку.
        </p>
        <a href="#" className="SiteAboutScreen__link">Связаться</a>
      </div>


      <InfoSection firstInfo={misssionInfo} secondInfo={historyInfo} />
    </>
  )
}

export default React.memo(About);