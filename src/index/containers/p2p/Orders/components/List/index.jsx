import React from 'react';

// Components
import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { CabinetBlock } from 'dapp';
import { Row, NumberFormat } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import avatar from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';

// Styles
import './index.less';

function List() {
  return (
    <CabinetBlock className="orders-list">
      <CabinetTable
        header={
          <TR>
            <TD>Advertisers (Completion rate)</TD>
            <TD>Price</TD>
            <TD>Limit/Available</TD>
            <TD>Payment</TD>
            <TD>
              Trade <span className="green">0 Fee</span>
            </TD>
          </TR>
        }
      >
        <TR className="orders-list-item">
          <TD>
            <div className="orders-list-user">
              <div className="orders-list-user__profile">
                <img src={avatar} alt="" className="orders-list-user__avatar" />
                <span
                  className="orders-list-user__name "
                  title="mail****@gmail.com"
                >
                  mail****@gmail.com
                </span>
                <SVG
                  src={require('src/asset/icons/status/sucess-13px.svg')}
                  flex
                />
              </div>
              <div className="orders-list-user__info">
                <span>
                  <NumberFormat number={287} /> orders
                </span>
                <span>
                  <NumberFormat number={85.7} percent /> completion
                </span>
              </div>
            </div>
          </TD>
          <TD>
            <NumberFormat number={15333.33} currency="IDR" />
          </TD>
          <TD>
            Available: <NumberFormat number={1000.0} currency="USDT" />
          </TD>
          <TD>Bank Transfer Bank Transfer</TD>
          <TD>Buy N-fiat</TD>
        </TR>
      </CabinetTable>
    </CabinetBlock>
  );
}

export default List;
