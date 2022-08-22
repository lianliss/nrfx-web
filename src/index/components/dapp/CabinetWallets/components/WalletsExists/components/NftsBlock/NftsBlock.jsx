import React from 'react';

// Components
import CabinetBlock from '../../../../../CabinetBlock/CabinetBlock';
import CabinetScrollBlock from '../../../../../CabinetScrollBlock/CabinetScrollBlock';
import OpenPopupLink from '../../../../../OpenPopupLink/OpenPopupLink';
import WalletsNFTCard from '../../../WalletsNFTCard/WalletsNFTCard';

function NftsBlock({ adaptive }) {
  return (
    <CabinetBlock className="nfts">
      {!adaptive && (
        <div className="WalletsExists__items_header">
          <span>NFT</span>
          <div className="CabinetScrollBlock__headerTool"></div>
        </div>
      )}
      <CabinetScrollBlock disableTrackXMousewheelScrolling>
        <div className="WalletsNFT__cards">
          <WalletsNFTCard title="Monkey" src={'1'} />
          <WalletsNFTCard title="Hello Kitty 1445" src={'2'} />
          <WalletsNFTCard title="Degen Ape 6" src={'4'} />
          <WalletsNFTCard title="Degen Ape 6" src={'5'} />
          <WalletsNFTCard title="Brod 45" src={'3'} />
          <WalletsNFTCard title="Monkey" src={'1'} />
          <WalletsNFTCard title="Hello Kitty 1445" src={'2'} />
          <WalletsNFTCard title="Degen Ape 6" src={'4'} />
          <WalletsNFTCard title="Degen Ape 6" src={'5'} />
          <WalletsNFTCard title="Brod 45" src={'3'} />
          <WalletsNFTCard title="Hello Kitty 1445" src={'2'} />
          <WalletsNFTCard title="Degen Ape 6" src={'5'} />
          <WalletsNFTCard title="Brod 45" src={'3'} />
        </div>
      </CabinetScrollBlock>
      {adaptive && <div className="WalletsExists__items_footer"></div>}
    </CabinetBlock>
  );
}

export default React.memo(NftsBlock);
