import React from 'react';

import router from 'src/router';
import * as pages from 'src/index/constants/pages';

function ShowPageOn({ hostNames = ['', 'nrfxlab.world'], children }) {
  const show = !(hostNames.indexOf(window.location.hostname) < 0);

  React.useEffect(() => {
    if (!show) {
      router.navigate(pages.DAPP_EXCHANGE);
    }
  }, []);

  return <>{show && children}</>;
}

export default ShowPageOn;
