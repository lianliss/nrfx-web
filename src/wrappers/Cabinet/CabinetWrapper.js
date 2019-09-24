// styles
import './CabinetWrapper.less';
// external
import React, {Component} from 'react';
import SVG from 'react-inlinesvg';
// internal
import Header from '../../components/cabinet/Header/Header';
import AdaptiveHeader from '../../components/cabinet/Header/AdaptiveHeader';
import {classNames} from '../../utils';
import * as CLASSES from '../../constants/classes';
import * as storeUtils from '../../storeUtils';
import router from '../../router';
import * as utils from '../../utils/index'
import TabBar from '../../components/cabinet/TabBar/TabBar';
import { BaseLink } from 'react-router5';
import * as PAGES from '../../constants/pages'

class CabinetWrapper extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.__handleOnResize);
    this.__handleResize(document.body.offsetWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.__handleOnResize);
  }

  render() {
    const route = router.getState();
    const content = utils.switchMatch(route.name, {
      [PAGES.NOTIFICATIONS]: {
        left: <BaseLink router={router} routeName={PAGES.PROFILE}>
          <SVG src={require("../../asset/24px/angle-left.svg")} />
        </BaseLink>
      },
      [PAGES.PROFILE]: {
        left: <BaseLink router={router} routeName={PAGES.NOTIFICATIONS}>
          <SVG src={require("../../asset/24px/bell.svg")} />
        </BaseLink>
      },
      "default": {
        left: !!Object.keys(route.params).length &&
          <span onClick={() => window.history.back()}>
            <SVG src={require("../../asset/24px/angle-left.svg")} />
          </span>
      }
    });

    const {children, className, adaptive} = this.props;
    const mainClassName = classNames({
      CabinetWrapper: true,
      [className]: !!className
    });

    return <div className={mainClassName}>
      {adaptive ? <AdaptiveHeader
        leftContent={<span>{content.left}</span>}
        mainContent={{
          type: "text",
          content: this.props.title
        }}
        // rightContent={<SVG src={require("../../asset/24px/calendar.svg")} />}
      /> : <Header />}
      <div className="CabinetWrapper__content">{children}</div>
      {adaptive && <TabBar />}
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