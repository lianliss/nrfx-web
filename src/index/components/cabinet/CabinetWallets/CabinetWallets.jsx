import React from 'react';

import { Button } from 'src/ui';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';

import './CabinetWallets.less';

function CabinetWallets() {
  return (
    <CabinetBlock className="CabinetWallets">
      <div className="CabinetWallets__container">
        <h1>Your Wallet</h1>
        <p className="CabinetWallets__description">
          The Narfex token facilitates multiple tokenomics, serving as a utility
          token and governance token.
        </p>
        <div className="CabinetWallets__buttons">
          <div className="dynamic-shadow">
            <Button type="lightBlue" size="extra_large">
              <div className="Button__icon">
                <SVG
                  src={require('src/asset/icons/cabinet/empty-wallet-add.svg')}
                />
              </div>
              <div className="Button__content">
                <span>Connect wallet</span>
                <span>example wallet on MetaMask</span>
              </div>
            </Button>
          </div>
          <div className="dynamic-shadow">
            <Button type="lightBlue" size="extra_large">
              <div className="Button__icon">
                <SVG src={require('src/asset/token/wallet.svg')} />
              </div>
              <div className="Button__content">
                <span>Create wallet</span>
                <span>create wallet on our platform</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default CabinetWallets;
