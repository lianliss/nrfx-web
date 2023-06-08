import React from 'react';
import { updateP2PKYC } from 'src/actions/dapp/p2p';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';

// Components
import LineBreaker from 'src/ui/components/LineBreaker/LineBreaker';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SocialLinks from '../SocialLinks/SocialLinks';
import LoadingStatus from "src/index/components/cabinet/LoadingStatus/LoadingStatus";

// Utils
import { getLang } from 'src/utils';
import router from 'src/router';
import * as pages from 'src/index/constants/pages';
import { adaptiveSelector, dappP2PKYCSelector } from 'src/selectors';

// Styles
import './CabinetValidator.less';

function CabinetValidator() {
  const context = React.useContext(Web3Context);
  const kyc = useSelector(dappP2PKYCSelector);
  const dispatch = useDispatch();
  
  const {
    accountAddress,
    chainId,
    isConnected,
  } = context;
  const isVerified = !!kyc;
  if (isVerified) {
    router.navigate(pages.VALIDATOR_ADMIN_PANEL);
    return <LoadingStatus status={"loading"} />;
  }
  
  React.useEffect(() => {
    if (!isConnected || isVerified) return;
    dispatch(updateP2PKYC(context));
  }, [accountAddress, chainId, isConnected]);
  
  return (
    <CabinetBlock className="CabinetValidator__wrap">
      <div className="CabinetValidator">
        <div className="CabinetValidator__container">
          <div className="CabinetValidator__content">
            <div>
              <h1>{getLang('dapp_validator_page_title')}</h1>
              <p className="CabinetValidator__description">
                {getLang('dapp_validator_page_subtitle')}
              </p>
              <a href="mailto:admin@narfex.com">
                {getLang('dapp_global_contact_us')} ›
              </a>
            </div>
            <SocialLinks />
          </div>
          <div className="CabinetValidator-bg">
            <img
              src={require('./asset/bg.svg').default}
              className="desktop-bg"
            />
            <img
              src={require('./asset/bg-mobile.svg').default}
              className="mobile-bg"
            />
          </div>
        </div>
      </div>
    </CabinetBlock>
  );
}

export default CabinetValidator;
