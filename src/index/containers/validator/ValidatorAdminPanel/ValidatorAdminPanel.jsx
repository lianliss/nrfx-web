import React from 'react';
import AdminPanel from '../../p2p/AdminPanel/AdminPanel';

function ValidatorAdminPanel() {
  const user = {
    name: 'login2022@mail.ru',
    role: 'validator',
    verified: false,
  };

  return <AdminPanel user={user} />;
}

export default ValidatorAdminPanel;
