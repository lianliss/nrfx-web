import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { Account, TableLayout } from './containers';
import { SocialLinks } from 'dapp';

// Utils
import { adaptiveSelector } from 'src/selectors';

function AdminPanel({ user }) {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div>
      <Account adaptive={adaptive} user={user} />
      <TableLayout adaptive={adaptive} userRole={user.role} />
      <SocialLinks type="v2" />
    </div>
  );
}

export default AdminPanel;
