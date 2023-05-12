import React from 'react';
import { useSelector } from 'react-redux';

// Components
import P2P from '../P2P';
import Header from './components/Header';
import { FAQ, CabinetBlock } from 'dapp';
import { Chat, Feedback, Process } from './components';

// Utils
import faq from '../constants/faq';
import { dappP2PModeSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';
import { getOrderProcess } from '../utils/order';
import { orderProcesses } from 'src/index/constants/dapp/types';
import { openStateModal } from 'src/actions';

// Styles
import './index.less';

const testOrder = {
  buy: {
    mode: p2pMode.buy,
    status: 'pending',
  },
  sell: { mode: p2pMode.sell, status: 'pending' },
};

function Order({ adaptive, visitorMode = 'user' }) {
  // Order will be order from data by backend.
  const visitorIsModerator = visitorMode === 'moderator';
  const globalP2PMode = useSelector(dappP2PModeSelector);
  const [order, setOrder] = React.useState(testOrder[globalP2PMode]);
  const { mode } = order;
  const process = getOrderProcess(mode, order.status);

  const handleNotifySeller = () => {
    openStateModal('p2p_payment_confirmation', {
      mode,
      onConfirm: () => {
        // ...
        setOrder((prev) => ({ ...prev, status: 'pending' }));
      },
    });
  };

  const handlePaymentReceived = () => {
    openStateModal('p2p_payment_confirmation', {
      mode,
      onConfirm: () => {
        // ...
        setOrder((prev) => ({ ...prev, status: 'completed' }));
      },
    });
  };

  const handleCancel = () => {
    // ...
    if (mode === p2pMode.buy) {
      setOrder((prev) => ({ ...prev, status: 'cancelled' }));
    }
  };

  // The test order pending.
  React.useEffect(() => {
    if (process === orderProcesses.buy.pending) {
      setTimeout(() => {
        setOrder((prev) => ({ ...prev, status: 'completed' }));
      }, 60_000);
    }

    if (process === orderProcesses.sell.pending) {
      setTimeout(() => {
        setOrder((prev) => ({ ...prev, status: 'releasing' }));
      }, 60_000);
    }
  }, [process]);

  return (
    <P2P>
      <div className="p2p-order">
        <Header
          adaptive={adaptive}
          process={process}
          from="USDT"
          to="IDR"
          fromAmount={200}
          toAmount={15000}
        />
        <div className="p2p-order-body">
          <div className="p2p-order-body__left">
            <Process
              process={process}
              adaptive={adaptive}
              mode={mode}
              onNotifySeller={handleNotifySeller}
              onPaymentReceived={handlePaymentReceived}
              onCancel={handleCancel}
              visitorMode={visitorMode}
            />
            {!visitorIsModerator && (
              <>
                <Feedback adaptive={adaptive} />
                <CabinetBlock className="p2p-order-body__faq">
                  <h3>FAQ</h3>
                  <FAQ items={faq.order} doubleColumn={false} />
                </CabinetBlock>
              </>
            )}
          </div>
          {!adaptive && (
            <div className="p2p-order-body__right">
              <Chat />
            </div>
          )}
        </div>
      </div>
    </P2P>
  );
}

export default Order;
