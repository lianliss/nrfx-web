import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Input } from 'ui';
import { AnswerPopup } from 'dapp';
import ColumnTitle from '../ColumnTitle/ColumnTitle';

function InputColumn({
  title,
  description,
  placeholder,
  indicator,
  value,
  onChange,
}) {
  return (
    <Col className="ValidatorTradeForm-col">
      <ColumnTitle title={title} description={description} />
      <Input
        placeholder={placeholder}
        value={value}
        onTextChange={onChange}
        indicator={indicator}
      />
    </Col>
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
