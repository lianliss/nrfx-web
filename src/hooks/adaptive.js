import { useEffect, useState } from 'react';
import { setAdaptive as setAdaptiveStore } from 'src/actions';
import { PHONE } from '../index/constants/breakpoints';

// Return boolean adaptive state.
// @param maxWidth (number) - Window width < number then return true.
export default (maxWidth = PHONE) => {
  const [adaptive, setAdaptive] = useState();

  const handleResize = () => {
    if (document.body.offsetWidth <= maxWidth) {
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
