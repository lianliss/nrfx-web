import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames } from 'utils';

// Styles
import './CustomButton.less';

export const buttonTypes = {
  button: 'button',
  link: 'link',
};

function CustomButton({ children, className, onClick, style, disabled, type }) {
  return (
    <button
      className={classNames({
        CustomButton: true,
        [className]: className,
        [type]: type,
        disabled,
      })}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

CustomButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.values(buttonTypes)),
};

CustomButton.defaultProps = {
  className: null,
  onClick: () => {},
  style: {},
  disabled: false,
  buttonType: buttonTypes.button,
};

export default CustomButton;
