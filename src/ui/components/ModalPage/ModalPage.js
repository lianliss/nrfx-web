// styles
import './ModalPage.less';
// external
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// internal
import {classNames} from '../../../utils/index';
import {MODALGROUP_SEPARATOR} from '../../../constants/modalGroup';

class ModalPage extends Component {
  static propTypes = {
    width: PropTypes.number,
    onCloseHandler: PropTypes.func,
    children: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.mainClassName = classNames({
      ModalPage: true,
      ModalPage__noSpacing: this.props.noSpacing,
    });
  }

  componentDidMount() {
    //this.__toggleDocumentScrolling(false);
    document.addEventListener("mousedown", this.__handleClick);
  }

  componentWillUnmount() {
    //this.__toggleDocumentScrolling(true);
    document.removeEventListener("mousedown", this.__handleClick);
    this.props.onCloseHandler();
  }

  get child() {
    const Child = this.props.children;
    const getStateParams = this.props.router.getState().params;
    const getParams = {};
    if (getStateParams.hasOwnProperty('rp')) {
      let rp = getStateParams.rp.split(MODALGROUP_SEPARATOR);
      if (rp.length > 0) {
        rp.forEach(param => {
          getParams[param] = (getStateParams[param]);
        })
      }
    }
    return <Child
      close={this.props.close}
      openModalPage={this.props.openModalPage}
      params={this.props.hasOwnProperty('params') ? {...this.props.params} : {}}
      {...getParams}
    />
  }

  render() {
    return <div className={this.mainClassName}>
      <div className="ModalPage__box" ref={this.node} style={{width: this.props.width}}>
        <div className="ModalPage__box__close" onClick={this.props.close} />
        {this.child}
      </div>
    </div>
  }

  __handleClick = e => {
    if (!(this.node.current && this.node.current.contains(e.target)) && !this.props.adaptive) {
      this.props.close();
    }
  };
}

ModalPage.defaultProps = {
  onCloseHandler: () => {}
};

export default React.memo(ModalPage);

