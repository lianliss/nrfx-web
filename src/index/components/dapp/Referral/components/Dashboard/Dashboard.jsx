import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import { Row } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Card from '../Card/Card';

// Styles
import './Dashboard.less';

function Dashboard({ items = [] }) {
  return (
    <CabinetBlock className="Referral__Dashboard">
      <h2>Dashboard</h2>
      <Row
        justifyContent="space-between"
        alignItems="center"
        wrap
        className="Referral__Dashboard__cards"
      >
        {items.map((item) => (
          <Card
            firstTitle={item.firstTitle}
            firstCount={item.firstCount}
            firstIcon={item.firstIcon}
            firstQuestion={item.firstQuestion}
            secondTitle={item.secondTitle}
            secondCount={item.secondCount}
            secondIcon={item.secondIcon}
            secondQuestion={item.secondQuestion}
            secondary={item.secondary}
          />
        ))}
      </Row>
    </CabinetBlock>
  );
}

Dashboard.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      firstTitle: PropTypes.string,
      firstCount: PropTypes.string,
      firstIcon: PropTypes.object,
      firstQuestion: PropTypes.string,
      secondTitle: PropTypes.string,
      secondCount: PropTypes.string,
      secondIcon: PropTypes.object,
      secondQuestion: PropTypes.string,
      secondary: PropTypes.bool,
    })
  ),
};

export default Dashboard;
