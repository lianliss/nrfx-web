import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { WalletIcon } from '../index';
import { NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import currencies from 'src/currencies';

// Styles
import './Currency.less';

function Currency() {
  const params = useSelector((state) => state.router.route.params);

  // Get currency object
  const currency = currencies[params.currency] || null;

  if (!currency) {
    return (
      <div className="Currency">
        <div>{params.currency.toUpperCase()} is not exists</div>
      </div>
    );
  }

  return (
    <CabinetBlock className="Currency">
      <div className="Currency__container">
        <div className="Currency__header">
          <div className="Currency__preview">
            <WalletIcon currency={currency.abbr} size={41} />
            <span className="Currency__currency">{currency.name}</span>
            <span className="Currency__rate">12 USD</span>
            <div className="Currency__currency_amount">
              <NumberFormat number={155} currency={currency.abbr} />
            </div>
            <div className="Currency__currency_amount_rate">
              <NumberFormat number={54.0} currency={'usd'} />
            </div>
          </div>
          <div className="Currency__buttons">
            <div className="col">
              <Button type="secondary-light" shadow>
                Trade
              </Button>
              <Button type="secondary-light" shadow>
                Buy
                <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
              </Button>
            </div>
            <div className="col">
              <Button type="secondary-light" shadow>
                Receive
                <SVG
                  src={require('src/asset/icons/cabinet/card-receive.svg')}
                />
              </Button>
              <Button type="secondary-light" shadow>
                Send
                <SVG src={require('src/asset/icons/cabinet/card-send.svg')} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default Currency;
