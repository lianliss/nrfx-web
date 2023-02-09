import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import CabinetModal from '../CabinetModal/CabinetModal';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import { web3RatesSelector } from 'src/selectors';

function TokenSelectAction({ type, onClose, onSelected }) {
  const { tokens, fiats, getTokenBalanceKey, getFiatsArray, network } =
    React.useContext(Web3Context);
  const [selected, setSelected] = React.useState(tokens[0]);
  const rates = useSelector(web3RatesSelector);

  const [fiatTokens, setFiatTokens] = React.useState([]);

  const handleSelectedChange = (token) => {
    setSelected(token);
    onSelected(token);
    onClose();
  };

  React.useEffect(() => {
    if (type !== 'fiats') return;
    const newFiatTokens = getFiatsArray(rates);

    setFiatTokens(newFiatTokens);
  }, [fiats]);

  return (
    <CabinetModal closeOfRef onClose={onClose}>
      <TokenSelect
        tokens={tokens}
        fiats={fiatTokens}
        selected={selected}
        commonBases={network.commonBases}
        onChange={handleSelectedChange}
        defaultList={type}
        getTokenBalanceKey={getTokenBalanceKey}
        onClose={onClose}
        disableSwitcher
      />
    </CabinetModal>
  );
}

TokenSelectAction.propTypes = {
  type: PropTypes.oneOf(['tokens', 'fiats', 'all']),
  onClose: PropTypes.func,
  onSelected: PropTypes.func,
};

TokenSelectAction.defaultProps = {
  type: 'all',
  onClose: () => {},
  onSelected: () => {},
};

export default TokenSelectAction;
