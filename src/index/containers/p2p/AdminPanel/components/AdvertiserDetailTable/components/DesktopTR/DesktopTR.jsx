import React from 'react';

import { Row, NumberFormat } from 'ui';
import { LimitAndAvailable, Payment, BuyButton } from '..';
import { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { WalletIcon } from 'dapp';

const DesktopTR = (props) => (
  <TR>
    <TD>
      <Row alignItems="center" gap={8}>
        <WalletIcon currency={props.coin} size={24} />
        <span>{props.coin?.symbol.toUpperCase()}</span>
      </Row>
    </TD>
    <TD>
      <NumberFormat number={props.price} currency={props.coin.symbol} />
    </TD>
    <TD>
      <Row>
        <LimitAndAvailable
          available={props.available}
          limits={props.limits}
          selectedCoin={props.selectedCoin}
        />
      </Row>
    </TD>
    <TD>{props.payment && <Payment payment={props.payment} />}</TD>
    <TD>
      <BuyButton onClick={props.onTrade} />
    </TD>
  </TR>
);

export default DesktopTR;
