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
  const [rect, setRect] = React.useState(null);

  const checkElement = () => {
    if (!element.current) return;

    const newRect = element.current.getBoundingClientRect();
    const documentHeight = document.documentElement.clientHeight;
    // const documentWidth = document.documentElement.clientWidth;

    const fullHeight = window.innerHeight || documentHeight;
    const windowPosition = fullHeight * (scrollRemainderPercent / 100);
    const result = newRect.top <= windowPosition;

    if (result) {
      setIsInViewport(result);
    }

    if (newRect.top <= 0) {
      document.removeEventListener('scroll', checkElement);
    }

    setRect(newRect);
  };

  React.useEffect(() => {
    document.addEventListener('scroll', checkElement);

    return () => {
      document.removeEventListener('scroll', checkElement);
    };
  }, []);

  return { visible: isInViewport, rect: rect || {} };
}
