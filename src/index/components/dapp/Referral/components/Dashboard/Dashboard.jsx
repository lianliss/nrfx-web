import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import { Row } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Card from '../Card/Card';

// Styles
import './Dashboard.less';

function Dashboard({ children }) {
  return (
    <CabinetBlock className="Referral__Dashboard">
      <h2>Dashboard</h2>
      <Row
        justifyContent="flex-start"
        alignItems="center"
        wrap
        className="Referral__Dashboard__cards"
      >
        {children}
      </Row>
    </CabinetBlock>
  );
}

export default Dashboard;
