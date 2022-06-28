import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './ReferralList.less';

function ReferralList({ title, subtitle, items }) {
  return (
    <div className="Referral__ReferralList">
      <Row alignItems="flex-end" justifyContent="space-between">
        <Col>
          <h2>{title}</h2>
          <p className="subtitle">{subtitle}</p>
        </Col>
      </Row>
      <Col className="Referral__ReferralList__items">
        {!items.length && (
          <Row justifyContent="center">
            <Col
              className="Referral__ReferralList__items-empty"
              alignItems="center"
            >
              <div className="logo">
                <SVG src={require('src/asset/icons/narfex/white-icon.svg')} />
              </div>
              <p>No Data</p>
            </Col>
          </Row>
        )}
      </Col>
    </div>
  );
}

ReferralList.propTypes = {
  items: PropTypes.array,
};

ReferralList.defaultProps = {
  items: [],
};

export default ReferralList;
