import React from 'react';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { NumberFormat, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'src/utils';

// Styles
import './TransactionHistory.less';
import CabinetTable, { TR, TD } from '../CabinetTable/CabinetTable';
import { Web3Context } from '../../../../services/web3Provider';
import DoubleWallets from '../DoubleWallets/DoubleWallets';
import WalletIcon from '../WalletIcon/WalletIcon';

const accountHistory = [
  {
    type: 'topup',
    source_currency: 'RUB',
    target_currency: 'RUB',
    source_amount: 22000,
    target_amount: 22000,
    timestamp: 1666282025,
  },
  {
    type: 'exchange',
    source_currency: 'RUB',
    target_currency: 'USDT',
    source_amount: 22000,
    target_amount: 334.342,
    timestamp: 1666282429,
  },
];

function TransactionHistory() {
  const { getAccountHistory, accountAddress, getTokenFromSymbol } =
    React.useContext(Web3Context);

  // React.useEffect(() => {
  //   getAccountHistory().then(console.log);
  // }, [accountAddress]);

  return (
    <CabinetBlock className="TransactionHistory__wrap">
      <div className="TransactionHistory">
        <h1 className="TransactionHistory__title">Transaction History</h1>
        <p className="TransactionHistory__description">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <div className="TransactionHistory__table">
          <CabinetTable
            header={
              <TR>
                <TD>Date</TD>
                <TD>Operation</TD>
                <TD>Currency</TD>
                <TD>Status</TD>
                <TD></TD>
              </TR>
            }
          >
            {accountHistory.map((item, key) => {
              const firstToken = getTokenFromSymbol(item.source_currency);
              const secondToken = getTokenFromSymbol(item.target_currency);
              let icon =
                item.type === 'exchange' ? (
                  <DoubleWallets first={firstToken} second={secondToken} />
                ) : (
                  <WalletIcon currency={firstToken} />
                );

              return (
                <TR key={key}>
                  <TD color="gray">10.01.2022</TD>
                  <TD>Top up</TD>
                  <TD>
                    <Row>
                      {icon}
                      <NumberFormat number={1500000} currency="usd" />
                    </Row>
                  </TD>
                  <TD type="small" color="gray">
                    Approved
                  </TD>
                  <TD color="blue">Link</TD>
                </TR>
              );
            })}
          </CabinetTable>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
