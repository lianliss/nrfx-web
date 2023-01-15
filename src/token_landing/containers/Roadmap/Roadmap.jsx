import React from 'react';

import './Roadmap.less';

import { getLang, classNames as cn } from 'utils';
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
  const [activeStep, setActiveStep] = React.useState(null);

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
          {items.map((item, key) => {
            const stepId = key + 1;

            return (
              <div
                className={cn('Roadmap__item', 'step', {
                  active: activeStep === stepId && showModal,
                })}
                key={stepId}
              >
                <span className="step__number">
                  {getLang('token_landing_step')} {stepId}
                </span>
                <span className="step__title">{getLang(item.title)}</span>
                <div
                  className="step__modal-open"
                  onClick={(e) => {
                    const x = e.pageX;
                    const y = e.pageY;

                    openModal(item.tasks, stepId, { x, y });
                    setActiveStep(stepId);
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
                      <SVG
                        src={require('src/asset/24px/arrow_right_alt.svg')}
                      />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
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
