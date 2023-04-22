import React from 'react';

import AdminPanel from '../../p2p/AdminPanel/AdminPanel';

function UserCenter() {
  const user = {
    name: 'login2022@mail.ru',
    role: 'user',
    verified: false,
  };

  return <AdminPanel user={user} />;
}

export default UserCenter;
