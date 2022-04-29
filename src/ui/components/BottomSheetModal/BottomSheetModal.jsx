import React from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';

import './BottomSheetModal.less';

function BottomSheetModal({ children, onClose }) {
  // setup ref for your usage
  const modalRef = React.useRef(null);
  const usingPosition = 20; // 30%
  const animationSpeed = 10;
  let swipedPosition = 0;
  let done = false;

  React.useEffect(() => {
    if (!modalRef) {
      return;
    }

    document.addEventListener('click', outsideClickHandler);
    document.body.classList.add('noScroll');

    return () => {
      document.removeEventListener('click', outsideClickHandler);
      document.body.classList.remove('noScroll');
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const step = () => {
    // min 0%, max 100%
    if (swipedPosition < 0 || swipedPosition > 100) {
      return;
    }

    if (!modalRef || modalRef.current === null) {
      return;
    }

    if (done) {
      return;
    }

    if (swipedPosition >= usingPosition) {
      // Set position 100% in animation
      swipedPosition += animationSpeed;
      modalRef.current.style.transform = `translateY(${swipedPosition || 0}%)`;

      if (swipedPosition >= 100) {
        handleClose();
      }
    } else {
      // Set position 0% in animation.
      swipedPosition -= animationSpeed;
      swipedPosition = swipedPosition < 0 ? 0 : swipedPosition;

      modalRef.current.style.transform = `translateY(${swipedPosition || 0}%)`;
    }
    window.requestAnimationFrame(step);
  };

  const handlers = useSwipeable({
    onSwiping: (e) => {
      if (!modalRef) {
        return;
      }

      // Cant swipe up
      if (e.deltaY < 0) {
        return;
      }

      // For stop animation.
      done = true;

      // Set positions
      swipedPosition = e.deltaY / (modalRef.current.offsetHeight / 100);
      modalRef.current.style.willChange = 'transform';
      modalRef.current.style.transform = `translateY(${swipedPosition || 0}%)`;
    },
    onSwiped: () => {
      done = false;
      window.requestAnimationFrame(step);
    },
  });

  const outsideClickHandler = (e) => {
    if (!modalRef.current.contains(e.target)) {
      swipedPosition = usingPosition;
      window.requestAnimationFrame(step);
    }
  };

  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set modalRef el so you can access it yourself
    modalRef.current = el;
  };

  return (
    <div className="BottomSheetModal-container">
      <div {...handlers} ref={refPassthrough} className="BottomSheetModal">
        <div className="BottomSheetModal__line" />
        {children}
      </div>
    </div>
  );
}

BottomSheetModal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.any,
};

BottomSheetModal.defaultProps = {
  onClose: () => {},
};

export default BottomSheetModal;
