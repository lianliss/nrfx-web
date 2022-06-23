import React from 'react';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import { NumberFormat, Row, Col } from 'src/ui';

// Styles
import './Dashboard.less';
import Card from '../Card/Card';

function Dashboard() {
  const card = React.useRef(null);

  React.useEffect(() => {
    // console.log(card.current.parentNode.offsetHeight);
  }, []);

  return (
    <CabinetBlock className="Referral__Dashboard">
      <h2>Dashboard</h2>
      <Row
        justifyContent="space-between"
        alignItems="center"
        className="Referral__Dashboard__cards"
      >
        <Card
          firstTitle="Active Friends / Total Friends"
          firstCount="0/0"
          secondTitle="Total earned"
          secondCount="0.0000 NRFX / 0.00 USD"
        />
        <Card
          firstTitle="Total NRFX buyers friends"
          firstCount="0"
          secondTitle="Total NRFX earned"
          secondCount="0.0000 NRFX"
        />
        <Card
          firstTitle="Total Fiat deposit friends "
          firstCount="0"
          secondTitle="Total Fiat earned"
          secondCount="0.00 USD"
        />
      </Row>
    </CabinetBlock>
  );
}

export default Dashboard;
