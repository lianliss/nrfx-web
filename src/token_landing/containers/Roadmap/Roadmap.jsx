import React from 'react';

import './Roadmap.less';

import Lang from "src/components/Lang/Lang";
import SVG from 'utils/svg-wrap';
import playIcon from '../../assets/play.svg';

import { roadmapItems } from '../../constants/roadmap';
import RoadmapModal from '../../components/Roadmap/Modal/RoadmapModal';

function Roadmap() {
  // Modal State.
  const [showModal, setShowModal] = React.useState(false);
  const [modalTasks, setModalTasks] = React.useState([]);
  const [currentModalNumber, setCurrentModalNumber] = React.useState();
  const [modalPosition, setModalPosition] = React.useState({ x: 0, y: 0 });

  const openModal = (tasks, number, position) => {
    // Set Modal State.
    if (number !== currentModalNumber) {
      setShowModal(true);
    } else {
      // Clear Modal Number, for next visible.
      return setCurrentModalNumber(null);
    }

    setModalTasks(tasks);
    setCurrentModalNumber(number);
    setModalPosition(position);
  };

  return (
    <section className="Roadmap">
      <div className="Roadmap__container">
        <h2 className="Roadmap__title">RoadMap</h2>
        <div className="Roadmap__items">
          {roadmapItems.map((item, key) => (
            <div className="Roadmap__item step" key={key}>
              <span className="step__number">STEP {key + 1}</span>
              <span className="step__title">{item.title}</span>
              <div
                className="step__modal-open"
                onClick={(e) => {
                  const x = e.pageX;
                  const y = e.pageY;

                  // key + 1, for display "0" index step number to 1.
                  openModal(item.tasks, key + 1, { x, y });
                }}
              >
                <SVG src={playIcon} className="Roadmap__icon" />
                <span>See all</span>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <RoadmapModal
            svg={<SVG src={playIcon} />}
            number={currentModalNumber}
            tasks={modalTasks}
            position={modalPosition}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </section>
  );
}

export default Roadmap;
