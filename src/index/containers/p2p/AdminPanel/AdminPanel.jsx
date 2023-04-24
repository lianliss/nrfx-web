import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import { Account, TableLayout, AdvertiserDetail } from './containers';
import { SocialLinks } from 'dapp';

// Utils
import { adaptiveSelector } from 'src/selectors';

function AdminPanel({ user, type = 'default' }) {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div>
      <Account adaptive={adaptive} user={user} type={type} />
      {type === 'default' && (
        <TableLayout adaptive={adaptive} userRole={user.role} />
      )}
      {type === 'advertiser_detail' && <AdvertiserDetail />}
      <SocialLinks type="v2" />
    </div>
  );
}

AdminPanel.propTypes = {
  type: PropTypes.oneOf(['default', 'advertiser_detail']),
};

export default AdminPanel;
