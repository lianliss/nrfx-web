import React from 'react';

export const openCabinetModal = () => {
  React.useEffect(() => {
    const dappWrapper = document.querySelector('.DappWrapper__content');
    const dappContent = document.querySelector('.DappContainer__content');
    const pageWrapper = document.querySelector('.CabinetWrapper__content');
    const pageContent = document.querySelector('.PageContainer__content');
    const contentBlocks = [dappWrapper, dappContent, pageWrapper, pageContent];

    contentBlocks.forEach((item) => {
      if (item) {
        item.style.zIndex = 100;
      }
    });

    return () => {
      contentBlocks.forEach((item) => {
        if (item) {
          item.style.zIndex = 1;
        }
      });
    };
  }, []);

  return true;
};
