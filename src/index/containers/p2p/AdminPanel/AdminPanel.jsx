import React from 'react';
import PropTypes from 'prop-types';
import { updateP2PKYC } from 'src/actions/dapp/p2p';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';

// Components
import { Account, TableLayout, AdvertiserDetail } from './containers';
import { SocialLinks } from 'dapp';

// Utils
import { adaptiveSelector, dappP2PKYCSelector } from 'src/selectors';

function AdminPanel({ user, type = 'default', isForeignProfile }) {
  const context = React.useContext(Web3Context);
  const adaptive = useSelector(adaptiveSelector);
  const kyc = useSelector(dappP2PKYCSelector);
  const dispatch = useDispatch();
  
  const {
    accountAddress,
    chainId,
    isConnected,
  } = context;
  
  const isVerified = !!kyc;
  const name = _.get(kyc, 'name', accountAddress);
  const isValidator = _.get(kyc, 'isValidator', false) && user.role !== 'user';
  user.verified = isVerified;
  
  React.useEffect(() => {
    if (!isConnected) return;
    dispatch(updateP2PKYC(context));
  }, [accountAddress, chainId, isConnected]);

  return (
    <div>
      <Account
        adaptive={adaptive}
        user={user}
        isForeignProfile={isForeignProfile}
        type={type}
        kyc={kyc}
      />
      {type === 'default' && (
        <TableLayout adaptive={adaptive} userRole={user.role} />
      )}
      {type === 'advertiser_detail' && <AdvertiserDetail adaptive={adaptive} />}
      <SocialLinks type="v2" />
    </div>
  );
}

AdminPanel.propTypes = {
  type: PropTypes.oneOf(['default', 'advertiser_detail']),
};

export default AdminPanel;
