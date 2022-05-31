import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import router from 'src/router';

// Components
import { Button, NumberFormat } from 'src/ui';
import DoubleText from '../../../DoubleText/DoubleText';
import SVG from 'utils/svg-wrap';

// Utils
import { Web3Context } from 'services/web3Provider';
import { openModal } from 'src/actions';
import { toastPush } from 'src/actions/toasts';
import { LIQUIDITY } from 'src/index/constants/pages';

// Styles
import './FarmingAdaptiveItemOptions.less';

function FarmingAdaptiveItemOptions({
  id,
  aviable,
  staked,
  earned,
  currency,
  liquidity,
  arp,
}) {
  const dispatch = useDispatch();
  const { isConnected, connectWallet } = React.useContext(Web3Context);

  return (
    <div className="FarmingAdaptiveItemOptions">
      <div className="row">
        <div className="col statistics">
          <div className="row">
            <div className="col little-title">ARP</div>
            <div className="col">
              <div className="row" onClick={() => openModal('farming_roi')}>
                <span className="link">
                  <NumberFormat number={arp} percent />
                </span>
                <SVG
                  src={require('src/asset/icons/cabinet/calculator-icon.svg')}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col little-title">Liquidity</div>
            <div className="col">
              <div className="row">
                <span className="Number">
                  $<NumberFormat number={liquidity} />
                </span>
                <SVG
                  src={require('src/asset/icons/cabinet/question-icon.svg')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <DoubleText
            first={aviable[0]}
            second={aviable[1]}
            currency={currency}
            title="Aviable"
          />
        </div>
        <div className="col">
          <Button
            type="light"
            onClick={() => router.navigate(LIQUIDITY)}
            className="get-lp"
          >
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
              <DoubleText
                first={staked[0]}
                second={staked[1]}
                currency={currency}
                title="Staked"
              />
            </div>
            <div className="col">
              <div className="row">
                <Button
                  type="lightBlue"
                  className="stake"
                  onClick={() => openModal('stake', {}, { id, currency })}
                >
                  Stake
                </Button>
                <Button
                  type="dark"
                  onClick={() => openModal('unstake', {}, { id, currency })}
                  className="unstake"
                >
                  Unstake
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col">
          <DoubleText
            first={earned[0]}
            second={earned[1]}
            currency={currency}
            title="Earned"
          />
        </div>
        <div className="col">
          <Button
            type="green-light"
            onClick={() => dispatch(toastPush('Harwest 0,55 BNB', 'farming'))}
            className="harvest"
            disabled={!isConnected}
          >
            Harvest
          </Button>
        </div>
      </div>
    </div>
  );
}

FarmingAdaptiveItemOptions.defaultProps = {
  currency: '',
  aviable: [0, 0],
  arp: 0,
  liquidity: 0,
  staked: [0, 0],
  earned: [0, 0],
};

FarmingAdaptiveItemOptions.propTypes = {
  currency: PropTypes.string,
  aviable: PropTypes.arrayOf(PropTypes.number),
  arp: PropTypes.number,
  liquidity: PropTypes.number,
  staked: PropTypes.arrayOf(PropTypes.number),
  earned: PropTypes.arrayOf(PropTypes.number),
};

export default FarmingAdaptiveItemOptions;
