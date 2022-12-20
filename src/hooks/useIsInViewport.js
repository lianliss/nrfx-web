import React from 'react';

export const types = {
  full: 'full',
  half: 'half',
};

export default function (element, type = types.half) {
  if (!element) return;
  const [isInViewport, setIsInViewport] = React.useState(false);
  const [rect, setRect] = React.useState(null);

  const checkElement = () => {
    if (!element.current) return;

    const newRect = element.current.getBoundingClientRect();
    const documentHeight = document.documentElement.clientHeight;
    const documentWidth = document.documentElement.clientWidth;
    let result;

    switch (type) {
      case types.full:
        result =
          newRect.top >= 0 &&
          newRect.left >= 0 &&
          newRect.bottom <= (window.innerHeight || documentHeight) &&
          newRect.right <= (window.innerWidth || documentWidth);
        break;
      case types.half: {
        result = newRect.top <= (window.innerHeight || documentHeight) * 0.7;
      }
      default:
        break;
    }

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

  console.log(rect);
  return { visible: isInViewport, rect: rect || {} };
}
