import React from 'react';

// Components
import LineBreaker from 'src/ui/components/LineBreaker/LineBreaker';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { Row, Col } from 'src/ui';
import Card from './components/Card/Card';

// Utils
import { getLang } from 'src/utils';
import team from './constants/team';

// Styles
import './Team.less';

function Team() {
  return (
    <CabinetBlock className="Team">
      <Col className="Team__container">
        <Col className="Team__header">
          <h1>Narfex Team</h1>
          <p className="Team__description">
            <LineBreaker
              text={getLang(
                "We have an international team of dedicated and experienced professionals\n that is always ready to move forward, accomplish global goals, and meet users' expectations."
              )}
            />
          </p>
        </Col>
        <Row wrap className="Team__cards">
          {team.map((item, index) => (
            <Card {...item} key={item + index} />
          ))}
        </Row>
      </Col>
    </CabinetBlock>
  );
}

export default Team;
