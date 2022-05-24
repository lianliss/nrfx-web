import React from 'react';
import { classNames } from 'utils';
import { default as ReactSelect } from 'react-select';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './Select.less';

function Select({ options, value, onChange, className, ...props }) {
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
        DropdownIndicator,
        IndicatorSeparator: null,
      }}
      className={classNames('CabinetSelect', { [className]: className })}
      classNamePrefix="CabinetSelect"
      {...props}
    />
  );
}

const DropdownIndicator = (props) => {
  return (
    <SVG
      src={require('src/asset/icons/cabinet/select-arrow.svg')}
      className={classNames({
        dropdownIndicator: true,
        active: props.selectProps.menuIsOpen,
      })}
    />
  );
};

// Return object for options constant
export const option = (title, value, icon) => {
  return {
    label: (
      <>
        <span className="CabinetSelect__option-icon">
          <SVG src={icon} />
        </span>
        <p className="CabinetSelect__option-title">{title}</p>
      </>
    ),
    value,
  };
};

export default Select;
