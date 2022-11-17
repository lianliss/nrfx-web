import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import { Row, Col, DropdownElement } from 'src/ui';
import LineBreaker from 'src/ui/components/LineBreaker/LineBreaker';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';
import { currentLangSelector } from 'src/selectors';

// Styles
import './FAQ.less';

function FAQ({ adaptive, type }) {
  const lang = useSelector(currentLangSelector);
  const [items, setItems] = React.useState([]);
  const leftColumnItems = items.filter((__, i) => i % 2 === 0);
  const rightColumnItems = items.filter((__, i) => i % 2 !== 0);

  React.useEffect(() => {
    setItems(getItems());
  }, [lang]);

  const getItems = () => {
    const findedQuestions = Array(18)
      .fill({})
      .map((__, index) => {
        const questionLang = `dapp_referral_faq_${type}_${index + 1}_question`;
        const question = getLang(questionLang);
        const answerLang = `dapp_referral_faq_${type}_${index + 1}_answer`;
        const answer = getLang(answerLang);

        if (questionLang === question) {
          return null;
        }

        return { question, answer: answer === answerLang ? '' : answer };
      })
      .filter((item) => item);

    return findedQuestions;
  };

  const FAQItem = ({ question, answer }) => {
    return (
      <DropdownElement
        dropElement={
          <p>
            <LineBreaker text={answer} />
          </p>
        }
      >
        <Row justifyContent="space-between" alignItems="center">
          <p>
            <LineBreaker text={question} />
          </p>
          <SVG
            src={require('src/asset/icons/arrows/dropdown-small-bordered.svg')}
          />
        </Row>
      </DropdownElement>
    );
  };

  return (
    <div className="Referral__FAQ">
      <h2>FAQ</h2>
      <Row wrap={adaptive}>
        <Col className="Referral__FAQ__items">
          {leftColumnItems.map((item, key) => (
            <FAQItem question={item.question} answer={item.answer} key={key} />
          ))}
        </Col>
        <Col className="Referral__FAQ__items">
          {rightColumnItems.map((item, key) => (
            <FAQItem question={item.question} answer={item.answer} key={key} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

FAQ.propTypes = {
  type: PropTypes.oneOf(['exchanger', 'farming']),
  adaptive: PropTypes.bool,
};

FAQ.defaultProps = {
  type: 'exchanger',
  adaptive: false,
};

export default FAQ;
