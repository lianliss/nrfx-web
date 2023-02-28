import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import { default as DappFAQ } from 'dapp/FAQ';

// Utils
import faq from '../../constants/faq';

// Styles
import './FAQ.less';

function FAQ({ adaptive, type }) {
  return (
    <div className="Referral__FAQ">
      <h2>FAQ</h2>
      <DappFAQ items={faq[type]} adaptive={adaptive} />
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
