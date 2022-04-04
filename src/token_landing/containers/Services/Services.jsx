import React from 'react';

import { getLang } from 'utils';

import './Services.less';
import Service from '../../components/Service/Service';

import { services } from '../../constants/services';

function Services() {
  return (
    <section className="Services">
      <div className="Services__container">
        <h2 className="Services__title">
          <span className="gradient-text">{getLang('token_landing_services_title_blue')}</span>
          &nbsp;{getLang('token_landing_services_title_black')}
        </h2>
        <div className="Services__items">
          {services.map((item, key) => {
            return <Service {...item} key={key} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
