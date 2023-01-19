import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { default as ReactSelect, components } from 'react-select';

// Components
import SVG from 'utils/svg-wrap';
import CabinetScrollBlock from '../../../CabinetScrollBlock/CabinetScrollBlock';
import { BottomSheetModal } from 'ui';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { classNames } from 'utils';
import _ from 'lodash';

// Styles
import './index.less';

const { DropdownIndicator, Menu, MenuList, Option } = components;

const BottomSheetSelect = React.memo(
  ({ options, value, onChange, className, ...props }) => {
    const adaptive = useSelector(adaptiveSelector);
    const bottomSheetModalRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const styles = {
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
        display: 'flex',
        background: '#fff',
        marginTop: 12,
        boxShadow: '0px 25px 55px rgba(188, 188, 188, 0.25)',
        borderRadius: '18px',
        maxHeight: 195,
      }),
      menuList: (base) => ({
        ...base,
        padding: '0',
        maxHeight: 156,
      }),
      option: (base, state) => ({
        ...base,
        padding: state.isSelected ? '8px 12px 8px 9px' : '7px 27.4px 9px 11px',

        '&:not(:hover)': {
          background: state.isSelected ? '#dce5fd' : 'transparent',
        },

        '&:hover': {
          background: '#dce5fd',
        },
      }),
    };

    const adaptiveStyles = {
      ...styles,
      control: (base, state) => ({
        ...styles.control(base, state),
        width: 63,

        p: {
          display: 'none',
        },
      }),
      dropdownIndicator: (base, state) => ({
        ...styles.dropdownIndicator(base, state),
        padding: '0 10px',
      }),
      menu: (base, state) => ({
        ...styles.menu(base, state),
        maxHeight: 225,
        margin: 0,
        position: 'static',
        width: '100%',
        borderRadius: '18px 18px 0px 0px',
      }),
      option: (base, state) => ({
        ...styles.option(base, state),
        padding: '12px 12px 12px 16px',
      }),
    };

    // Get object value of string from options.
    const getValue = (value, options) => {
      return value ? options.find((c) => c.value === value) : '';
    };

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
      if (typeof closeBottomSheetModal === 'function') {
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
          MenuList: ({ children, ...props }) => {
            const scrollContainerRef = React.useRef(null);
            const [scrollbarHeight, setScrollbarHeight] = React.useState(0);

            React.useEffect(() => {
              setScrollbarHeight(
                _.get(scrollContainerRef, 'current.offsetHeight', 0)
              );
            }, [scrollContainerRef]);

            return (
              <MenuList {...props}>
                <CabinetScrollBlock
                  style={{ height: scrollbarHeight, maxHeight: 156 }}
                  minimalThumbSize={30}
                  removeTracksWhenNotUsed
                >
                  <div
                    className="CabinetSelect-BottomSheet-menuList__container"
                    ref={scrollContainerRef}
                  >
                    {children}
                  </div>
                </CabinetScrollBlock>
              </MenuList>
            );
          },
        }}
        className={classNames('CabinetSelect-BottomSheet')}
        classNamePrefix="CabinetSelect-BottomSheet"
        styles={adaptive ? adaptiveStyles : styles}
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
