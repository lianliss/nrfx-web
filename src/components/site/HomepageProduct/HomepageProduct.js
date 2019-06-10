import React from 'react';
import PropTypes from 'prop-types';

import * as utils from '../../../utils';
import UI from '../../../ui';

import './HomepageProduct.less';


export default function HomepageProduct(props) {
  const className = utils.classNames({
    HomepageProduct: true,
    reverse: props.reverse
  });

  const iconClassName = utils.classNames({
    HomepageProduct__icon: true,
    [props.icon]: true
  });

  return (
    <div className={className}>
      <div className={iconClassName} />
      <div className="HomepageProduct__cont">
        <div className="HomepageProduct__title">
          {props.title}
          <div className="HomepageProduct__title__bg">{props.bgTitle}</div>
        </div>
        <ul className="HomepageProduct__caption">
          {React.Children.map(props.children, (child) => {
            return <li><span>{child}</span></li>;
          })}
        </ul>

        <a href={`/#/${props.seeMoreLink}`} className="HomepageProduct__anchor">
          <UI.Button
            rounded
            afterContent={<div className="HomepageProduct__button_arrow" />}
          >
            Подробнее
          </UI.Button>
        </a>
      </div>
    </div>
  )
}

HomepageProduct.propTypes = {
  title: PropTypes.string.isRequired,
  bgTitle: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  style: PropTypes.object
};