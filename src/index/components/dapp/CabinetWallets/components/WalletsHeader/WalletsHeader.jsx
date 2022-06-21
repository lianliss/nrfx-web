import React from 'react';

import WalletsTotalBalance from '../WalletsTotalBalance/WalletsTotalBalance';
import { Button, DynamicShadow } from 'src/ui';
import SVG from 'utils/svg-wrap';

import './WalletsHeader.less';

function WalletsHeader({ isFiat }) {
  return (
    <div className="WalletsHeader">
      <div className="WalletsHeader__col">
        <WalletsTotalBalance amount={1} totalType="up" total={1} />
      </div>
      <div className="WalletsHeader__col">
        {isFiat ? (
          <DynamicShadow>
            <Button type="lightBlue">
              <SVG
                src={require('src/asset/icons/cabinet/buy.svg')}
                className="white-icon"
              />
              Deposit
            </Button>
          </DynamicShadow>
        ) : (
          <>
            <Button type="secondary-light">
              <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
              Buy
            </Button>
            <Button type="secondary-light">
              <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
              Receive
            </Button>
            <DynamicShadow>
              <Button type="lightBlue">
                <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
                Send
              </Button>
            </DynamicShadow>
          </>
        )}
      </div>
    </div>
  );
}

export default WalletsHeader;
