import React from 'react';

// Styles
import './Slider.less';

function Slider({
  children,
  nextSlideRef,
  prevSlideRef,
  adaptive,
  stepSize = 300,
}) {
  const [eventsExists, setEventsExists] = React.useState(false);
  const sliderRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [allRefsIsFine, setAllRefsIsFine] = React.useState(false);

  React.useEffect(() => {
    setAllRefsIsFine(
      sliderRef.current &&
        containerRef.current &&
        nextSlideRef.current &&
        prevSlideRef.current
    );
  }, [sliderRef, containerRef, nextSlideRef, prevSlideRef]);

  React.useEffect(() => {
    if (!allRefsIsFine) return;
    if (eventsExists) return;

    nextSlideRef.current.addEventListener('click', onNextSlide);
    prevSlideRef.current.addEventListener('click', onPrevSlide);

    onScroll();
    sliderRef.current.addEventListener('scroll', onScroll);
    setEventsExists(true);

    return () => {
      if (nextSlideRef.current) {
        nextSlideRef.current.removeEventListener('click', onNextSlide);
      }
      if (prevSlideRef.current) {
        prevSlideRef.current.removeEventListener('click', onPrevSlide);
      }
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('scroll', onScroll);
      }
      setEventsExists(false);
    };
  }, [adaptive, allRefsIsFine]);

  const onScroll = () => {
    if (!allRefsIsFine) return;

    const slider = sliderRef.current;
    const currentPosition = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    refClassesToggler(currentPosition, maxScroll);
  };

  const onNextSlide = () => {
    sliderRef.current.scroll({
      left: sliderRef.current.scrollLeft + stepSize,
      top: 0,
      behavior: 'smooth',
    });
  };

  const onPrevSlide = () => {
    sliderRef.current.scroll({
      left: sliderRef.current.scrollLeft - stepSize,
      top: 0,
      behavior: 'smooth',
    });
  };

  const refClassesToggler = (currentPosition, maxScroll) => {
    if (Math.floor(currentPosition) >= maxScroll) {
      nextSlideRef.current.classList.add('disabled');
    }

    if (currentPosition < maxScroll) {
      nextSlideRef.current.classList.remove('disabled');
    }

    if (currentPosition <= 0) {
      prevSlideRef.current.classList.add('disabled');
    }

    if (currentPosition > 0) {
      prevSlideRef.current.classList.remove('disabled');
    }
  };

  return (
    <div className="DappUI__Slider" ref={sliderRef}>
      <div className="DappUI__Slider__container" ref={containerRef}>
        {children}
      </div>
    </div>
  );
}

export default Slider;
