import React from 'react';

export const openCabinetModal = () => {
  React.useEffect(() => {
    const pageContent = document.querySelector('.PageContainer__content');

    if (!pageContent) return;

    pageContent.style.zIndex = 2;

    return () => {
      pageContent.style.zIndex = 1;
    };
  }, []);

  return true;
};
