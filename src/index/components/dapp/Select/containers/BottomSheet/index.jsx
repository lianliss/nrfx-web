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
import bottomSheetStyles from '../../constants/bottomSheetStyles';
import desktopStyles from '../../constants/desktopStyles';
import indicatorIcons from '../../constants/indicatorIcons';
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
    type,
    components,
    width,
    showSelectedInMenu,
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

    const responsiveStyles = {
      desktop: desktopStyles[type],
      adaptive: bottomSheetStyles(desktopStyles[type]),
    };
    const styles = adaptive
      ? responsiveStyles.adaptive
      : responsiveStyles.desktop;

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
                <SVG src={indicatorIcons[type]} flex />
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
                {type === 'bold' && (
                  <div className="CabinetSelect-BottomSheet-menu__triangle" />
                )}
                <div className="CabinetSelect-BottomSheet-menu__container">
                  {showSelectedInMenu && (
                    <Option {...props} isSelected>
                      {selectedOption.label}
                    </Option>
                  )}
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
          ...components,
        }}
        className={classNames('CabinetSelect-BottomSheet', type)}
        classNamePrefix="CabinetSelect-BottomSheet"
        styles={{
          ...styles,
          menuList: (base, state) => ({
            ...styles?.menuList(base, state),
            maxHeight: listHeight,
          }),
          control: (base, state) => ({
            ...styles?.control(base, state),
            width,
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
  listHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['average', 'bold']),
};

BottomSheetSelect.defaultProps = {
  options: [],
  value: 0,
  onChange: () => {},
  className: '',
  listHeight: 156,
  width: 150,
  type: 'average',
};

// Return object for options constant
const BottomSheetSelectOption = (
  title,
  value,
  icon,
  showValue = false,
  titleTag
) => {
  const Title = titleTag || 'p';

  return {
    label: (
      <div className="CabinetSelect-BottomSheet-option">
        <div className="CabinetSelect-BottomSheet-option__icon">
          {icon && <img src={icon} />}
        </div>
        <Title className="CabinetSelect-BottomSheet-option__title">
          {title}
        </Title>
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
