import React from 'react';

import { SwitchTabs } from 'ui';

import styles from './AdvertiserDetail.module.less';

const AdvertiserDetail = ({ adaptive }) => {
  const [selectedPage, setSelectedPage] = React.useState('online-ads');

  const pages = [
    { label: 'Online Ads', value: 'online-ads' },
    { label: 'Feedback(59)', value: 'feedback' },
  ];

  return (
    <>
      {adaptive && <SwitchTabs />}
      <div className={styles.AdvertiserDetail}>
        {!adaptive && (
          <SwitchTabs
            selected={selectedPage}
            type="secondary-alice"
            onChange={setSelectedPage}
            tabs={pages}
          />
        )}
      </div>
    </>
  );
};

export default AdvertiserDetail;
