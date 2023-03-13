import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { default as ReactSelect, components } from 'react-select';

// Components
import SVG from 'utils/svg-wrap';
import { BottomSheetModal } from 'ui';
import DappInput from 'dapp/DappInput/DappInput';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { classNames } from 'utils';
import { styles, adaptiveStyles } from '../../constants/bottomSheetStyles';
import _ from 'lodash';

// Styles
import './index.less';

const { DropdownIndicator, Menu, Option } = components;

const BottomSheetSelect = React.memo(
  ({
    options,
    value,
    onChange,
    className,
    listHeight,
    isSearchable,
    ...props
  }) => {
    const adaptive = useSelector(adaptiveSelector);
    const [search, setSearch] = React.useState('');
    const bottomSheetModalRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);

    // Get object value of string from options.
    const getValue = (value, options) => {
      return value ? options.find((c) => c.value === value) : '';
    };

    const fineStyles = adaptive ? adaptiveStyles : styles;
    // Handlers
    // -- Set value of string from object option.
    const handleChange = (newValue) => {
      onChange(newValue.value);
      closeMenu();
    };

    const closeMenu = () => {
      if (!adaptive) {
        handleMenuClose();
        return;
      }

      const closeBottomSheetModal = _.get(bottomSheetModalRef, 'current.close');
      if (_.isFunction(closeBottomSheetModal)) {
        closeBottomSheetModal();
      }
    };

    const handleMenuOpen = () => {
      setIsOpen(true);
    };
    const handleMenuClose = () => {
      setIsOpen(false);
    };

    return (
      <ReactSelect
        isSearchable={false}
        options={options}
        value={getValue(value, options)}
        onChange={handleChange}
        menuIsOpen={isOpen}
        onMenuOpen={handleMenuOpen}
        onMenuClose={!adaptive && handleMenuClose}
        backspaceRemovesValue={false}
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

            const menu = (
              <Menu {...props}>
                <div className="CabinetSelect-BottomSheet-menu__triangle" />
                <div className="CabinetSelect-BottomSheet-menu__container">
                  <Option {...props} isSelected>
                    {selectedOption.label}
                  </Option>
                  {isSearchable && (
                    <div className="CabinetSelect-BottomSheet-menu__search">
                      <DappInput
                        size="small"
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        indicator={
                          <SVG
                            src={require('src/asset/icons/action/search-small.svg')}
                            flex
                          />
                        }
                      />
                    </div>
                  )}
                  {children}
                </div>
              </Menu>
            );

            if (adaptive) {
              return (
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  onClose={handleMenuClose}
                  skipSwap
                >
                  {menu}
                </BottomSheetModal>
              );
            }

            return menu;
          },
        }}
        className={classNames('CabinetSelect-BottomSheet')}
        classNamePrefix="CabinetSelect-BottomSheet"
        styles={{
          ...fineStyles,
          menuList: (base) => ({
            ...styles.menuList(base),
            maxHeight: listHeight,
          }),
        }}
        hideSelectedOptions
        {...props}
      />
    );
  }
);

BottomSheetSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

BottomSheetSelect.defaultProps = {
  options: [],
  value: 0,
  onChange: () => {},
  className: '',
  listHeight: 156,
};

// Return object for options constant
const BottomSheetSelectOption = (title, value, icon, showValue = false) => {
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

BottomSheetSelect.option = BottomSheetSelectOption;

export default BottomSheetSelect;
