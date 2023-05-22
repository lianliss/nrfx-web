import React from 'react';
import PropTypes from 'prop-types';

// Components
import { CustomButton } from 'dapp';
import { Row, Button } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function Buttons({
  title,
  options,
  onChange,
  value,
  onShowAll,
  optionsLength,
  initDisplayNumber,
  highlightedOptions,
  className,
}) {
  const [showAll, setShowAll] = React.useState(false);
  const displayOptions = showAll
    ? options
    : options.slice(0, initDisplayNumber);
  const fineOptionsLength = optionsLength || options.length;

  const handleShowAll = async () => {
    if (onShowAll && !showAll) {
      await onShowAll();
    }

    setShowAll((prev) => !prev);
  };

  const SelectButton = ({ label, icon, value, isSelected, highlighted }) => {
    const type = isSelected ? 'lightBlue' : 'secondary-alice';
    const handleOnChange = () => !isSelected && onChange(value);

    return (
      <Button
        size="extra_small"
        type={type}
        onClick={handleOnChange}
        className={cn({ isSelected, highlighted })}
      >
        {icon && <img src={icon} alt={label} />}
        {label}
      </Button>
    );
  };

  return (
    <div className={cn('CabinetSelect-Buttons', className)}>
      <Row
        className="CabinetSelect-Buttons__header"
        justifyContent="space-between"
        alignItems="center"
      >
        <h4>{title}</h4>
        {fineOptionsLength > initDisplayNumber && (
          <CustomButton onClick={handleShowAll}>
            <Row alignItems="center">
              All({fineOptionsLength})
              <SVG
                src={require('src/asset/icons/arrows/form-dropdown.svg')}
                className="dark-dropdown-icon"
                style={{
                  transform:
                    fineOptionsLength === displayOptions.length
                      ? 'rotate(180deg)'
                      : '',
                }}
                flex
              />
            </Row>
          </CustomButton>
        )}
      </Row>
      <div className="CabinetSelect-Buttons__buttons">
        {displayOptions.map((option, key) => (
          <SelectButton
            {...option}
            isSelected={option.value === value}
            highlighted={highlightedOptions.includes(key)}
            key={key}
          />
        ))}
      </div>
    </div>
  );
}

Buttons.propTypes = {
  title: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onShowAll: PropTypes.func,
  initDisplayNumber: PropTypes.number,
  optionsLength: PropTypes.number,
  highlightedOptions: PropTypes.arrayOf(PropTypes.number),
};

Buttons.defaultProps = {
  title: '',
  options: [],
  onChange: () => {},
  value: '',
  onShowAll: () => {},
  initDisplayNumber: 18,
  optionsLength: 0,
  highlightedOptions: [],
};

export default Buttons;
