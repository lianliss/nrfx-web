import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { adaptiveSelector } from 'src/selectors';

// Styles
import './DappInput.less';

function DappInput({
  textPosition,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  selectLastSymbol,
}) {
  const [inputState, setInputState] = React.useState(value);
  const adaptive = useSelector(adaptiveSelector);
  const style = {
    textAlign: textPosition,
  };

  const handleInput = (e) => {
    const newValue = e.currentTarget.value;

    if (type === 'number') {
      if (adaptive) {
        onChange(Number(newValue));
        setInputState(newValue);
        return;
      }

      let value = `${newValue}`;
      value = value.replace(',', '.');

      if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
        value = _.trimStart(value, '0');
      }

      if (!_.isNaN(Number(value)) || value === '.') {
        onChange(Number(value));
        setInputState(value);
      }
    } else {
      onChange(newValue);
      setInputState(newValue);
      return;
    }
  };

  const handleFocus = (e) => {
    e.preventDefault();

    onFocus(e);

    if (!selectLastSymbol) return;
    if (textPosition !== 'right') return;

    const input = e.currentTarget;

    setTimeout(() => {
      input.setSelectionRange(input.value.length, input.value.length);
    });
  };

  return (
    <div className="DappInput__wrapper">
      <input
        type={adaptive ? type : 'text'}
        value={inputState}
        onChange={handleInput}
        className="DappInput"
        placeholder={placeholder}
        style={style}
        onFocus={handleFocus}
      />
    </div>
  );
}

DappInput.defaultProps = {
  textPosition: 'left',
  type: 'text',
  placeholder: '',
  value: '',
  onChange: () => {},
  onFocus: () => {},
  selectLastSymbol: false,
};

DappInput.propTypes = {
  textPosition: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  selectLastSymbol: PropTypes.bool,
};

export default DappInput;
