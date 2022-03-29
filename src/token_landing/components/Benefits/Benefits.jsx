import React from 'react';

import Benefit from './components/Benefit/Benefit';
import './Benefits.less';

import { benefits } from '../../constants/benefits';

function Benefits() {
  return (
    <section className="Benefits">
      {benefits.map((item, key) => (
        <Benefit {...item} key={key} />
      ))}
    </section>
  );
}

export default Benefits;
