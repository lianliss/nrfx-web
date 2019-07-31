import './Dropdown.less';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import { classNames } from '../../utils';


function Dropdown(props) {
  const [isOpen, toggle] = useState(false);
  const dropdownIcon = isOpen ? require('../../asset/arrow_outline_up.svg') : require('../../asset/arrow_outline_down.svg');
  const headerText = props.value || props.placeholder;
  const className = classNames({
    Dropdown: true,
    Dropdown_open: isOpen,
  });

  return (
    <div className={className}>
      <div className="Dropdown__header" onClick={() => toggle(!isOpen)}>
        <div className="Dropdown__option">
          <p className="Dropdown__option__title">{headerText.title}</p>
          <p className="Dropdown__option__note">{headerText.note}</p>
        </div>

        <SVG src={dropdownIcon} />
      </div>

      {isOpen
        ? (
          <div className="Dropdown__options">
            {props.options.map((opt) => (
              <div key={opt.value} className="Dropdown__option" onClick={() => {
                props.onChange(opt);
                toggle(false);
              }}>
                <p className="Dropdown__option__title">{opt.title}</p>
                <p className="Dropdown__option__note">{opt.note}</p>
              </div>
            ))}
          </div>
        ) : null}
    </div>
  );
}

const optionType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
});

Dropdown.propTypes = {
  value: optionType,
  options: PropTypes.arrayOf(optionType).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(Dropdown);
