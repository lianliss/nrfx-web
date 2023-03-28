import React from 'react';

// Components
import { Row, Col, DropdownElement } from 'src/ui';
import LineBreaker from 'src/ui/components/LineBreaker/LineBreaker';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';

// Styles
import './index.less';

function FAQ({ items, adaptive }) {
  const leftColumnItems = items.filter((__, i) => i % 2 === 0);
  const rightColumnItems = items.filter((__, i) => i % 2 !== 0);

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
            flex
          />
        </Row>
      </DropdownElement>
    );
  };

  return (
    <Row wrap={adaptive} className="DappFAQ">
      <Col className="DappFAQ__items">
        {leftColumnItems.map((item, key) => (
          <FAQItem
            question={getLang(item.question)}
            answer={getLang(item.answer)}
            key={key}
          />
        ))}
      </Col>
      <Col className="DappFAQ__items">
        {rightColumnItems.map((item, key) => (
          <FAQItem
            question={getLang(item.question)}
            answer={getLang(item.answer)}
            key={key}
          />
        ))}
      </Col>
    </Row>
  );
}

export default FAQ;
