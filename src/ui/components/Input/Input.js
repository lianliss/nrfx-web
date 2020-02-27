// styles
import './Input.less';
// external
import React  from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
// internal
import MarkDown from '../MarkDown/MarkDown';
import { classNames, __doubleInputOnKeyPressHandler } from '../../utils';
import { openModal } from 'src/actions';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorWidth: this.props.indicatorWidth || (this.props.indicator ? 34 : 0),
      displayPassword: false,
    };
  }

  componentDidMount() {
    !this.props.mouseWheel && this.refs.input.addEventListener('mousewheel', (e) => {
      e.preventDefault();
    }, false);
  }

  __toggleDisplayPassword() {
    this.setState({ displayPassword: !this.state.displayPassword });
  }

  focus() {
    this.refs['input'].focus();
  }

  __handleContextMenu = (e) => {
    if (this.props.placeholder && this.props.placeholder.props) {
      e.preventDefault();
      openModal('translator', {
        langKey: this.props.placeholder.props.langKey
      })
    }
  }

  render() {
    let { placeholder } = this.props;
    placeholder = typeof placeholder === 'string' ? placeholder : ( placeholder && placeholder.props.langContent );

    const className = classNames({
      Input: true,
      multiLine: this.props.multiLine,
      error: this.props.error,
      password: this.props.type === "password",
    });

    const wrapperClassName = classNames({
      Input__wrapper: true,
      [this.props.classNameWrapper]: !!this.props.classNameWrapper,
      [this.props.size]: !!this.props.size,
    });

    let type = this.props.type;

    if (this.props.type === "password" && this.state.displayPassword) {
      type = "text";
    }

    if (this.props.type === "datetime") {
      type = "datetime-local";
    }

    if (this.props.type === 'code') {
      type = "number";
    }


    let params = {
      className,
      type,
      placeholder: placeholder,
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

    const value = this.props.pattern ? ((this.props.value || "").match(this.props.pattern) || []).join("") : this.props.value;

    let cont;
    if (this.props.multiLine) {
      cont = <textarea
        ref="input"
        {...params}
        onContextMenu={this.__handleContextMenu}
        onChange={this.__onChange}
      >{this.props.value}</textarea>;
    } else {
      cont = <input
        ref="input"
        {...params}
        value={value}
        onKeyPress={this.__onKeyPress}
        onChange={this.__onChange}
        onBlur={this.props.onBlur || (() => {})}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        onContextMenu={this.__handleContextMenu}
      />;
    }

    const closeEyeSvg = require('../../asset/closed_eye_24.svg');
    const openEyeSvg = require('../../asset/opened_eye_24.svg');

    const reliability =  this.props.reliability ? (
      <div className="Input__reliability">
        <div className="Input__reliability__label">Weak</div>
        <div className="Input__reliability__indicator">
          <div className="Input__reliability__indicator__fill"></div>
        </div>
      </div>
    ) : null;

    return (
      <div className={wrapperClassName} onClick={this.props.onClick}>
        {cont}
        { this.props.type === "password" &&
          <div className="Input__display_password_button" onClick={this.__toggleDisplayPassword.bind(this)}>
            <SVG onClick={alert} src={this.state.displayPassword ? closeEyeSvg : openEyeSvg} />
          </div>
        }
        {reliability}
        {this.props.indicator && <div className="Input__indicator" ref={(ref) => !this.state.indicatorWidth &&
          this.setState({ indicatorWidth: ( ref || 0) })}>{this.props.indicator}</div>}
        {this.props.description !== undefined ? <div className="Input__description">
          { typeof this.props.description !== 'string' ? this.props.description : <MarkDown content={this.props.description} /> }
        </div> : null}
      </div>
    )
  }

  __onKeyPress = (e) => {
    if (this.props.onKeyPress) {
      return this.props.onKeyPress(e);
    }

    if (this.props.type === 'code') {
      if(isNaN(e.key)) {
        e.preventDefault();
      }
    }

    if (this.props.pattern && !this.props.pattern.test(e.key)) {
      e.preventDefault();
    }

    if (this.props.type === 'number') {
      if (this.props.cell) {
        if (isNaN(e.key)) {
          e.preventDefault();
        }
      } else {
        __doubleInputOnKeyPressHandler(e, e.target.value);
      }
    }

    if (this.props.maxLength && e.target.value.length >= this.props.maxLength) {
      e.preventDefault();
    }
  };

  __onChange = (e) => {
    if (this.props.type === 'number') {
      if (this.props.positive &&  e.target.value < 0) {
        e.target.value = 0;
      }

      if (this.props.cell && e.target.value) {
        e.target.value = parseInt(e.target.value);
      }
    }

    this.props.onChange && this.props.onChange(e);
    this.props.onTextChange && this.props.onTextChange(e.target.value);
  };
}

Input.defaultProps = {
  classNameWrapper: '',
  disabled: false,
  error: false,
  autoFocus: false,
  mouseWheel: true,
  positive: true,
  cell: false,
  maxLength: null,
  pattern: null,
};

Input.propTypes = {
  mouseWheel: PropTypes.bool,
  placeholder: PropTypes.any,
  onChange: PropTypes.func,
  openModalTranslate: PropTypes.func,
  onTextChange: PropTypes.func,
  multiLine: PropTypes.bool,
  value: PropTypes.any,
  indicator: PropTypes.node,
  onClick: PropTypes.func,
  classNameWrapper: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  pattern: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.oneOf(['small']),
  type: PropTypes.oneOf(['text', 'number', 'password', 'code']),
  positive: PropTypes.bool,
  cell: PropTypes.bool,
};

export default React.memo(Input);
