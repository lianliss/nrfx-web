import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from 'utils';
import { default as ReactSelect, components } from 'react-select';
import defaultIcon from 'src/asset/icons/cabinet/select-arrow.svg';

// Components
import SVG from 'utils/svg-wrap';
import CabinetScrollBlock from '../../../CabinetScrollBlock/CabinetScrollBlock';

// Styles
import './index.less';

const { DropdownIndicator, Menu, MenuList, Option } = components;

function BottomSheetSelect({
  options,
  value,
  onChange,
  className,
  indicatorIcon = defaultIcon,
  type,
  ...props
}) {
  // Get object value of string from options.
  const getValue = (value, options) => {
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
      value={getValue(value, options)}
      onChange={handleChange}
      components={{
        IndicatorSeparator: null,
        DropdownIndicator: (props) => {
          return (
            <DropdownIndicator {...props}>
              <SVG
                src={require('src/asset/icons/cabinet/select-arrow.svg')}
                flex
              />
            </DropdownIndicator>
          );
        },
        Menu: ({ children, ...props }) => {
          let selectedOption = {};

          if (_.isFunction(props.getValue)) {
            selectedOption = _.get(props.getValue(), '[0]', {});
          }

          return (
            <Menu {...props}>
              <div className="CabinetSelect-BottomSheet-menu__container">
                <Option {...props} isSelected>
                  {selectedOption.label}
                </Option>
                {children}
              </div>
            </Menu>
          );
        },
        MenuList: ({ children, ...props }) => (
          <MenuList {...props}>
            {children}
            {/* <CabinetScrollBlock>{children}</CabinetScrollBlock> */}
          </MenuList>
        ),
      }}
      className={classNames('CabinetSelect-BottomSheet')}
      classNamePrefix="CabinetSelect-BottomSheet"
      styles={{
        control: (base, state) => ({
          ...base,
          width: 150,
          height: '100%',
          backgroundColor: 'transparent',
          borderSize: '1px',
          borderStyle: 'solid',
          borderColor: state.isFocused ? '#d7ddee' : '#dfe3f0',
          borderRadius: 10,
          boxShadow: 'none',

          '&:hover': {
            borderColor: '#d7ddee',
          },
        }),
        singleValue: (base) => ({
          ...base,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: '0 15px',
        }),
        menu: (base) => ({
          ...base,
          background: '#fff',
          marginTop: 12,
          boxShadow: '0px 25px 55px rgba(188, 188, 188, 0.25)',
          borderRadius: '18px',
          overflow: 'hidden',
        }),
        menuList: (base) => ({
          ...base,
          padding: 0,
        }),
        option: (base, state) => ({
          ...base,
          padding: state.isSelected
            ? '8px 12px 8px 9px'
            : '7px 27.4px 9px 11px',
          background:
            state.isFocused || state.isSelected ? '#dce5fd' : 'transparent',
        }),
      }}
      menuIsOpen
      hideSelectedOptions
      {...props}
    />
  );
}

BottomSheetSelect.propTypes = {
  type: PropTypes.oneOf(['simple', 'dapp']),
};

BottomSheetSelect.defaultProps = {
  type: 'dapp',
};

// Return object for options constant
BottomSheetSelect.option = (title, value, icon, showValue = false) => {
  return {
    label: (
      <div className="CabinetSelect-BottomSheet-option">
        <div className="CabinetSelect-BottomSheet-option__icon">
          {icon && <img src={icon} />}
        </div>
        <p className="CabinetSelect-BottomSheet-option__title">{title}</p>
        {showValue && (
          <p className="CabinetSelect-BottomSheet-option__value">{value}</p>
        )}
      </div>
    ),
    value,
  };
};

export default BottomSheetSelect;
