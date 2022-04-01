import React from 'react';
import PropTypes from 'prop-types';

import './Info.less';

import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';
import ellipse from '../assets/ellipse.svg';

function Info({ title, progress, svgLine, position, type, adaptive }) {
  if (adaptive) {
    return (
      <div className="Info" style={position}>
        <div className="Info__container">
          <div className="Info__right">
            <div className="Info__progress">
              <SVG src={ellipse} />
              <span>{progress}%</span>
            </div>
            <span className="Info__title">{title}</span>
            <div className="Info__line Info__line-right">
              <SVG src={svgLine} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Info" style={position}>
      <div className="Info__container">
        {type === 'right' ? (
          <>
            <span className="Info__progress">{progress}%</span>
            <span className="Info__title">{title}</span>
            <div className="Info__line Info__line-right">
              <SVG src={svgLine} />
            </div>
          </>
        ) : (
          <div className="Info__left">
            <div className="Info__left-container">
              <span className="Info__progress">{progress}%</span>
              <div className="Info__line Info__line-left">
                <SVG src={svgLine} />
              </div>
            </div>
            <span className="Info__title">{title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

Info.propTypes = {
  title: PropTypes.string,
  progress: PropTypes.number,
  svgLine: PropTypes.string,
  position: PropTypes.object,
  type: PropTypes.oneOf(['right', 'left']),
  adaptive: PropTypes.bool,
};

Info.defaultProps = {
  title: '',
  progress: 0,
  svgLine: '/',
  position: { left: 0, top: 0 },
  type: 'right',
  adaptive: false,
};

export default Info;
