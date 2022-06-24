import React from 'react';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import { Row } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './Dashboard.less';
import Card from '../Card/Card';

function Dashboard() {
  const CardIcon = ({ src, background }) => (
    <div className="icon-container" style={{ background }}>
      <SVG src={src} />
    </div>
  );

  return (
    <CabinetBlock className="Referral__Dashboard">
      <h2>Dashboard</h2>
      <Row
        justifyContent="space-between"
        alignItems="center"
        wrap
        className="Referral__Dashboard__cards"
      >
        <Card
          firstIcon={
            <CardIcon
              src={require('src/asset/icons/cabinet/team-icon.svg')}
              background="#fff"
            />
          }
          firstTitle="Active Friends / Total Friends"
          firstCount="0/0"
          firstQuestion="Active Friends / Total Friends"
          secondIcon={
            <CardIcon
              src={require('src/asset/icons/narfex/white-icon.svg')}
              background="var(--blue-light-gradient)"
            />
          }
          secondTitle="Total earned"
          secondCount="0.0000 NRFX / 0.00 USD"
          secondary
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
