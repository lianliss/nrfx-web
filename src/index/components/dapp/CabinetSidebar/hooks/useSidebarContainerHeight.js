import React from 'react';

// Return 80vh or calc(80vh + *px).
// Hook for set sidebar height after scroll.
export const useSidebarContainerHeight = (adaptive) => {
  const [containerSize, setContainerSize] = React.useState('80vh');
  const [dappHeader, setDappHeader] = React.useState(null);

  React.useEffect(() => {
    setDappHeader(document.querySelector('.DappHeader'));
  }, []);

  React.useEffect(() => {
    const setHeight = () => {
      if (adaptive) return;
      if (!dappHeader) return;

      const headerHeight = dappHeader.offsetHeight - 5;

      if (window.scrollY > headerHeight) {
        // Add header height to sidebar after header height scroll.
        setContainerSize(`calc(80vh + ${headerHeight}px)`);
      } else {
        setContainerSize('80vh');
      }
    };

    window.addEventListener('scroll', setHeight);

    return () => {
      window.removeEventListener('scroll', setHeight);
    };
  }, [adaptive, dappHeader]);

  return containerSize;
};
