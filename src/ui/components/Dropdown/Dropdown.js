// styles
import './Dropdown.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
// internal
import { classNames } from '../../utils';

const arrowUp = require('../../asset/arrow_outline_up.svg');
const arrowDown = require('../../asset/arrow_outline_down.svg');

class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.__handleClick = this.__handleClick.bind(this);
    this.__handleClickEsc = this.__handleClickEsc.bind(this);
  }

  state = {
    isOpen: false
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || this.state.isOpen !== nextState.isOpen;
  }

  toggle = (value) => {
    this.setState({ isOpen: value });
    if (value) {
      document.addEventListener('click', this.__handleClick, false);
      document.addEventListener("keydown", this.__handleClickEsc, false);
    } else {
      document.removeEventListener('click', this.__handleClick, false);
      document.removeEventListener("keydown", this.__handleClickEsc, false);
    }
  };

  __handleClick(e) {
    this.toggle(false);
  }

  __handleClickEsc(e){
    if(e.keyCode === 27) {
      this.toggle(false);
    }
  }

  render() {
    const { props, state } = this;
    const dropdownIcon = state.isOpen ? arrowUp : arrowDown;

    const headerText = typeof props.value !== 'object' ?
      props.options.find( opt => opt.value === props.value) || {} : props.value || {};

    const className = classNames({
      Dropdown: true,
      disabled: props.disabled,
      Dropdown_open: state.isOpen,
      [props.size]: props.size
    });

    return [
      <div ref="dropdown" key="dropdown" className={className}>
        <div className="Dropdown__header" onClick={() => this.toggle(!state.isOpen)}>
          <div className="Dropdown__option">
            <p className="Dropdown__option__title">{headerText.title || props.placeholder}</p>
            <p className="Dropdown__option__note">{headerText.note}</p>
          </div>

          <SVG src={dropdownIcon} />
        </div>

        {state.isOpen
          ? (
            <div className="Dropdown__options">
              {
                props.options.map((opt, i) => {
                  return <div
                    key={Math.random()}
                    className={classNames("Dropdown__option", { disabled: opt.disabled })}
                    onClick={() => {
                      props.onChange(opt);
                      this.toggle(false);
                    }}
                  >
                    <p className="Dropdown__option__title">{opt.title}</p>
                    <p className="Dropdown__option__note">{opt.note}</p>
                  </div>
                })
              }
            </div>
          ) : null}
      </div>,
      this.isOpen && <div key="overlay" className="Dropdown__overlay" onClick={() => this.toggle(false)} />
    ];
  }
}

const optionType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
});

Dropdown.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    optionType
  ]),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(optionType).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
