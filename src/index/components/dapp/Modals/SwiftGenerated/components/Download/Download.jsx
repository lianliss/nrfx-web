import React from 'react';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import {setInvoice} from "src/actions/dapp/wallet";

// Components
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';
import { getLang } from 'utils';

// Styles
import './Download.less';

function Download({ onIPaidClick, onBack, onClose, currency }) {
  const dispatch = useDispatch();
  const [isProcess, setIsProcess] = React.useState(false);
  const context = React.useContext(Web3Context);
  const {uploadInvoiceScreenshot, getInvoice, reviewInvoice} = context;
  const invoice = useSelector(state => _.get(state, `dapp.invoices.${currency}`));
  if (!invoice) {
    onClose();
    return <></>;
  }
  
  const isScreenshotUploaded = !!invoice.screenshot && invoice.screenshot.length;
  
  const upload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('id', `invoiceInput${invoice.id}`);
    input.setAttribute('accept', 'image/png, image/jpeg');
    input.setAttribute('style', 'display: none');
    input.addEventListener('change', async event => {
      setIsProcess(true);
      try {
        const file = event.target.files[0];
        await uploadInvoiceScreenshot(currency, file);
        const newInvoice = await getInvoice(currency);
        const invoiceObject = {};
        invoiceObject[currency] = newInvoice;
        dispatch(setInvoice(invoiceObject));
      } catch (error) {
        console.error('Screenshot upload error', error);
      }
      setIsProcess(false);
    });
    document.body.appendChild(input);
    input.click();
  };
  
  const onReview = async () => {
    setIsProcess(true);
    await reviewInvoice(currency);
    const newInvoice = await getInvoice(currency);
    const invoiceObject = {};
    invoiceObject[currency] = newInvoice;
    dispatch(setInvoice(invoiceObject));
    setIsProcess(false);
  };

  return (
    <div className="SwiftGenerated__download">
      <div className="SwiftGenerated__row">
        <div className="SwiftGenerated__download__title">
          <div className="back" onClick={onBack}>
            <SVG src={require('src/asset/icons/arrows/dropdown-medium.svg')} />
          </div>
          <h3>{getLang('dapp_swift_transfer')}</h3>
          <span className="close" onClick={onClose}>
            <SVG src={require('src/asset/icons/close-popup.svg')} />
          </span>
        </div>
      </div>
      <div className="SwiftGenerated__row">
        <Button
          type={!isScreenshotUploaded ? 'lightBlue' : 'secondary-alice'}
          size="large"
          disabled={isProcess}
          state={isProcess ? 'loading' : ''}
          onClick={upload}
        >
          {isScreenshotUploaded
            ? getLang('dapp_screenshot_uploaded')
            : getLang('dapp_upload_a_screenshot')}
        </Button>
        <Button
          disabled={!isScreenshotUploaded}
          shadow={!isScreenshotUploaded}
          state={isProcess ? 'loading' : ''}
          type={isScreenshotUploaded ? 'lightBlue' : 'secondary-alice'}
          size="large"
          onClick={onReview}
        >
          {getLang('dapp_i_paid')}
        </Button>
      </div>
    </div>
  );
}

export default Download;
