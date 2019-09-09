import './Input.less';

import React  from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorWidth: 0
    };
  }

  render() {
    const className = classNames({
      Input: true,
      multiLine: this.props.multiLine,
      error: this.props.error
    });

    let InputWrapper = 'Input__wrapper';
    if (this.props.classNameWrapper) {
      InputWrapper += ' ' + this.props.classNameWrapper;
    }

    let params = {
      className,
      placeholder: this.props.placeholder,
      type: this.props.type,
      autoComplete: this.props.autoComplete,
      autoFocus: this.props.autoFocus,
      onKeyPress: this.props.onKeyPress,
      readOnly: this.props.readOnly,
      onFocus: this.props.onFocus,
      required: true,
      style: {
        paddingRight: 16 + this.state.indicatorWidth
      }
    };

    let cont;
    if (this.props.multiLine) {
      cont = <textarea ref="input" {...params} onChange={this.__onChange}>{this.props.value}</textarea>;
    } else {
      cont = <input
        ref="input"
        {...params}
        value={this.props.value}
        onChange={this.__onChange}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
      />;
    }

    return (
      <div className={InputWrapper} onClick={this.props.onClick}>
        {cont}

        {this.props.indicator && <div className="Input__indicator" ref={(ref) => !this.state.indicatorWidth &&
          this.setState({ indicatorWidth: (ref || 0) })}>{this.props.indicator}</div>}
      </div>
    )
  }

  __onChange = (e) => {
    this.props.onChange && this.props.onChange(e);
    this.props.onTextChange && this.props.onTextChange(e.target.value);
  };
}

Input.defaultProps = {
  classNameWrapper: '',
  disabled: false,
  error: false,
  autoFocus: false
};

Input.propTypes = {
  placeholder: PropTypes.any,
  onChange: PropTypes.func,
  onTextChange: PropTypes.func,
  multiLine: PropTypes.bool,
  value: PropTypes.any,
  indicator: PropTypes.node,
  onClick: PropTypes.func,
  classNameWrapper: PropTypes.string,
  disabled: PropTypes.bool,
};

export default React.memo(Input);
