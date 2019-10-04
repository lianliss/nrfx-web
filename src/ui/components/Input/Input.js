// styles
import './Input.less';
// external
import React  from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
// internal
import { classNames } from '../../utils';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorWidth: this.props.indicatorWidth || 0,
      displayPassword: false,
    };
  }

  __toggleDisplayPassword() {
    this.setState({ displayPassword: !this.state.displayPassword });
  }

  focus() {
    this.refs['input'].focus();
  }

  render() {
    const className = classNames({
      Input: true,
      multiLine: this.props.multiLine,
      error: this.props.error,
      password: this.props.type === "password"
    });

    let InputWrapper = 'Input__wrapper';
    if (this.props.classNameWrapper) {
      InputWrapper += ' ' + this.props.classNameWrapper;
    }

    let params = {
      className,
      placeholder: this.props.placeholder,
      type: (this.props.type === "password" && this.state.displayPassword) ? "text" : this.props.type,
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
        onBlur={this.props.onBlur || (() => {})}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
      />;
    }

    const closeEyeSvg = require('../../asset/closed_eye_24.svg');
    const openEyeSvg = require('../../asset/opened_eye_24.svg');

    return (
      <div className={InputWrapper} onClick={this.props.onClick}>
        {cont}
        { this.props.type === "password" &&
          <div className="Input__display_password_button" onClick={this.__toggleDisplayPassword.bind(this)}>
            <SVG onClick={alert} src={this.state.displayPassword ? closeEyeSvg : openEyeSvg} />
          </div>
        }
        {this.props.indicator && <div className="Input__indicator" ref={(ref) => !this.state.indicatorWidth &&
          this.setState({ indicatorWidth: ( ref || 0) })}>{this.props.indicator}</div>}
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
