import React from 'react';

// Components
import { CabinetModal } from 'dapp';

// Styles
import './Exchanger.less';

function Exchanger() {
  return (
    <CabinetModal className="ExchangerModal">
      <div className="ExchangerModal__container">
        <h3>Exchange</h3>
      </div>
    </CabinetModal>
  );
}

export default Exchanger;
