import React from 'react';

import './Roadmap.less';

import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';
import playIcon from '../../assets/play.svg';

import RoadmapModal from '../../components/Roadmap/Modal/RoadmapModal';
import { types } from './constants/roadmapTypes';

function Roadmap({ title = '', items = [], type = types.default }) {
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
    <section className={`Roadmap ${type}`}>
      <div className="Roadmap__container">
        <h2 className="Roadmap__title">{title}</h2>
        <div className="Roadmap__items">
          {items.map((item, key) => (
            <div className="Roadmap__item step" key={key}>
              <span className="step__number">
                {getLang('token_landing_step')} {key + 1}
              </span>
              <span className="step__title">{getLang(item.title)}</span>
              <div
                className="step__modal-open"
                onClick={(e) => {
                  const x = e.pageX;
                  const y = e.pageY;

                  // key + 1, for display "0" index step number to 1.
                  openModal(item.tasks, key + 1, { x, y });
                }}
              >
                {type === types.default && (
                  <span className="Roadmap__icon">
                    <SVG src={playIcon} />
                  </span>
                )}
                <span>{getLang('tokne_landing_see_all')}</span>
                {type === types.medium && (
                  <span className="Roadmap__icon">
                    <SVG src={require('src/asset/24px/arrow_right_alt.svg')} />
                  </span>
                )}
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
