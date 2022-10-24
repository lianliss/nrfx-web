import React from 'react';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';

// Utils
import { getLang } from 'src/utils';

// Styles
import './TransactionHistory.less';

function TransactionHistory() {
  return <CabinetBlock className="TransactionHistory__wrap"></CabinetBlock>;
}

export default TransactionHistory;
