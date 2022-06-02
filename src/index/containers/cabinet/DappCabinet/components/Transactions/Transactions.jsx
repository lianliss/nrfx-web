import React from 'react';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';

// Styles
import './Transactions.less';

function Transactions() {
  return (
    <CabinetBlock className="Transactions">
      <div className="Transactions__container">
        <p>No recent transactions</p>
      </div>
    </CabinetBlock>
  );
}

export default Transactions;
