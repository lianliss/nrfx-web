import React from 'react';
import PropTypes from 'prop-types';

export default class Paging extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('scroll', this.__didScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.__didScroll);
  }

  __didScroll = (e) => {
    if (!this.props.isCanMore) {
      return;
    }

    const scrollTop = document.scrollingElement.scrollTop;
    if (scrollTop + window.innerHeight * 1.5 >= document.scrollingElement.offsetHeight) {
      this.props.onMore && this.props.onMore();
    }
  };

  render() {
    return this.props.children;
  }
}

Paging.propTypes = {
  onMore: PropTypes.func,
  isCanMore: PropTypes.bool
};
