import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { adaptiveSelector } from 'src/selectors';
import { classNames } from 'src/ui/utils';
import { getFixedNumber } from 'utils';
import _ from 'lodash';

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
  indicator,
  error,
  disabled,
  footer,
  size,
  decimals,
  inputMode,
  pattern,
  size,
  id,
  ...otherProps
}) {
  const [inputState, setInputState] = React.useState(value || '');
  const adaptive = useSelector(adaptiveSelector);
  const indicatorRef = React.useRef(null);

  const [padding, setPadding] = React.useState(0);
  const style = {
    textAlign: textPosition,
  };

  React.useEffect(() => {
    // if (type === 'number') return;

    if (type === 'number') {
      if (Number(value) !== Number(inputState)) {
        if (!_.isNaN(value)) {
          setInputState(value);
        }
      }
      return;
    }

    if (value !== inputState) {
      setInputState(value);
    }
  }, [value]);

  // Set padding for input of indicator width.
  React.useEffect(() => {
    if (!indicator) return;
    if (!indicatorRef.current) return;

    const indicatorWidth = indicatorRef.current.clientWidth;
    const paddingKey = textPosition === 'left' ? 'paddingRight' : 'paddingLeft';
    setPadding({ [paddingKey]: indicatorWidth });
  }, []);

  const handleInput = (e) => {
    const newValue = e.currentTarget.value;

    if (type === 'number') {
      let value = `${newValue}`;
      value = value.replace(',', '.');

      if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
        value = _.trimStart(value, '0');
      }

      if (value === '.') {
        value = '0.';
        onChange(value);
        setInputState(value);
        return;
      }

      if (!_.isNaN(Number(value))) {
        onChange(getFixedNumber(Number(value), decimals));
        setInputState(getFixedNumber(value, decimals));
        return;
      }

      return;
    }

    onChange(newValue);
    setInputState(newValue);
    return;
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

  const className = classNames(
    {
      DappInput: true,
      error: error,
    },
    size
  );

  return (
    <div className={classNames('DappInput__wrapper', size)}>
      <input
        type="text"
        value={inputState}
        onChange={handleInput}
        className={className}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        style={{ ...style, ...padding }}
        onFocus={handleFocus}
        disabled={disabled}
        id={id && `input-` + id}
        {...otherProps}
      />
      {indicator && (
        <div className="DappInput__indicator" ref={indicatorRef}>
          {indicator}
        </div>
      )}
      {footer && <div className="DappInput__footer">{footer}</div>}
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
  error: false,
  small: 'medium',
  decimals: null,
  inputMode: 'text',
  pattern: null,
};

DappInput.propTypes = {
  textPosition: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  selectLastSymbol: PropTypes.bool,
  small: PropTypes.oneOf(['small', 'medium', 'large']),
  decimals: PropTypes.number,
  inputMode: PropTypes.string,
  pattern: PropTypes.string,
};

export default DappInput;
