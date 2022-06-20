// styles
import './Search.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
// internal
import { classNames } from '../../utils';
import SVG from 'utils/svg-wrap';
import searchIcon from './assets/search.svg';

function Search(props) {
  const className = classNames({
    Search: true,
    lite: props.lite,
    simple: props.simple,
    disabled: props.disabled,
    right: props.right,
  });

  return (
    <div className={className}>
      {props.lite && <div className="Search__icon" />}
      {props.icon && <SVG className="Search__icon" src={searchIcon} />}
      <input
        type="text"
        className="Search__input"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
      />
      {!props.lite && (
        <div className="Search__button active" onClick={props.onSearch} />
      )}
      {!props.lite && <div className="Search__button" />}
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onSearch: PropTypes.func,
  lite: PropTypes.bool,
  simple: PropTypes.bool,
  disabled: PropTypes.bool,
  right: PropTypes.bool,
};

export default React.memo(Search);
