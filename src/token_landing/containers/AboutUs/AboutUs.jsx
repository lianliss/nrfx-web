import React from 'react';
import Benefits from '../../components/Benefits/Benefits';

import './AboutUs.less';

function AboutUs(props) {
  return (
    <section className="AboutUs">
      <h2 className='AboutUs__title'>What is Narfex Token</h2>
      <p className='AboutUs__description'>
        The Narfex token is the governance and utility token of the Nafex
        Ecosystem. The token will be used in the tokenomics of all new products
        and protocols released by the Narfex. NRFX is a multichain token,
        currently available on BSC and Etherium networks.
      </p>

      <Benefits />
      a
    </section>
  );
}

export default AboutUs;
