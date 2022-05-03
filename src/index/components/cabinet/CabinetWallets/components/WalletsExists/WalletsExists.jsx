import React from 'react';

import './WalletsExists.less';
import WalletsHeader from '../WalletsHeader/WalletsHeader';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import CabinetScrollBlock from '../../../CabinetScrollBlock/CabinetScrollBlock';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';

function WalletsExists() {
  return (
    <div className="WalletsExists">
      <div className="WalletsExists__container">
        <WalletsHeader />
        <div className="WalletsExists__content">
          <CabinetBlock>
            <div className="WalletsExists__items_header">
              <span>your tokens</span>
              <div className="CabinetScrollBlock__headerTool">
                <OpenPopupLink title="history" />
              </div>
            </div>
            <CabinetScrollBlock></CabinetScrollBlock>
          </CabinetBlock>
          <CabinetBlock>
            <CabinetScrollBlock>
              <div className="WalletsExists__items_header">
                <span>your nft</span>
                <div className="CabinetScrollBlock__headerTool">
                  <OpenPopupLink title="history" />
                </div>
              </div>
            </CabinetScrollBlock>
          </CabinetBlock>
        </div>
      </div>
    </div>
  );
}

export default WalletsExists;
