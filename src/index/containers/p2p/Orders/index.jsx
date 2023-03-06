import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import P2P from '../P2P';
import ListWrapper from './components/ListWrapper';
import Information from './components/Information';
import Advantages from './components/Advantages';
import FAQ from './components/FAQ';
import Blog from './components/Blog';

// Utils
import { setP2PMode } from 'src/actions/dapp/p2p.js';
import { dappP2PModeSelector } from 'src/selectors';

// Styles
import './index.less';

function Orders({ adaptive }) {
  const dispatch = useDispatch();
  const mode = useSelector(dappP2PModeSelector);

  const handleModeChange = (mode) => {
    dispatch(setP2PMode(mode));
  };

  return (
    <P2P mode={mode}>
      <div className="p2p-orders">
        <ListWrapper adaptive={adaptive} mode={mode} />
        <Information
          adaptive={adaptive}
          mode={mode}
          onModeChange={handleModeChange}
        />
        <Advantages adaptive={adaptive} mode={mode} />
        <FAQ adaptive={adaptive} mode={mode} />
        <Blog adaptive={adaptive} mode={mode} />
      </div>
    </P2P>
  );
}

export default Orders;
