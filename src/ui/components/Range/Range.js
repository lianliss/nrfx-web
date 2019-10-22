import './Range.less';
import React from 'react';

export default class Range extends React.Component {

  state = {
    isDraggable: false,
    clientX: 0,
    value: Math.round((this.props.value - this.props.min) / (this.props.max - this.props.min) * 100),
    startValue: 50,
  };

  componentDidMount() {
  }

  __handleClick = (e) => {
    this.setState({
      isDraggable: true,
      clientX: e.clientX,
      startValue: this.state.value
    });

    document.body.classList.add('draggable');
    document.addEventListener('mouseup', this.__handleMouseUp);
    document.addEventListener('mousemove', this.__handleChange);
  };

  __handleMouseUp = (e) => {
    document.body.classList.remove('draggable');
    document.removeEventListener('mouseup', this.__handleMouseUp);
    document.removeEventListener('mousemove', this.__handleChange);
    this.setState({ value: Math.round(this.state.value) });

    this.props.onChange && this.props.onChange(this.result);
  };

  get result() {
    const { min, max } = this.props;
    return Math.round((max - min) / 100 * this.state.value + min);
  }

  get value () {
    const { min, max } = this.props;
    return Math.round((this.state.value - min) / (max - min) * 100);
  }

  __handleChange = (e) => {
    let value = (((e.clientX - this.state.clientX)) / this.refs.range.clientWidth * 100) + this.state.startValue;
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    this.setState({ value });
  };

  render() {
    return (
      <div className="Range" ref="range">
        <div style={{width: this.value + '%'}} className="Range__filler">
          <div className="Range__thumb" style={{left: this.value + '%'}} onMouseDown={this.__handleClick}>
            <div className="Range__label">{this.props.formatLabel(this.result)}</div>
          </div>
        </div>
      </div>
    )
  }
}

Range.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  formatLabel: value => value,
};