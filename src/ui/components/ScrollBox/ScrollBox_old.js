import './ScrollBox.less';

import React, { useState, useEffect, useRef } from 'react';
import { classNames as cn, getScrollbarWidth } from '../../utils';

export default props => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(null);
  const [pointerPosition, setPointerPosition] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [buttonHeight, setButtonHeight] = useState(0);

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight;
    const contentHeight = contentRef.current.clientHeight;

    setButtonHeight(containerHeight / contentHeight * 100);
    setScrollWidth(getScrollbarWidth());

    console.log(contentRef.current);

    scrollRef.current.addEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e, startPosition) => {
    console.log(pointerPosition - e.clientY, startPosition, e.clientY);
  };

  const handleMouseDown = (e) => {
    setPointerPosition(e.clientY);
    document.body.classList.add('draggable');
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleChange.bind(null, e.clientY));
  };

  const handleMouseUp = () => {
    document.body.classList.remove('draggable');
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleChange);
  };

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollTop / contentRef.current.clientHeight * containerRef.current.clientHeight);
  };

  return (
    <div style={props.style} ref={containerRef} className={cn("ScrollBox", props.className, { init: scrollWidth === null })}>
      <div className="ScrollBox__contentWrapper" ref={scrollRef} style={{ marginRight: -scrollWidth + 'px' }}>
        <div className="ScrollBox__content" ref={contentRef}>{props.children}</div>
      </div>
      <div className="ScrollBox__bar">
        <div
          ref={buttonRef}
          style={{height: buttonHeight + '%', top:  scrollPosition + 'px'}}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="ScrollBox__bar__button"
        />
      </div>
    </div>
  )
}
