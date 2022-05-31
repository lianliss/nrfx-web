import React from 'react';

// Components
import { Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { Web3Context } from 'services/web3Provider';

function AdaptiveItemOptions() {
  const { isConnected, connectWallet } = React.useContext(Web3Context);

  return (
    <div className="FarmingTableAdaptive__options">
      <div className="row">
        <div className="col">ARP</div>
        <div className="col">75</div>
      </div>
      <div className="row">
        <div className="col">Liquidity</div>
        <div className="col">$7 100 650</div>
      </div>
      <div className="row">
        <div className="col">
          <div className="FarmingTableAdaptive__cell-options">
            <div className="row">Aviable BNB</div>
            <div className="row">0,005 BNB / $15</div>
          </div>
        </div>
        <div className="col">
          <Button type="light" onClick={() => router.navigate(LIQUIDITY)}>
            <SVG src={require('src/asset/icons/cabinet/add-icon.svg')} />
            Get LP
          </Button>
        </div>
      </div>
      <div className="row">
        {!isConnected ? (
          <>
            <Button
              type="lightBlue"
              onClick={connectWallet}
              style={{ width: '100%' }}
            >
              Connect Wallet
            </Button>
          </>
        ) : (
          <>
            <div className="col">
              <div className="FarmingTableAdaptive__cell-options">
                <div className="row">Staked BNB</div>
                <div className="row">15,50 BNB / $750</div>
              </div>
            </div>
            <div className="col">
              <Button
                type="lightBlue"
                className="stake"
                onClick={() => {
                  openModal('stake', {}, { id, currency });
                  handleTypeChange('staked');
                }}
              >
                Stake
              </Button>
              <Button
                type="dark"
                onClick={() => {
                  openModal('unstake', {}, { id, currency });
                  handleTypeChange('stake');
                }}
                className="unstake"
              >
                Unstake
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default AdaptiveItemOptions;
