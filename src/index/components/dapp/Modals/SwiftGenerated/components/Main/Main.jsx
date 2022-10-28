import React from 'react';
import { Web3Context } from 'services/web3Provider';
import { useDispatch, useSelector } from 'react-redux';
import * as toast from 'src/actions/toasts';
import { getLang } from 'utils';

// Components
import HaveAQuestion from '../../../components/HaveAQuestion/HaveAQuestion';
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

function Main(props) {
  const {onNext, currency} = props;
  const [isProcess, setIsProcess] = React.useState(false);
  const [isDownloaded, setIsDownloaded] = React.useState(false);
  const context = React.useContext(Web3Context);
  const {getInvoicePDF} = context;
  const invoice = useSelector(state => _.get(state, `dapp.invoices.${currency}`));
  if (!invoice) {
    props.onClose();
    return <></>;
  }

  const onDownload = async () => {
    setIsProcess(true);
    try {
      await getInvoicePDF(invoice.id);
      setIsDownloaded(true);
    } catch (error) {
      console.error('[onDownload]', error);
      toast.error(error.message);
    }
    setIsProcess(false);
  };

  return (
    <div className="SwiftGenerated__main">
      <div className="SwiftGenerated__row">
        <h3>{getLang('dapp_swift_generated_modal_title')}</h3>
      </div>
      <div className="SwiftGenerated__row">
        <p>{getLang('dapp_swift_generated_modal_description')}</p>
        <strong>
          {getLang('dapp_swift_generated_modal_of')} {invoice.amount} {currency}
        </strong>
      </div>
      <div className="SwiftGenerated__row">
        <HaveAQuestion />
      </div>
      <div className="SwiftGenerated__row">
        <Button
          type={isDownloaded ? 'secondary' : 'lightBlue'}
          onClick={onDownload}
          state={isProcess ? 'loading' : ''}
        >
          {getLang('dapp_button_download_invoice')}
        </Button>
      </div>
      <div className="SwiftGenerated__row">
        {isDownloaded ? (
          <Button type="lightBlue" onClick={onNext}>
            {getLang('global_next')}
          </Button>
        ) : (
          <div className="SwiftGenerated__next" onClick={onNext}>
            {getLang('global_next')}
            <SVG src={require('src/asset/icons/arrows/form-dropdown.svg')} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
