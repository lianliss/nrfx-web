import React from 'react';
import { Web3Context } from 'src/services/web3Provider';
import Close from '../components/Close/Close';
import CabinetBlock from '../../CabinetBlock/CabinetBlock';
import CabinetModal from '../CabinetModal/CabinetModal';
import SumsubWebSdk from '@sumsub/websdk-react'

function KYCVerification({ onClose }) {
  
  const context = React.useContext(Web3Context);
  const {
    isConnected,
    chainId,
    accountAddress,
    backendRequest,
  } = context;
  
  const [token, setToken] = React.useState();
  React.useEffect(() => {
    if (!isConnected) return;
    backendRequest(
      {},
      'Get KYC token',
      'user/kycToken',
      'get'
    ).then(data => {
      setToken(data.token);
    }).catch(error => {
      console.error('[Get KYC token]', error);
    });
  }, [
    isConnected, accountAddress,
  ]);
  
  const expHandler = data => {
    console.log('[expHandler]', data);
  };
  
  const onMessage = data => {
    console.log('[onMessage]', data);
  };
  
  const onError = data => {
    console.log('[onError]', data);
  };
  
  const config = {};
  const options = {};
  
  return (
    <CabinetModal isOpen={true}
                  onClose={onClose}
                  custom
                  className={`KYCVerification`}>
      <CabinetBlock className="KYCVerification__container">
        {!!token && <SumsubWebSdk
          accessToken={token}
          expirationHandler={expHandler}
          config={config}
          options={options}
          onMessage={onMessage}
          onError={onError}
        />}
      </CabinetBlock>
    </CabinetModal>
  );
}

export default KYCVerification;
