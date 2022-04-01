import React from 'react';
import Benefits from '../../components/Benefits/Benefits';

import { getLang } from 'utils';
import './AboutUs.less';

function AboutUs() {
  return (
    <section className="AboutUs">
      <h2 className="AboutUs__title">
        {getLang('token_landing_about_us_title')}
      </h2>
      <p className="AboutUs__description">
        {getLang('token_landing_about_us_description')}
      </p>
      <Benefits />
    </section>
  );
}

export default AboutUs;
