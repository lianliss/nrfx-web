import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';

// Styles
import './DoubleWallets.less';

function DoubleWallets({ first, second }) {
  const context = React.useContext(Web3Context);
  const {tokens} = context;
  const [symbol0, setSymbol0] = React.useState(first.symbol);
  const [symbol1, setSymbol1] = React.useState(second.symbol);

  React.useEffect(() => {
    const getSymbol = async (token, index) => {
      if (token.symbol) {
        if (index) {
          if (symbol1 !== token.symbol) {
            setSymbol1(token.symbol);
          }
        } else {
          if (symbol0 !== token.symbol) {
            setSymbol0(token.symbol);
          }
        }
        return;
      }
      if (!token.address) return;
      const contract = context.getTokenContract(token);
      const symbol = await contract.getSymbol();
      if (index) {setSymbol1(symbol)}
      else {setSymbol0(symbol)}
    };
    getSymbol(first, 0).catch(error => {
      console.error('[DoubleWallets][getSymbol]', error);
    });
    getSymbol(second, 1).catch(error => {
      console.error('[DoubleWallets][getSymbol]', error);
    });
  }, [first.symbol, second.symbol, first.address, second.address]);

  const logo0 = first.logoURI || (!!symbol0 && _.get(tokens.find(t => t.symbol === symbol0), 'logoURI'));
  const logo1 = second.logoURI || (!!symbol1 && _.get(tokens.find(t => t.symbol === symbol1), 'logoURI'));

  return (
    <div className="DoubleWallets">
      <div className="DoubleWallets__icons">
        <div className="DoubleWallets__icon" style={{backgroundImage: `url('${logo0}')`}} />
        <div className="DoubleWallets__icon" style={{backgroundImage: `url('${logo1}')`}} />
      </div>
      <span>
        {symbol0 || '???'}
        {first && second && '-'}
        {symbol1 || '???'}
      </span>
    </div>
  );
}

DoubleWallets.propTypes = {
  first: PropTypes.object,
  second: PropTypes.object,
};

DoubleWallets.defaultProps = {
  first: '',
  second: '',
};

export default DoubleWallets;
