import React from 'react';

import SVG from 'utils/svg-wrap';
import largeTotalArrow from 'src/asset/icons/total-arrow-large.svg';
import { RateIndicator } from 'src/ui';
import './WalletsExists.less';

function WalletsExists() {
  return (
    <div className="WalletsExists">
      <div className="WalletsExists__container">
        <div className="WalletsExists__header">
          <div className="WalletsExists__col">
            <div className="WalletTotalBalance">
              <div className="WalletTotalBalance__icon">
                <div className="WalletTotalBalance__icon-bg" />
                <SVG
                  src={require('src/asset/icons/cabinet/sidebar/wallet.svg')}
                  style={{}}
                />
              </div>
              <div className="WalletTotalBalance__content">
                <div className="WalletTotalBalance__col">
                  <span className="WalletTotalBalance__text-medium">
                    total balance
                  </span>
                  <span className="WalletTotalBalance__text-large">
                    $434.54
                  </span>
                </div>
                <div className="WalletTotalBalance__col">
                  <div>
                    <RateIndicator
                      number={54}
                      procent
                      type="up"
                      icon={largeTotalArrow}
                    />
                    <SVG
                      src={require('src/asset/icons/cabinet/large-arrow-bottom.svg')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="WalletsExists__col"></div>
        </div>
      </div>
    </div>
  );
}

export default WalletsExists;
