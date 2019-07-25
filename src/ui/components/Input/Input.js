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
      multiLine: this.props.multiLine
    });

    let params = {
      className,
      placeholder: this.props.placeholder,
      type: this.props.type,
      autoComplete: this.props.autoComplete,
      autoFocus: this.props.autoFocus,
      onKeyPress: this.props.onKeyPress,
      required: true,
      style: {
        paddingRight: 16 + this.state.indicatorWidth
      }
    };

    let cont;
    if (this.props.multiLine) {
      cont = <textarea ref="input" {...params} onChange={this.props.onChange}>{this.props.value}</textarea>;
    } else {
      cont = <input ref="input" {...params} value={this.props.value} onChange={this.props.onChange} />;
    }

    return (
      <div className="Input__wrapper">
        {cont}
        {this.props.indicator && <div className="Input__indicator" ref={(ref) => !this.state.indicatorWidth && this.setState({ indicatorWidth: ref.offsetWidth })}>{this.props.indicator}</div>}
      </div>
    )
  }
}

// function Input(props) {
//   const className = classNames({
//     Input: true,
//     multiLine: props.multiLine
//   });
//
//   let params = {
//     className,
//     placeholder: props.placeholder,
//     type: props.type,
//     autoComplete: props.autoComplete,
//     autoFocus: props.autoFocus,
//     onKeyPress: props.onKeyPress,
//     required: true,
//   };
//
//   let cont;
//   if (props.multiLine) {
//     cont = <textarea {...params} onChange={props.onChange}>{props.value}</textarea>;
//   } else {
//     cont = <input {...params} value={props.value} onChange={props.onChange} />;
//   }
//
//   return (
//     <div className="Input__wrapper">
//       {cont}
//       {props.indicator && <div className="Input__indicator" ref="indicator">{props.indicator}</div>}
//     </div>
//   )
// }

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  multiLine: PropTypes.bool,
  value: PropTypes.string,
  indicator: PropTypes.node
};

export default React.memo(Input);
