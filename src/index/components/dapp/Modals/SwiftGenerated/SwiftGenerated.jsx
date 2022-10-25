import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { Modal } from 'src/ui';
import CabinetModal from '../CabinetModal/CabinetModal';
import Download from './components/Download/Download';
import Finally from './components/Finally/Finally';
import Main from './components/Main/Main';

// Styles
import './SwiftGenerated.less';

function SwiftGenerated(props) {
  const [step, setStep] = React.useState('main');
  const {currency} = props;
  const invoice = useSelector(state => _.get(state, `dapp.invoices.${currency}`));
  if (!invoice) {
    props.onClose();
    return <></>;
  }
  
  const isWaitForReview = invoice.status === 'wait_for_review';
  if (isWaitForReview && step !== 'finally') {
    setStep('finally');
  }

  return (
    <CabinetModal {...props} closeOfRef className="SwiftGenerated">
      <div className="SwiftGenerated__container">
        {step === 'main' && <Main {...props} onNext={() => setStep('download')} />}
        {step === 'download' && (
          <Download
            onBack={() => setStep('main')}
            onIPaidClick={() => setStep('finally')}
            onClose={props.onClose}
            {...props}
          />
        )}
        {step === 'finally' && <Finally {...props} />}
      </div>
    </CabinetModal>
  );
}

export default SwiftGenerated;
