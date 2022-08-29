import React from 'react';

import WalletsTotalBalance from '../WalletsTotalBalance/WalletsTotalBalance';
import { Button, DynamicShadow } from 'src/ui';
import SVG from 'utils/svg-wrap';
import { getLang } from 'src/utils';

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
            <Button type="lightBlue" style={{ minWidth: 265 }}>
              <SVG
                src={require('src/asset/icons/cabinet/buy.svg')}
                className="white-icon"
              />
              {getLang('dapp_global_deposit')}
            </Button>
          </DynamicShadow>
        ) : (
          <>
            <Button type="secondary-light">
              <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
              {getLang('global_buy')}
            </Button>
            <Button type="secondary-light">
              <SVG src={require('src/asset/icons/cabinet/card-receive.svg')} />
              {getLang('global_receive')}
            </Button>
            <DynamicShadow>
              <Button type="lightBlue">
                <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
                {getLang('global_send')}
              </Button>
            </DynamicShadow>
          </>
        )}
      </div>
    </div>
  );
}

export default WalletsHeader;
