import React from 'react';

export default class BaseScreen extends React.PureComponent {
  get lang() {
    return this.props.state.lang;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}
