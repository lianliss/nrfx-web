import React from 'react';

// Utils
import router from 'src/router';
import * as pages from 'src/index/constants/pages';

function ShowPageOn({ hostNames = ['localhost', 'nrfxlab.world'] }) {
  const show = !(hostNames.indexOf(window.location.hostname) < 0);

  React.useEffect(() => {
    if (!show) {
      router.navigate(pages.DAPP_EXCHANGE);
    }
  }, []);

  return null;
}

export default ShowPageOn;
