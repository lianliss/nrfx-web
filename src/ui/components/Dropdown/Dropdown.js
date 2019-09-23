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
  state = {
    isOpen: false
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || this.state.isOpen !== nextState.isOpen;
  }

  toggle = (value) => {
    this.setState({ isOpen: value });
  };

  render() {
    const { props, state } = this;
    const dropdownIcon = state.isOpen ? arrowUp : arrowDown;
    const headerText = props.value || props.placeholder;
    const className = classNames({
      Dropdown: true,
      Dropdown_open: state.isOpen,
    });

    return [
      <div className={className} key={Math.random()}>
        <div className="Dropdown__header" onClick={() => this.toggle(!state.isOpen)}>
          <div className="Dropdown__option">
            <p className="Dropdown__option__title">{headerText.title}</p>
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
                    className="Dropdown__option key"
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
      this.isOpen && <div className="Dropdown__overlay" onClick={() => this.toggle(false)} />
    ];
  }
}

const optionType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
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
  options: PropTypes.arrayOf(optionType).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
