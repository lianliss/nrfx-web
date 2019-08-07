import './ModalPage.less';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {classNames} from '../../../utils/index';

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
    this.__onCloseHandler();
  }

  get child() {
    const Child = this.props.children;
    return <Child
      close={this.props.close}
      openModalPage={this.props.openModalPage}
      {...this.props.router.getState().params}
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

  // get window() {
  //   return this.context.window || window;
  // }

  // __toggleDocumentScrolling (enabled) {
  //   if (this.documentScrolling === enabled) return;
  //   this.documentScrolling = enabled;
  //
  //   if (enabled) {
  //     this.window.removeEventListener('wheel', this.preventWheel);
  //   } else {
  //     this.window.addEventListener('wheel', this.__preventWheel, {passive: false});
  //   }
  // }

  // __preventWheel = (event) => {
  //   if (!event) return false;
  //   while (event.originalEvent) {
  //     event = event.originalEvent;
  //   }
  //   event.preventDefault();
  // };

  __onCloseHandler = () => {
    if (this.props.onCloseHandler) {
      return this.props.onCloseHandler();
    }
  };

  __handleClick = e => {
    if (!(this.node.current && this.node.current.contains(e.target))) {
      this.props.close();
    }
  };
}

export default React.memo(ModalPage);

