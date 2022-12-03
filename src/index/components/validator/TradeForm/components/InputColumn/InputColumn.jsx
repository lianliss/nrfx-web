import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Input } from 'ui';
import { AnswerPopup } from 'dapp';

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
      <Row className="ValidatorTradeForm-col__title" alignItems="center">
        <h3>{title}</h3>
        {description && <AnswerPopup>{description}</AnswerPopup>}
      </Row>
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
