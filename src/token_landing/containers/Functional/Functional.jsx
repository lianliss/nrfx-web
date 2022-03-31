import React from 'react';

import './Functional.less';

import FunctionalItem from './components/FunctionalItem/FunctionalItem';
import SVG from 'utils/svg-wrap';
import backgroundImage from './components/assets/bg.svg';

// Items
import { functionalItems } from '../../constants/functionalItems';

function Functional() {
  return (
    <div className="Functional">
      <div className="Functional__container">
        <div className="Functional__content">
          <h2 className="Functional__title">Functional</h2>
          <div className="Functional__items">
            {functionalItems &&
              functionalItems.map((item, key) => (
                <FunctionalItem number={item.id} key={key} title={item.title} />
              ))}
          </div>
        </div>
      </div>
      <div className="Functional__background">
        <SVG src={backgroundImage} />
      </div>
    </div>
  );
}

export default Functional;
