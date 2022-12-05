import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'ui';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Column from '../Column/Column';

function InputColumn({
  title,
  description,
  placeholder,
  indicator,
  value,
  onChange,
}) {
  return (
    <Column>
      <ColumnTitle title={title} description={description} />
      <Input
        placeholder={placeholder}
        value={value}
        onTextChange={onChange}
        indicator={indicator}
      />
    </Column>
  );
}

InputColumn.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  indicator: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

InputColumn.defaultProps = {
  title: '',
  description: '',
  placeholder: '',
  indicator: '',
  value: '',
  onChange: () => {},
};

export default InputColumn;
