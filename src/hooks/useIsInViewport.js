import React from 'react';

export default function (element) {
  if (!element) return;

  const [isInViewport, setIsInViewport] = React.useState(false);

  const checkElement = () => {
    if (!element.current) return;

    const rect = element.current.getBoundingClientRect();
    const result =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (result) {
      setIsInViewport(result);
    }
  };

  React.useEffect(() => {
    document.addEventListener('scroll', checkElement);
  }, []);

  return isInViewport;
}
