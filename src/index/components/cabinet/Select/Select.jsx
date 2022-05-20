import React from 'react';
import { classNames } from 'utils';
import { default as ReactSelect } from 'react-select';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './Select.less';

function Select({ options, value, onChange, ...props }) {
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
      className="CabinetSelect"
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

export default Select;
