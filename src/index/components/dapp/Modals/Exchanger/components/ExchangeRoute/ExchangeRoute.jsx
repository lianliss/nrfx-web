import React from 'react';

// Components
import { DexRoute } from 'dapp';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import { web3RatesSelector } from 'src/selectors';
import { useSelector } from 'react-redux';

function ExchangeRoute({ route }) {
  const rates = useSelector(web3RatesSelector);
  const { getFiatsArray, tokens, fiats } = React.useContext(Web3Context);
  const [allTokens, setAllTokens] = React.useState([]);

  React.useEffect(() => {
    const fiats = getFiatsArray(rates);
    setAllTokens([...tokens, ...fiats]);
  }, [fiats, tokens]);

  return <DexRoute tokens={allTokens} route={route} />;
}

export default React.memo(ExchangeRoute);
