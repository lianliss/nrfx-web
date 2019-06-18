import './SiteFaqScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import UI from '../../../ui';
import Question from './components/Question';


const questions = {
  general: [
    {
      question: 'How is BitcoinBot different?',
      answer: '- Answer',
    },
    {
      question: 'Who are your partners?',
      answer: '— We’d like to thank our partners for their continuous support in legal matters: Brown Rudnick LLP, Nägele Rechtsanwälte GmbH, Ernst & Young AG, IdentityMind Global, GN Treuhand Establishment.',
    },
    {
      question: 'Are there jobs available at BitcoinBot?',
      answer: '— We’d like to thank our partners for their continuous support in legal matters: Brown Rudnick LLP, Nägele Rechtsanwälte GmbH, Ernst & Young AG, IdentityMind Global, GN Treuhand Establishment.',
    },
    {
      question: 'How is BitcoinBot different? 3',
      answer: '— We’d like to thank our partners for their continuous support in legal matters: Brown Rudnick LLP, Nägele Rechtsanwälte GmbH, Ernst & Young AG, IdentityMind Global, GN Treuhand Establishment.',
    },
  ],
  another: [
    {
      question: 'How is BitcoinBot different 2?',
      answer: '- Answer',
    },
    {
      question: 'Who are your partners 2?',
      answer: '— We’d like to thank our partners for their continuous support in legal matters: Brown Rudnick LLP, Nägele Rechtsanwälte GmbH, Ernst & Young AG, IdentityMind Global, GN Treuhand Establishment.',
    },
  ]
}


export default class SiteFaqScreen extends BaseScreen {
  _renderQuestions = (questions) => {
    return questions.map(q => (
      <Question key={q.question} question={q.question} answer={q.answer} />
    ))
  }

  render() {
    return (
      <SiteWrapper withOrangeBg>
        <div className="SiteFaqScreen__heading">
          <h1 className="SiteFaqScreen__heading__title">FAQ</h1>
          <p className="SiteFaqScreen__heading__subtitle">Мы составили список часто задаваемых вопросов</p>
        </div>

        <UI.Search placeholder="Есть вопрос? Задайте поисковый запрос" />


        <div className="SiteFaqScreen__questions">
          <div className="SiteFaqScreen__questions__section">
            <h2 className="SiteFaqScreen__questions__title">General Inquiries</h2>

            {this._renderQuestions(questions.general)}
          </div>
          <div className="SiteFaqScreen__questions__section">
            <h2 className="SiteFaqScreen__questions__title">Another Inquiries</h2>

            {this._renderQuestions(questions.another)}
          </div>
        </div>


        <div className="SiteFaqScreen__more_questions">
          <img src={require('./asset/questions.svg')} alt="Questions" />

          <p className="SiteFaqScreen__more_questions__text">
            Остались вопросы? Просто напишите нам 
            <br />
            <a className="SiteFaqScreen__more_questions__email" href="mailto:someone@example.com?Subject=Hello%20again" target="_top">
              support@bitcoinbot.com
            </a>
          </p>
        </div>

      </SiteWrapper>
    )
  }
}
