import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import FarmingTable from './components/FarmingTable/FarmingTable';

// Styles
import './Farming.less';

function Farming({ adaptive }) {
  return (
    <CabinetBlock className="Farming">
      <div className="Farming__header">
        <div className="row">
          <h1>Farming</h1>
        </div>
        <div className="row">
          <p>
            Earn fees and rewards by depositing and staking your tokens to the
            platform.
          </p>
        </div>
      </div>
      <FarmingTable adaptive={adaptive} />
    </CabinetBlock>
  );
}

Farming.defaultProps = {
  adaptive: false,
};

export default Farming;
