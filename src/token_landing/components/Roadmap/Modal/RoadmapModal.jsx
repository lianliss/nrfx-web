import React from 'react';
import PropTypes from 'prop-types';

import Lang from "src/components/Lang/Lang";
import './RoadmapModal.less';

function RoadmapModal({ svg, number, tasks, position, setShowModal }) {
  if (!tasks) {
    return null;
  }

  const modalRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);

    return function removeListeners() {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e) => {
    if (e.target !== modalRef.current) {
      setShowModal(false);
    }
  };

  const modalWidth = 207;
  const { x, y } = position;
  const left = x + modalWidth > window.screen.width ? x - modalWidth : x;

  const styles = {
    // Set Modal positions
    width: modalWidth,
    top: y - 235,
    left,
  };

  return (
    <div className="RoadmapModal" style={styles} ref={modalRef}>
      <span className="step__number">STEP {number}</span>
      <div className="RoadmapModal__tasks">
        {tasks.map((task, key) => (
          <div key={key} className="RoadmapModal__task">
            {svg}
            <span>{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

RoadmapModal.propTypes = {
  svg: PropTypes.element,
  number: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.string),
  position: PropTypes.objectOf(PropTypes.number),
  setShowModal: PropTypes.func,
};

RoadmapModal.defaultProps = {
  svg: <img />,
  number: 0,
  tasks: [],
  position: { x: 0, y: 0 },
  setShowModal: () => {},
};

export default RoadmapModal;
