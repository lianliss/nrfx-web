import React from 'react';

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

  return (
    <CabinetModal {...props} closeOfRef className="SwiftGenerated">
      <div className="SwiftGenerated__container">
        {step === 'main' && (
          <Main
            onDownload={() => setStep('download')}
            onNext={() => setStep('download')}
          />
        )}
        {step === 'download' && (
          <Download
            onBack={() => setStep('main')}
            onIPaidClick={() => setStep('finally')}
            onClose={props.onClose}
          />
        )}
        {step === 'finally' && <Finally />}
      </div>
    </CabinetModal>
  );
}

export default SwiftGenerated;
