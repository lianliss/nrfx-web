import React from 'react';

import { Row, NumberFormat } from 'ui';
import { LimitAndAvailable, Payment, BuyButton, SellButton } from '..';
import { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { WalletIcon } from 'dapp';

import { p2pMode } from 'src/index/constants/dapp/types';

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
      {props.mode === p2pMode.buy && <BuyButton onClick={props.onTrade} />}
      {props.mode === p2pMode.sell && <SellButton onClick={props.onTrade} />}
    </TD>
  </TR>
);

export default DesktopTR;
