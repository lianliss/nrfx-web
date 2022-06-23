import React from 'react';

export const openCabinetModal = () => {
  React.useEffect(() => {
    const dappContent = document.querySelector('.DappContainer__content');
    const pageContent = document.querySelector('.PageContainer__content');

    if (pageContent) {
      pageContent.style.zIndex = 2;
    }

    if (dappContent) {
      dappContent.style.zIndex = 2;
    }

    return () => {
      if (pageContent) {
        pageContent.style.zIndex = 1;
      }

      if (dappContent) {
        dappContent.style.zIndex = 1;
      }
    };
  }, []);

  return true;
};
