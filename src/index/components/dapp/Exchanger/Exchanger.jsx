import React from 'react';
import { useSelector } from 'react-redux';

import CabinetContent from '../CabinetContent/CabinetContent';
import Instruction from './components/Instruction/Instruction';
import ExchangerSwap from './components/ExchangerSwap/ExchangerSwap';
import ExchangerTopup from './components/ExchangerTopup/ExchangerTopup';

// Utils
import _ from 'lodash';
import { getLang } from 'src/utils';
import WatchVideo from './components/WatchVideo';
import useExchanger from 'src/hooks/dapp/useExchanger';
import useUpdateReservation from 'src/hooks/dapp/useUpdateReservation';
import { Web3Context } from 'services/web3Provider';
import web3Backend from 'services/web3-backend';

// Styles
import './Exchanger.less';

const UPDATE_DELAY = 5000;
let cardsUpdateTimeout;
let cardsUpdate;

function Exchanger() {
  const { accountAddress, isConnected, chainId } =
    React.useContext(Web3Context);
  const {
    fiatTokens,
    coins,
    fiatSelected,
    coinSelected,
    setFiat,
    setCoin,
    isAdaptive,
    fiatsLoaded,
  } = useExchanger();
  const fiatSymbol = _.get(fiatSelected, 'symbol', '');
  const reservation = useSelector((state) =>
    _.get(state, `fiat.topup.${fiatSymbol}`)
  );
  const [limits, setLimits] = React.useState([]);

  // Reservation
  const { updateReservation, updateBanks } = useUpdateReservation();

  /**
   * Updates the current reservation with current selected fiat
   */
  cardsUpdate = () => {
    if (!isConnected || !accountAddress || !fiatSelected) {
      if (reservation && reservation[fiatSymbol]) {
        dispatch({
          type: actionTypes.FIAT_TOPUP_DELETE,
          payload: fiatSymbol,
        });
      }
    } else {
      updateReservation(fiatSymbol);
    }
    cardsUpdateTimeout = setTimeout(() => cardsUpdate(), UPDATE_DELAY);
  };

  const getLimits = async () => {
    web3Backend
      .getLimits()
      .then((data) => {
        setLimits(data);
      })
      .catch((error) => {
        console.error('[Exchanger][getLimits]', error);
        setTimeout(getLimits, 5000);
      });
  };

  React.useEffect(() => {
    cardsUpdate();
    return () => {
      clearTimeout(cardsUpdateTimeout);
    };
  }, [accountAddress, chainId, isConnected, fiatSelected]);

  React.useEffect(() => {
    updateBanks();
    getLimits();
  }, []);

  return (
    <CabinetContent className="Exchanger__wrap">
      <div className="Exchanger">
        <h2>{getLang('dapp_exchanger_page_title')}</h2>
        <div className="Exchanger__content">
          <ExchangerTopup
            fiats={fiatTokens}
            coins={coins}
            fiat={fiatSelected}
            coin={coinSelected}
            setFiat={setFiat}
            setCoin={setCoin}
            limits={limits}
            {...{ reservation }}
          />
          {!isAdaptive && <WatchVideo adaptive={isAdaptive} />}
          <ExchangerSwap
            fiats={fiatTokens}
            fiatsLoaded={fiatsLoaded}
            coins={coins}
            fiat={fiatSelected || fiatTokens[0]}
            coin={coinSelected}
            setFiat={setFiat}
            setCoin={setCoin}
            limits={limits}
            {...{ reservation }}
          />
          {isAdaptive && <WatchVideo adaptive={isAdaptive} />}
          <Instruction />
        </div>
      </div>
    </CabinetContent>
  );
}

export default Exchanger;
