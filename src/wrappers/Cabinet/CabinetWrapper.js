import './CabinetWrapper.less';
import React, {Component} from 'react';
import Header from '../../components/cabinet/Header/Header';
import AdaptiveHeader from '../../components/cabinet/Header/AdaptiveHeader';
import { classNames } from '../../utils';
import * as CLASSES from "../../constants/classes";
import * as storeUtils from "../../storeUtils";
import SVG from "react-inlinesvg";

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
      [className]: !!className
    });

    return <div className={mainClassName}>
      {adaptive ? <AdaptiveHeader
        leftContent={<SVG src={require("../../asset/24px/calendar.svg")} />}
        mainContent={{
          type: "text",
          content: "Bitcoinbot"
        }}
        rightContent={<SVG src={require("../../asset/24px/calendar.svg")} />}
      /> : <Header />}
      {children}
    </div>
  }

  __handleResize = (w) => {
    const {adaptive} = this.props;

    if (w <= 650) {
      if (!adaptive) {
        document.body.classList.add('adaptive');
        this.props.setAdaptive(true);
      }
    } else {
      if (adaptive) {
        document.body.classList.remove('adaptive');
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