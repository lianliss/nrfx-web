import React from 'react';
import { useSelector } from 'react-redux';

// Components
import P2P from '../P2P';
import Header from './components/Header';
import { FAQ, CabinetBlock } from 'dapp';
import Chat from './components/Chat';
import Process from './components/Process';

// Utils
import faq from '../constants/faq';
import { dappP2PModeSelector } from 'src/selectors';
import processes from './constants/processes';

// Styles
import './index.less';

function Order({ adaptive }) {
  const mode = useSelector(dappP2PModeSelector);
  const [process, setProcess] = React.useState(processes.pending);

  return (
    <P2P>
      <div className="p2p-order">
        <Header adaptive={adaptive} />
        <div className="p2p-order-body">
          <div className="p2p-order-body__left">
            <Process process={process} adaptive={adaptive} mode={mode} />
            <CabinetBlock className="p2p-order-body__faq">
              <h3>FAQ</h3>
              <FAQ items={faq.order} doubleColumn={false} />
            </CabinetBlock>
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
