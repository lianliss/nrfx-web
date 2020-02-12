// styles
import './CabinetWrapper.less';
// external
import React, {Component} from 'react';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
// internal
import {classNames} from '../../../src/utils';
import router from '../../../src/router';
import Header from '../../index/components/cabinet/Header/Header'
import AdaptiveHeader from '../../index/components/cabinet/Header/AdaptiveHeader';
import * as PAGES from '../../index/constants/pages'
import * as utils from '../../utils'
import TabBar from '../../index/components/cabinet/TabBar/TabBar';
import {BaseLink} from 'react-router5';
import * as actions from '../../actions';
import * as steps from '../../components/AuthModal/fixtures';
import LoadingStatus from '../../index/components/cabinet/LoadingStatus/LoadingStatus';

class CabinetWrapper extends Component {
  state = {
    error: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.children !== this.props.children) {
      this.setState({ error: null });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.__handleOnResize);
    this.__handleResize(document.body.offsetWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.__handleOnResize);
  }

  componentDidCatch(error, info) {
    this.setState({ error: {
      name: error.name,
      message: error.message
    }});
  }

  __renderContent() {
    const { error } = this.state;
    return error ? <LoadingStatus status={error.name} description={error.message} /> : this.props.children;
  }

  render() {
    const route = router.getState();

    let contentRules = {
      [PAGES.NOTIFICATIONS]: {
        left: <BaseLink router={router} routeName={PAGES.DASHBOARD}>
          <SVG src={require("../../asset/24px/angle-left.svg")} />
        </BaseLink>
      },
      'default': {
        left: !!Object.keys(route.params).length &&
          <span onClick={() => window.history.back()}>
            <SVG src={require("../../asset/24px/angle-left.svg")} />
          </span>
      }
    };

    if (!Object.keys(route.params)) {
      contentRules[PAGES.DASHBOARD] = {
        left: <BaseLink router={router} routeName={PAGES.NOTIFICATIONS}>
          <SVG src={require("../../asset/24px/bell.svg")} />
        </BaseLink>
      };
    }

    const content = utils.switchMatch(route.name, contentRules);

    const {className, adaptive, user} = this.props;
    const mainClassName = classNames({
      CabinetWrapper: true,
      [className]: !!className
    });

    return <div className={mainClassName}>
      {adaptive ? <AdaptiveHeader
        leftContent={<span>{content.left}</span>}
        rightContent={
          !user && (<div onClick={() => actions.openModal('auth', {type: steps.REGISTRATION})} >
            <SVG src={require("../../asset/24px/login.svg")} />
          </div>)
        }
        mainContent={{
          type: "text",
          content: this.props.title
        }}
      /> : <Header />}
      <div className="CabinetWrapper__content">{this.__renderContent()}</div>
      {adaptive && user && <TabBar />}
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
    this.__handleResize(
      document.body.offsetWidth
    );
  }
}

export default connect(state => ({
  ...state.default,
  router: state.router,
  user: state.default.profile.user
}), {
  setAdaptive: actions.setAdaptive
})(CabinetWrapper);
