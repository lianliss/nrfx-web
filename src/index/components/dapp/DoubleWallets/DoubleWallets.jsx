import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';
import _ from 'lodash';

// Styles
import './DoubleWallets.less';

function DoubleWallets({ first, second, pair, disableSymbols, size }) {
  const context = React.useContext(Web3Context);
  const { tokens, wrapBNB, bnb } = context;
  // const [symbol0, setSymbol0] = React.useState(first.symbol);
  // const [symbol1, setSymbol1] = React.useState(second.symbol);
  const [token0, setToken0] = React.useState(_.get(pair, 'token0', first));
  const [token1, setToken1] = React.useState(_.get(pair, 'token1', second));
  const containerSize = size && size * 2 - size * 2 * 0.1956;
  const sizeStyles = {
    width: size,
    height: size,
  };

  React.useEffect(() => {}, [first, second, pair]);

  // React.useEffect(() => {
  //   const getSymbol = async (token, index) => {
  //     if (token.symbol) {
  //       if (index) {
  //         if (symbol1 !== token.symbol) {
  //           setSymbol1(token.symbol);
  //         }
  //       } else {
  //         if (symbol0 !== token.symbol) {
  //           setSymbol0(token.symbol);
  //         }
  //       }
  //       return;
  //     }
  //     if (!token.address) return;
  //     const contract = context.getTokenContract(token);
  //     const symbol = await contract.getSymbol();
  //     if (index) {setSymbol1(symbol)}
  //     else {setSymbol0(symbol)}
  //   };
  //   getSymbol(first, 0).catch(error => {
  //     console.error('[DoubleWallets][getSymbol]', error);
  //   });
  //   getSymbol(second, 1).catch(error => {
  //     console.error('[DoubleWallets][getSymbol]', error);
  //   });
  // }, [first.symbol, second.symbol, first.address, second.address]);
  //
  // const logo0 = first.logoURI || (!!symbol0 && _.get(tokens.find(t => t.symbol === symbol0), 'logoURI'));
  // const logo1 = second.logoURI || (!!symbol1 && _.get(tokens.find(t => t.symbol === symbol1), 'logoURI'));

  const logo0 = token0.logoURI;
  const logo1 = token1.logoURI;

  const symbol0 = token0.symbol === wrapBNB.symbol ? bnb.symbol : token0.symbol;
  const symbol1 = token1.symbol === wrapBNB.symbol ? bnb.symbol : token1.symbol;

  return (
    <div className="DoubleWallets">
      <div className="DoubleWallets__icons" style={{ width: containerSize }}>
        <div
          className="DoubleWallets__icon"
          style={{ backgroundImage: `url('${logo0}')`, ...sizeStyles }}
        />
        <div
          className="DoubleWallets__icon"
          style={{ backgroundImage: `url('${logo1}')`, ...sizeStyles }}
        />
      </div>
      {!disableSymbols && (
        <span>
          {symbol0 || '???'}
          {!!(token0 && token1) && '-'}
          {symbol1 || '???'}
        </span>
      )}
    </div>
  );
}

DoubleWallets.propTypes = {
  first: PropTypes.any,
  second: PropTypes.any,
  pair: PropTypes.any,
};

DoubleWallets.defaultProps = {
  first: '',
  second: '',
};

export default DoubleWallets;
