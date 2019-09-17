import './CabinetWrapper.less';
import React, {Component} from 'react';
import Header from '../../components/cabinet/Header/Header';
import AdaptiveHeader from '../../components/cabinet/Header/AdaptiveHeader';
import { classNames } from '../../utils';
import * as CLASSES from "../../constants/classes";
import * as storeUtils from "../../storeUtils";

class CabinetWrapper extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.__handleOnResize);
    this.__handleResize(document.body.offsetWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.__handleOnResize);
  }

  render() {
    const {children, className, adaptive} = this.props;
    const mainClassName = classNames({
      CabinetWrapper: true,
      [className]: !!className,
      adaptive
    });

    return <div className={mainClassName}>
      {adaptive ? <AdaptiveHeader /> : <Header />}
      {children}
    </div>
  }

  __handleResize = (w) => {
    const {adaptive} = this.props;

    if (w <= 600) {
      if (!adaptive) {
        this.props.setAdaptive(true);
      }
    } else {
      if (adaptive) {

        this.props.setAdaptive(false);
      }
    }
  };

  __handleOnResize = e => {
    this.__handleResize(document.body.offsetWidth);
  }
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_CABINET_WRAPPER,
  CabinetWrapper
);