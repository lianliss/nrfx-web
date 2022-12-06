import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from 'utils';
import { default as ReactSelect } from 'react-select';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './Select.less';

function Select({
  options,
  value,
  onChange,
  className,
  indicatorIcon,
  type,
  ...props
}) {
  // Get object value of string from options.
  const getValue = () => {
    return value ? options.find((c) => c.value === value) : '';
  };

  // Handlers
  // -- Set value of string from object option.
  const handleChange = (newValue) => {
    onChange(newValue.value);
  };

  return (
    <ReactSelect
      isSearchable={false}
      options={options}
      value={getValue()}
      onChange={handleChange}
      components={{
        DropdownIndicator: (props) => {
          return (
            <SVG
              src={
                indicatorIcon
                  ? indicatorIcon
                  : require('src/asset/icons/cabinet/select-arrow.svg')
              }
              className={classNames({
                dropdownIndicator: true,
                active: props.selectProps.menuIsOpen,
              })}
            />
          );
        },
        IndicatorSeparator: null,
      }}
      className={classNames('CabinetSelect', className, type)}
      classNamePrefix="CabinetSelect"
      {...props}
    />
  );
}

Select.propTypes = {
  type: PropTypes.oneOf(['simple', 'dapp']),
};

Select.defaultProps = {
  type: 'dapp',
};

// Return object for options constant
export const option = (title, value, icon, showValue = false) => {
  return {
    label: (
      <>
        <span className="CabinetSelect__option-icon">
          {icon && <img src={icon} />}
        </span>
        <p className="CabinetSelect__option-title">{title}</p>
        {showValue && <p className="CabinetSelect__option-value">{value}</p>}
      </>
    ),
    value,
  };
};

export default Select;
