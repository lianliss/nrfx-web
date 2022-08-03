import React from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import * as actions from "src/actions";

// Components
import SVG from 'utils/svg-wrap';
import { ContentBox, Button, Timer, BankLogo } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import Lang from "src/components/Lang/Lang";

// Styles
import './FiatSelector.less';

function FiatSelector(props) {
  const isAdaptive = useSelector(adaptiveSelector);
  const rates = useSelector(web3RatesSelector);
  const context = React.useContext(Web3Context);
  const {connectWallet, isConnected, addTokenToWallet} = context;
  const {tokens, selected, onChange, reservation, setReservation} = props;
  const [isSelectToken, setIsSelectToken] = React.useState(false);
  const balance = wei.from(_.get(selected, 'balance', "0"));
  const price = _.get(rates, _.get(selected, 'symbol', '').toLowerCase(), 0);

  function openSelector() {
    if (!isConnected) {
      connectWallet()
        .then(() => setIsSelectToken(true))
        .catch(error => {
          setIsSelectToken(false);
        })
    } else {
      setIsSelectToken(true);
    }
  }

  function topUp() {
    if (reservation) {
      actions.openModal("fiat_refill_card", {
        currency: selected.symbol,
      });
    } else {
      actions.openModal("fiat_topup", {
        currency: selected.symbol,
      });
    }
  }

  return (
    <ContentBox className="FiatSelector">
      <div className="FiatSelector__row">
        <div className="FiatSelector__dropdown">
          <div className="FiatSelector__icon" style={{
            backgroundImage: `url('${_.get(selected, 'logoURI', '')}')`
          }} onClick={openSelector} />
          <div className="FiatSelector__select" onClick={openSelector}>
            <span>{_.get(selected, 'name', 'Unknown')}</span>
            <div className="FiatSelector__currency">
              <span>{_.get(selected, 'symbol', 'Unknown')}</span>
              <SVG
                src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
              />
            </div>
          </div>
        </div>
        <div className="FiatSelector__balance">
          <div className="FiatSelector__balance-number">
            {getFinePrice(balance)}
          </div>
          {(!!balance && !!price) && <div className="FiatSelector__balance-price">
            {getFinePrice(balance * price)}
          </div>}
          <div className="FiatSelector__track" onClick={() => addTokenToWallet(selected)}>
            Track in wallet
          </div>
        </div>
      </div>
      {isSelectToken && <TokenSelect
        onChange={value => {
          onChange(value);
          setIsSelectToken(false);
        }}
        onClose={() => setIsSelectToken(false)}
        selected={selected}
        isAdaptive={isAdaptive}
        {...context}
        tokens={tokens}
        disableSwitcher
        disableCommonBases
        loadAccountBalances={() => {
          console.log('LOAD');
        }}
      />}
      <div className="FiatSelector__actions">
        {!!reservation
          ? <div className="FiatSelector__reservation">
            <div className="FiatSelector__reservation-bank">
              <BankLogo name={reservation.bank} />
            </div>
            <div className="FiatSelector__reservation-status">
              <span>
                <Lang
                  name={
                    reservation.status === "wait_for_pay"
                      ? "cabinet_fiatWallet_waitingForRefill"
                      : "cabinet_fiatWallet_waitingForReview"
                  }
                />
              </span>
              {reservation.status === "wait_for_pay" && <Timer
                hiddenAfterFinish
                onFinish={() => setReservation(null)}
                time={reservation.book_expiration * 1000}
              />}
            </div>
            <Button className="default middle"
                    onClick={() => actions.openModal("fiat_topup_card")}>
              <Lang name="global_open" />
            </Button>
          </div>
          : <>
          {isConnected ? <Button className="default middle" onClick={topUp}>
            <Lang name="cabinet_fiatBalance_add" />
          </Button> : <Button className="default middle" onClick={connectWallet}>
            Connect Wallet
          </Button>}
        </>}
      </div>
    </ContentBox>
  )
}

export default FiatSelector;
