import { useEffect, useState } from 'react';
import { setAdaptive as setAdaptiveStore } from 'src/actions';
import { PHONE } from '../index/constants/breakpoints';

// Return boolean adaptive state.
// @param screenWidth (number) - Window width < number then return true.
export default (screenWidth = PHONE) => {
  const [adaptive, setAdaptive] = useState();

  const handleResize = () => {
    if (document.body.offsetWidth <= screenWidth) {
      setAdaptive(true);
      setAdaptiveStore(true);
    } else {
      setAdaptive(false);
      setAdaptiveStore(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return adaptive;
};
