import React from 'react';

// Components
import CabinetScrollBlock from 'src/index/components/cabinet/CabinetScrollBlock/CabinetScrollBlock';
import FarmingTableHeader from '../FarmingTableHeader/FarmingTableHeader';
import { NumberFormat, HoverPopup } from 'src/ui';
import DoubleWallets from 'src/index/components/cabinet/DoubleWallets/DoubleWallets';
import FarmingIndicator from '../FarmingIndicator/FarmingIndicator';
import SVG from 'utils/svg-wrap';

// Utils
import useHeightSize from './hooks/useHeightSize';

// Styles
import './FarmingTableAdaptive.less';
import AdaptiveItemOptions from './components/AdaptiveItemOptions/AdaptiveItemOptions';

function FarmingTableAdaptive({ items, ...filters }) {
  // Sort filters from props
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;

  const height = useHeightSize();

  return (
    <div className="FarmingTableAdaptive">
      <FarmingTableHeader
        farms={farms}
        farmsValue={farmsValue}
        setFarmsValue={setFarmsValue}
        sortOptions={sortOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CabinetScrollBlock style={{ height, minHeight: 200 }}>
        <div className="FarmingTableAdaptive__list">
          {items.map((item) => (
            <div className="FarmingTableAdaptive__item" key={item.id}>
              <div className="FarmingTableAdaptive__item_default">
                <div className="row">
                  <div className="col">
                    <DoubleWallets
                      first={item.currencies[0]}
                      second={
                        item.currencies.length === 2 ? item.currencies[1] : ''
                      }
                    />
                  </div>
                  <div className="col">
                    <FarmingIndicator
                      type={item.indicator === 'hot' ? 'red' : 'green'}
                      text={item.indicator === 'hot' ? 'Hot' : 'Latest'}
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
                        <NumberFormat number={item.apy} percent />
                        <HoverPopup
                          content={
                            <p style={{ maxWidth: 300 }}>
                              APY is based on your one-year income if Harvest
                              and Compound are made once a 14 days. Provided APY
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
                    <SVG
                      src={require('src/asset/icons/cabinet/select-arrow.svg')}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <AdaptiveItemOptions
                  id={item.id}
                  aviable={item.aviable}
                  staked={item.staked}
                  earned={item.earned}
                  type={item.type}
                  currency={
                    item.currencies[1] ? item.currencies[1] : item.currencies[0]
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CabinetScrollBlock>
    </div>
  );
}

export default FarmingTableAdaptive;
