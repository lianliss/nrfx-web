import React from 'react';

// Components
import CabinetBlock from '../../../../../CabinetBlock/CabinetBlock';
import CabinetScrollBlock from '../../../../../CabinetScrollBlock/CabinetScrollBlock';
import OpenPopupLink from '../../../../../OpenPopupLink/OpenPopupLink';
import Overlay from '../../../../../ui/Overlay/Overlay';
import WalletsNFTCard from '../../../WalletsNFTCard/WalletsNFTCard';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';

function NftsBlock({ adaptive }) {
  const NFTsExists = false;

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
          {NFTsExists ? (
            <>
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
            </>
          ) : (
            Array(6)
              .fill({})
              .map((_, key) => <WalletsNFTCard key={key} />)
          )}
        </div>
      </CabinetScrollBlock>
      {adaptive && <div className="WalletsExists__items_footer"></div>}
      {!NFTsExists && (
        <Overlay>
          <SVG src={require('src/asset/icons/status/empty-image.svg')} />
          <h3>{getLang('global_comingSoon')}</h3>
        </Overlay>
      )}
    </CabinetBlock>
  );
}

export default React.memo(NftsBlock);
