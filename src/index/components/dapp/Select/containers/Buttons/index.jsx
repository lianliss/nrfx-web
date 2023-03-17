import React from 'react';
import PropTypes from 'prop-types';

// Components
import { CustomButton } from 'dapp';
import { Row, Button } from 'ui';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function Buttons({ title, options, onChange, value, initOptionsLimit }) {
  const SelectButton = ({ label, value, isSelected }) => {
    const type = isSelected ? 'lightBlue' : 'secondary-alice';
    const handleOnChange = () => !isSelected && onChange(value);
    const className = isSelected && 'isSelected';

    return (
      <Button
        size="extra_small"
        type={type}
        onClick={handleOnChange}
        className={className}
      >
        {label}
      </Button>
    );
  };

  return (
    <div className="CabinetSelect-Buttons">
      <Row
        className="CabinetSelect-Buttons__header"
        justifyContent="space-between"
        alignItems="center"
      >
        <h4>{title}</h4>
        <CustomButton>
          <Row alignItems="center">
            All(55)
            <SVG
              src={require('src/asset/icons/arrows/form-dropdown.svg')}
              className="dark-dropdown-icon"
              flex
            />
          </Row>
        </CustomButton>
      </Row>
      <div className="CabinetSelect-Buttons__buttons">
        <SelectButton label="All" value="all" isSelected={'all' === value} />
        {options.map((option, key) => (
          <SelectButton
            {...option}
            isSelected={option.value === value}
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
};

export default Buttons;
