import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { WalletIcon } from '../index';
import { NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import currencies from 'src/currencies';
import { isFiat } from 'utils';
import { openModal } from 'src/actions';

// Styles
import './Currency.less';
import Transaction from './components/Transaction/Transaction';

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
            {isFiat(currency.abbr) ? (
              <Button
                type="lightBlue"
                shadow
                onClick={() => openModal('deposit_balance')}
              >
                <SVG
                  src={require('src/asset/icons/cabinet/buy.svg')}
                  className="white-icon"
                />
                Deposit
              </Button>
            ) : (
              <>
                <div className="col">
                  <Button type="secondary-light" shadow>
                    <SVG src={require('src/asset/icons/cabinet/trade.svg')} />
                    Trade
                  </Button>
                  <Button type="secondary-light" shadow>
                    <SVG src={require('src/asset/icons/cabinet/buy.svg')} />
                    Buy
                  </Button>
                </div>
                <div className="col">
                  <Button type="secondary-light" shadow>
                    <SVG
                      src={require('src/asset/icons/cabinet/card-receive.svg')}
                    />
                    Receive
                  </Button>
                  <Button type="secondary-light" shadow>
                    <SVG
                      src={require('src/asset/icons/cabinet/card-send.svg')}
                    />
                    Send
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="Currency__body">
          <CabinetBlock className="Currency__transactions">
            <div className="Currency__transactions__header">
              <h3>Transaction history</h3>
            </div>
            <div className="Currency__transactions__body">
              <ul className="Currency__dates">
                <li className="Currency__date">
                  <h4>May 25</h4>
                  <div>
                    <Transaction currency={currency} bank="Tinkoff" />
                    <Transaction
                      currency={currency}
                      type="withdrawal"
                      transactionsExists={false}
                    />
                  </div>
                </li>
                <li className="Currency__date">
                  <h4>May 24</h4>
                  <div>
                    <Transaction currency={currency} />
                    <Transaction currency={currency} />
                  </div>
                </li>
              </ul>
            </div>
          </CabinetBlock>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default Currency;
