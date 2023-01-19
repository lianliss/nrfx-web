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
import { styles, adaptiveStyles } from '../../constants/bottomSheetStyles';
import _ from 'lodash';

// Styles
import './index.less';

const { DropdownIndicator, Menu, MenuList, Option } = components;

const BottomSheetSelect = React.memo(
  ({ options, value, onChange, className, ...props }) => {
    const adaptive = useSelector(adaptiveSelector);
    const bottomSheetModalRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);

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
