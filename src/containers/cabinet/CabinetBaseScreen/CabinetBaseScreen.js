import React from 'react';

import BaseScreen from '../../BaseScreen';

export default class CabinetBaseScreen extends BaseScreen {
  get section() {
    return this.props.routerParams.section || 'default';
  }

  get isLoading() {
    return !!this.props.loadingStatus[this.section];
  }

  componentDidMount() {
    this.load();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routerParams.section !== this.props.routerParams.section) {
      this.load(nextProps.routerParams.section || 'default');
    }
  }

  load() {
    // need to override
  }
}