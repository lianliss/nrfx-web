import React from 'react';

// Components
import { NumberFormat, HoverPopup } from 'src/ui';
import DoubleWallets from 'src/index/components/cabinet/DoubleWallets/DoubleWallets';
import FarmingIndicator from '../../../FarmingIndicator/FarmingIndicator';
import FarmingAdaptiveItemOptions from '../FarmingAdaptiveItemOptions/FarmingAdaptiveItemOptions';
import SVG from 'utils/svg-wrap';

import './FarmingAdaptiveItem.less';

function FarmingAdaptiveItem({
  id,
  currencies,
  indicator,
  aviable,
  staked,
  earned,
  type,
  apy,
}) {
  return (
    <div className="FarmingAdaptiveItem" key={id}>
      <div className="FarmingAdaptiveItem_default">
        <div className="row">
          <div className="col">
            <DoubleWallets
              first={currencies[0]}
              second={currencies.length === 2 ? currencies[1] : ''}
            />
          </div>
          <div className="col">
            <FarmingIndicator
              type={indicator === 'hot' ? 'red' : 'green'}
              text={indicator === 'hot' ? 'Hot' : 'Latest'}
            />
          </div>
          <div className="col">
            <HoverPopup
              content={
                <span>
                  View contract
                  <SVG
                    src={require('src/asset/icons/export.svg')}
                    style={{ marginLeft: 12 }}
                  />
                </span>
              }
              className="small-popup"
              type="top"
              size="small"
              windowRight={28}
              windowLeft={28}
            >
              <SVG
                src={require('src/asset/icons/warning-blue.svg')}
                style={{ width: 14, height: 14 }}
              />
            </HoverPopup>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="FarmingTableAdaptive__cell">
              <span className="little-title">APY</span>
              <span>
                <NumberFormat number={apy} percent />
                <HoverPopup
                  content={
                    <p style={{ maxWidth: 300 }}>
                      APY is based on your one-year income if Harvest and
                      Compound are made once a 14 days. Provided APY
                      calculations depend on current APR rates.
                    </p>
                  }
                  left
                  windowLeft={28}
                  windowRight={28}
                >
                  <SVG
                    src={require('src/asset/icons/cabinet/question-icon.svg')}
                    className="FarmingTableAdaptive__icon-question"
                  />
                </HoverPopup>
              </span>
            </div>
          </div>
          <div className="col">
            <div className="FarmingTableAdaptive__cell">
              <span className="little-title">Earned</span>
              <span>—</span>
            </div>
          </div>
          <div className="col">
            <SVG src={require('src/asset/icons/cabinet/select-arrow.svg')} />
          </div>
        </div>
      </div>
      <div className="row">
        <FarmingAdaptiveItemOptions
          id={id}
          aviable={aviable}
          staked={staked}
          earned={earned}
          type={type}
          currency={currencies[1] ? currencies[1] : currencies[0]}
        />
      </div>
    </div>
  );
}

export default FarmingAdaptiveItem;
