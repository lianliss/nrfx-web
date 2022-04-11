import { useEffect, useState } from 'react';
import { PHONE } from 'src/index/constants/breakpoints';

export const useAdaptive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Landing adaptive Setter.
    window.addEventListener('resize', screenResize);
    screenResize();

    return function removeEvents() {
      window.removeEventListener('resize', screenResize);
    };
  }, []);

  const screenResize = () => {
    if (document.body.offsetWidth <= PHONE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return isMobile;
};
