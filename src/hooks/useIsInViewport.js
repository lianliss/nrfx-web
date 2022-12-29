import React from 'react';

/**
 * Returns visible when scrolled to element and rect object.
 * @param {elementRef} element
 * @param {viewportVisibleType} type
 * @returns {object} viewport
 */
export default function (element, scrollRemainderPercent = 70) {
  if (!element) return;
  const [isInViewport, setIsInViewport] = React.useState(false);

  const checkElement = React.useCallback(() => {
    if (!element.current) return;

    const newRect = element.current.getBoundingClientRect();
    const documentHeight = document.documentElement.clientHeight;
    const fullHeight = window.innerHeight || documentHeight;
    const windowPosition = fullHeight * (scrollRemainderPercent / 100);

    // is not in viewport
    if (newRect.top > windowPosition) return;

    const result = newRect.top <= windowPosition;

    if (result) {
      setIsInViewport(result);
      document.removeEventListener('scroll', checkElement);
    }
  });

  React.useEffect(() => {
    checkElement();
    document.addEventListener('scroll', checkElement);
    window.addEventListener('resize', checkElement);

    return () => {
      document.removeEventListener('scroll', checkElement);
      window.removeEventListener('resize', checkElement);
    };
  }, []);

  return isInViewport;
}
