import React from 'react';

import { AdminPanel } from '../../p2p';

const AdvertiserDetail = () => {
  const user = {
    name: 'login2022@mail.ru',
    role: 'validator',
    verified: false,
  };

  return <AdminPanel user={user} type="advertiser_detail" isForeignProfile />;
};

export default AdvertiserDetail;
