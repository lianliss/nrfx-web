import React from 'react';

export const openCabinetModal = () => {
  React.useEffect(() => {
    const dappContent = document.querySelector('.DappWrapper__content');
    const pageContent = document.querySelector('.PageContainer__content');

    if (pageContent) {
      pageContent.style.zIndex = 100;
    }

    if (dappContent) {
      dappContent.style.zIndex = 100;
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
