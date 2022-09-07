import React from 'react';

// Components
import HaveAQuestion from '../../../components/HaveAQuestion/HaveAQuestion';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

function Main({ onNext }) {
  const [invoiceLoaded, setInvoiceLoaded] = React.useState(false);

  return (
    <div className="SwiftGenerated__main">
      <div className="SwiftGenerated__row">
        <h3>Your invoice is generated</h3>
      </div>
      <div className="SwiftGenerated__row">
        <p>Download the invoice and make a Swift transfer in the amount</p>
        <strong>of 0000 USD</strong>
      </div>
      <div className="SwiftGenerated__row">
        <HaveAQuestion />
      </div>
      <div className="SwiftGenerated__row">
        <Button
          type="lightBlue"
          onClick={() => setInvoiceLoaded(true)}
          disabled={invoiceLoaded}
        >
          {invoiceLoaded ? 'Invoice loaded' : 'Download Invoice'}
        </Button>
      </div>
      <div className="SwiftGenerated__row">
        <div className="SwiftGenerated__next" onClick={onNext}>
          Next
          <SVG src={require('src/asset/icons/arrows/form-dropdown.svg')} />
        </div>
      </div>
    </div>
  );
}

export default Main;
