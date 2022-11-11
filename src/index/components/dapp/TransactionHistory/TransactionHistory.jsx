import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionTableAdaptive from './components/TransactionTableAdaptive/TransactionTableAdaptive';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import Overlay from '../ui/Overlay/Overlay';
import { Button, Col } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang, classNames as cn } from 'src/utils';
import _ from 'lodash';
import { dataStatus } from 'src/index/constants/dapp/types';
import { openStateModal } from 'src/actions';
import { statusEqual } from './utils/actions';
import useTransactionHistory from 'src/hooks/useTransactionHistory';

// Styles
import './TransactionHistory.less';

function TransactionHistory() {
  const {
    adaptive,
    isConnected,
    accountHistory,
    mappedTestHistory,
    transactions,
    accountHistoryExists,
  } = useTransactionHistory();

  const Transactions = ({ accountHistory }) => {
    const component = adaptive ? (
      <TransactionTableAdaptive
        adaptive={true}
        accountHistory={accountHistory}
      />
    ) : (
      <TransactionTable accountHistory={accountHistory} />
    );

    return component;
  };

  return (
    <CabinetBlock className="TransactionHistory__wrap">
      <div className="TransactionHistory">
        <h1 className="TransactionHistory__title">
          {getLang('dapp_transaction_history_title')}
        </h1>
        <p className="TransactionHistory__description">
          {getLang('dapp_transaction_history_description')}
        </p>
        <div className="TransactionHistory__table">
          <div
            className={cn({
              TransactionHistory__table__container: true,
              blur: !accountHistoryExists,
            })}
          >
            {accountHistoryExists ? (
              <Transactions accountHistory={accountHistory} />
            ) : (
              <Transactions
                accountHistory={
                  adaptive ? mappedTestHistory.slice(0, 4) : mappedTestHistory
                }
              />
            )}
          </div>
          {!accountHistoryExists && (
            <Overlay>
              <Col alignItems="center">
                {statusEqual(transactions.status, dataStatus.LOADING) ? (
                  <LoadingStatus status="loading" />
                ) : (
                  <>
                    <span className="DappUI__Overlay-empty">
                      {getLang('dapp_transactions_empty_yet')}
                    </span>
                    {!isConnected && (
                      <Button
                        type="lightBlue"
                        size="extra_large"
                        onClick={() => openStateModal('connect_to_wallet')}
                      >
                        <SVG
                          src={require('src/asset/icons/cabinet/connect-wallet.svg')}
                        />
                        {getLang('dapp_global_connect_wallet')}
                      </Button>
                    )}
                  </>
                )}
              </Col>
            </Overlay>
          )}
        </div>
      </div>
    </CabinetBlock>
  );
}

export default TransactionHistory;
