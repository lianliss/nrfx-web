import React from 'react';

// Components
import { Row, Col, DropdownElement } from 'src/ui';
import LineBreaker from 'src/ui/components/LineBreaker/LineBreaker';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';

// Styles
import './FAQ.less';

function FAQ({ adaptive }) {
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
          <SVG src={require('src/asset/icons/arrows/dropdown-medium.svg')} />
        </Row>
      </DropdownElement>
    );
  };

  return (
    <div className="Referral__FAQ">
      <h2>FAQ</h2>
      <Row wrap={adaptive}>
        <Col className="Referral__FAQ__items">
          <FAQItem
            question={getLang('Where do get my referral link?')}
            answer={getLang(
              'How much crypto can I earn via the Swap\n Referral Program?'
            )}
          />
          <FAQItem
            question={getLang('How do I Invite a referral friends?  ')}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'Are there separate balances for referral rewards from friends Swaps, Farms, Launchpools?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang('How do I generate a new referral link?')}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang('Where are all my generated referral links?')}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'In what crypto currency the referral commission is accounted to my referral balance?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'Are there fees for referral rewards withdrawal from referral balances?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang('How does profit sharing work?')}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
        </Col>
        <Col className="Referral__FAQ__items">
          <FAQItem
            question={getLang(
              'How much crypto can I earn via the Swap Referral Program?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'Is Referral Program Active for all Launchpools?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'Is the Swap referral program active for all swap pairs?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'How much can I earn from my friends Farms & Launchpools?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'Can I profit from the Referral Program without any investments from my side?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'When will I get my referral reward from Farms & Launchpools?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
          <FAQItem
            question={getLang(
              'What percentage of Swap referral rewards will I earn if I have 0 BSW staked in BSW Holder Pool?'
            )}
            answer="Connect a wallet and find your referral link in the Referral section."
          />
        </Col>
      </Row>
    </div>
  );
}

export default FAQ;
