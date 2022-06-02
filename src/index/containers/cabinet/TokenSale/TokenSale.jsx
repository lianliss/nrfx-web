import React from 'react';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import { Form, Input, Button } from 'src/ui';

// Styles
import './TokenSale.less';

function TokenSale() {
  return (
    <div className="TokenSale__wrap">
      <CabinetBlock className="TokenSale">
        <Form>
          <SVG src={require('src/asset/logo/narfex-icon.svg')} />
          <h3>Token Sale</h3>
          <label>
            <p>Amount</p>
            <Input />
          </label>
          <Button type="lightBlue">Aprove</Button>
        </Form>
      </CabinetBlock>
    </div>
  );
}

export default TokenSale;
