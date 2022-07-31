import React from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';

// Components
import CabinetContent from '../CabinetContent/CabinetContent';
import SwapForm from '../SwapForm/SwapForm';
import Instruction from './components/Instruction/Instruction';
import { Button, ContentBox } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import FiatSelector from './components/FiatSelector/FiatSelector';

// Utils
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import { openModal } from 'src/actions';
import { LOGIN } from 'src/components/AuthModal/fixtures';

// Styles
import './Exchanger.less';

function Exchanger({ adaptive }) {
  const isAdaptive = useSelector(adaptiveSelector);
  const rates = useSelector(web3RatesSelector);
  const context = React.useContext(Web3Context);
  const [selected, setSelected] = React.useState(null);
  const {
    fiats, chainId, accountAddress,
    web3, updateFiats, isConnected,
  } = context;
  const userId = `${chainId}${accountAddress}`;
  const tokens = _.get(fiats, userId, []).map(token => {
    const price = _.get(rates, token.symbol.toLowerCase());
    return price ? {...token, price} : token;
  });

  React.useEffect(() => {
    if (!isConnected || !accountAddress) return;
    updateFiats().then(fiats => {
      if (!selected) {
        setSelected(fiats[userId][0]);
      }
    });
  }, [accountAddress, chainId, isConnected]);

  return (
    <CabinetContent className="Exchanger__wrap">
      <div className="Exchanger">
        <h2>Exchanger</h2>
        <div className="Exchanger__content">
          <FiatSelector tokens={tokens} selected={selected} onChange={setSelected} />
          <Instruction />
        </div>
      </div>
    </CabinetContent>
  );
}

export default Exchanger;
